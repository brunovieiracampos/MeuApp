import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AgendamentosScreen from "./src/screens/AgendamentosScreen";
import NovoAgendamentoScreen from "./src/screens/NovoAgendamentoScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Agendamentos: undefined;
  NovoAgendamento: { data: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Tela de Login" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Agendamentos" component={AgendamentosScreen} />
        <Stack.Screen name="NovoAgendamento" component={NovoAgendamentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
