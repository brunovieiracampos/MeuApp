import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { agendamentosDB } from "../data/agendamentos";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<RootStackParamList, "Agendamentos">;

export default function AgendamentosScreen({ navigation }: Props) {
  const [dataAtual, setDataAtual] = useState(dayjs());

  const agendamentosDoDia = agendamentosDB.filter(
    (a) => a.data === dataAtual.format("YYYY-MM-DD")
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos de {dataAtual.format("DD/MM/YYYY")}</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => setDataAtual(dataAtual.subtract(1, "day"))}>
          <Text style={styles.btnDia}>◀ Dia anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDataAtual(dataAtual.add(1, "day"))}>
          <Text style={styles.btnDia}>Próximo dia ▶</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={agendamentosDoDia}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.agendamento}>
            <Text style={styles.horario}>{item.horario}</Text>
            <Text>{item.nome} — {item.servico}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Sem agendamentos hoje.</Text>}
      />

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() =>
          navigation.navigate("NovoAgendamento", {
            data: dataAtual.format("YYYY-MM-DD"),
          })
        }
      >
        <Text style={styles.botaoNovoTexto}>Novo Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btnDia: { color: "#1E90FF", fontSize: 16 },
  agendamento: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  horario: { fontWeight: "bold", fontSize: 16 },
  botaoNovo: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoNovoTexto: { color: "#fff", fontSize: 18, textAlign: "center" },
});
