import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { agendamentosDB } from "../data/agendamentos";
import { ScrollView } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "NovoAgendamento">;

// Mock de locais
const locais = ["Barbearia Central", "Barbearia Norte", "Barbearia Sul"];

// Mock de serviços
const servicos = [
  { nome: "Corte Masculino", valor: "R$ 50,00" },
  { nome: "Corte + Barba", valor: "R$ 70,00" },
  { nome: "Barba", valor: "R$ 35,00" },
  { nome: "Sobrancelha", valor: "R$ 25,00" },
];

// Mock de horários
const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function NovoAgendamentoScreen({ navigation }: Props) {
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [localSelecionado, setLocalSelecionado] = useState<string | null>(null);
  const [servicosSelecionados, setServicosSelecionados] = useState<{
    nome: string;
    valor: string;
  }[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );

  function toggleServico(servico: { nome: string; valor: string }) {
    const jaExiste = servicosSelecionados.some(s => s.nome === servico.nome);
  
    if (jaExiste) {
      // remove
      setServicosSelecionados(prev =>
        prev.filter(s => s.nome !== servico.nome)
      );
    } else {
      // adiciona
      setServicosSelecionados(prev => [...prev, servico]);
    }
  }

  function salvar() {
    if (!diaSelecionado || !localSelecionado || servicosSelecionados.length === 0 || !horarioSelecionado) {
      Alert.alert("Erro", "Preencha todas as etapas do agendamento!");
      return;
    }

    agendamentosDB.push({
        id: Math.random().toString(36).substring(2, 9),
        nome: "Bruno Campos",
        horario: horarioSelecionado,
        servicos: servicosSelecionados.map(s => s.nome),
        data: diaSelecionado,
        valores: servicosSelecionados.map(s => s.valor),
        local: ""
    });

    Alert.alert("Sucesso", "Agendamento realizado com sucesso!");
    navigation.goBack();
  }

  return (
    <ScrollView 
        style={styles.container}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Novo Agendamento ✂️</Text>

      {/* Seleção de Dia */}
      <Text style={styles.section}>Selecione o Dia:</Text>
      <View style={{ marginBottom: 10, height: 60 }}>
        <FlatList
            data={gerarProximosDias(7)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={[
                styles.chip,
                diaSelecionado === item && styles.chipSelected,
                ]}
                onPress={() => setDiaSelecionado(item)}
            >
                <Text
                style={[
                    styles.chipText,
                    diaSelecionado === item && styles.chipTextSelected,
                ]}
                >
                {formatarData(item)}
                </Text>
            </TouchableOpacity>
            )}
        />
     </View>

      {/* Seleção de Local */}
      <Text style={styles.section}>Selecione o Local:</Text>
      {locais.map((local) => (
        <TouchableOpacity
          key={local}
          style={[
            styles.option,
            localSelecionado === local && styles.optionSelected,
          ]}
          onPress={() => setLocalSelecionado(local)}
        >
          <Text style={styles.optionText}>{local}</Text>
        </TouchableOpacity>
      ))}

      {/* Seleção de Serviço */}
      <Text style={styles.section}>Selecione o Serviço:</Text>
      {servicos.map((s) => {
            const selecionado = servicosSelecionados.some(item => item.nome === s.nome);

  return (
    <TouchableOpacity
      key={s.nome}
      style={[styles.option, selecionado && styles.optionSelected]}
      onPress={() => toggleServico(s)}
    >
      <Text style={[styles.optionText, selecionado && { color: "#fff" }]}>
        {s.nome} — {s.valor}
      </Text>
    </TouchableOpacity>
  );
})}

      {/* Seleção de Horário */}
      <Text style={styles.section}>Selecione o Horário:</Text>
      <View style={{ marginBottom: 10, height: 60 }}>
      <FlatList
        data={horarios}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chip,
              horarioSelecionado === item && styles.chipSelected,
            ]}
            onPress={() => setHorarioSelecionado(item)}
          >
            <Text
              style={[
                styles.chipText,
                horarioSelecionado === item && styles.chipTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      </View>

      {/* Botão Agendar */}
      <TouchableOpacity style={styles.buttonAgendar} onPress={salvar}>
        <Text style={styles.buttonAgendarText}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* Gera próximos dias no formato YYYY-MM-DD */
function gerarProximosDias(quantidade: number) {
  const hoje = new Date();
  const dias = [];

  for (let i = 0; i < quantidade; i++) {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i);
    dias.push(d.toISOString().substring(0, 10));
  }

  return dias;
}

/* Formata data 2025-02-12 → 12/02/2025 */
function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E1E2F",
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#4A6CFF",
    marginBottom: 10,
  },

  /* Chips (dias e horários) */
  chip: {
    backgroundColor: "#E8ECF8",
    paddingVertical: 14,  // antes era 10
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 10,
    height: 48,           // garante altura fixa para exibição completa
    justifyContent: "center",
  },
  chipSelected: {
    backgroundColor: "#4A6CFF",
  },
  chipText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  /* Opções (locais e serviços) */
  option: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  optionSelected: {
    backgroundColor: "#4A6CFF",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  /* Botão Agendar */
  buttonAgendar: {
    backgroundColor: "#4A6CFF",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonAgendarText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
