import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Agendamentos")}
      >
        <Text style={styles.buttonText}>Agendar Corte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 40 },
  button: {
    backgroundColor: "#1E90FF",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
