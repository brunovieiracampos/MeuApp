import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { agendamentosDB } from "../data/agendamentos";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const usuario = "Bruno Campos";

  // Lista os 5 últimos agendamentos
  const ultimosAgendamentos = agendamentosDB.slice(-5).reverse();

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Olá,</Text>
          <Text style={styles.username}>{usuario}</Text>
        </View>

        {/* Foto de perfil clicável */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }} // foto temporária
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Seus últimos agendamentos</Text>

      {/* Lista de agendamentos */}
      <FlatList
        data={ultimosAgendamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardServico}>{item.servico} - {item.local}</Text>
            <Text style={styles.cardHorario}>{item.data} {item.horario}</Text>
            <Text style={styles.cardData}>{item.valor}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Você ainda não possui agendamentos.
          </Text>
        }
      />

      {/* Botão para ir para agendamentos */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Agendamentos")}
      >
        <Text style={styles.buttonText}>Agendar Novo Corte ✂️</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FC",
    padding: 20,
  },

  // Cabeçalho
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  hello: {
    fontSize: 16,
    color: "#666",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E1E2F",
  },
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

  // Card dos agendamentos
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHorario: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A6CFF",
  },
  cardServico: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  cardData: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },

  // Botão inferior
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
