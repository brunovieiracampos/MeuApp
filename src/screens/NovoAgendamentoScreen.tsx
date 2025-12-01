import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { agendamentosDB } from "../data/agendamentos";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const usuario = "Bruno Campos";

  const ultimosAgendamentos = agendamentosDB.slice(-5).reverse();

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Olá,</Text>
          <Text style={styles.username}>{usuario}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Seus últimos agendamentos</Text>

      {/* LISTAGEM MODERNA */}
      <FlatList
        data={ultimosAgendamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            {/* Coluna esquerda com horário */}
            <View style={styles.cardLeft}>
              <Text style={styles.cardHorario}>{item.horario}</Text>
              <Text style={styles.cardData}>{formatarData(item.data)}</Text>
            </View>

            {/* Coluna central com serviço */}
            <View style={styles.cardCenter}>
              <Text style={styles.cardServico}>{item.servico}</Text>
              <Text style={styles.cardNome}>{item.nome}</Text>
            </View>

            {/* Coluna direita com valor */}
            <View style={styles.cardRight}>
              <Text style={styles.cardValor}>{item.valor}</Text>
              <Text style={styles.cardIcon}>💈</Text>
            </View>

          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Você ainda não possui agendamentos.
          </Text>
        }
      />

      {/* Botão inferior */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Agendamentos")}
      >
        <Text style={styles.buttonText}>Agendar Novo Corte ✂️</Text>
      </TouchableOpacity>

    </View>
  );
}

/* Função para formatar data YYYY-MM-DD → DD/MM/YYYY */
function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  hello: { fontSize: 16, color: "#666" },
  username: { fontSize: 24, fontWeight: "700", color: "#1E1E2F" },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#4A6CFF",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1E1E2F",
  },

  /* NOVO LAYOUT DA LISTA */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },

  cardLeft: { width: 70 },
  cardHorario: { 
    fontSize: 20, 
    fontWeight: "700",
    color: "#4A6CFF"
  },
  cardData: { 
    marginTop: 3, 
    color: "#777",
    fontSize: 13
  },

  cardCenter: { flex: 1, paddingHorizontal: 10 },
  cardServico: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  cardNome: { 
    marginTop: 3,
    color: "#666",
    fontSize: 13
  },

  cardRight: { width: 80, alignItems: "flex-end" },
  cardValor: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2F",
  },
  cardIcon: { fontSize: 22, marginTop: 3 },

  button: {
    backgroundColor: "#4A6CFF",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
