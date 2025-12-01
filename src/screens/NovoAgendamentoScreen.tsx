import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { agendamentosDB } from "../data/agendamentos";
import uuid from "react-native-uuid";

type Props = NativeStackScreenProps<RootStackParamList, "NovoAgendamento">;

export default function NovoAgendamentoScreen({ navigation, route }: Props) {
  const { data } = route.params;
  
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [servico, setServico] = useState("");

  function salvar() {
    if (!nome || !horario || !servico) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    agendamentosDB.push({
      id: String(uuid.v4()),
      nome,
      horario,
      servico,
      data,
    });

    Alert.alert("OK", "Agendamento salvo!");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário (ex: 14:30)"
        value={horario}
        onChangeText={setHorario}
      />

      <TextInput
        style={styles.input}
        placeholder="Serviço (ex: Corte, Barba...)"
        value={servico}
        onChangeText={setServico}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 8,
  },
  botaoTexto: { color: "#fff", fontSize: 18, textAlign: "center" },
});
