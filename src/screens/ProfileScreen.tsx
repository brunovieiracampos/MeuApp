import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://i.pravatar.cc/150?img=3" }}
      />

      <Text style={styles.name}>Bruno Campos</Text>
      <Text style={styles.email}>bruno@example.com</Text>

      <Text style={styles.sectionTitle}>Informações da Conta</Text>
      <Text style={styles.info}>⭐ Cliente Premium</Text>
      <Text style={styles.info}>📞 Telefone: (11) 99999-1111</Text>
      <Text style={styles.info}>🏙 Cidade: São Paulo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4A6CFF",
    marginBottom: 20,
  },
  name: { fontSize: 26, fontWeight: "700", color: "#1E1E2F" },
  email: { fontSize: 16, color: "#555", marginBottom: 30 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },

  info: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
});
