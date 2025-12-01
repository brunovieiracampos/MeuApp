export type Agendamento = {
  id: string;
  nome: string;
  horario: string;
  servico: string;
  data: string;
  valor: string;
  local: string;
};

export const agendamentosDB: Agendamento[] = [
  {
    id: "1",
    nome: "Bruno Campos",
    horario: "09:00",
    servico: "Corte Masculino",
    data: "2025-02-12",
    valor: "R$ 50,00",
    local: "Cabelos Will",
  },
  {
    id: "2",
    nome: "Bruno Campos",
    horario: "10:30",
    servico: "Corte + Barba",
    data: "2025-02-12",
    valor: "R$ 70,00",
    local: "Cabelos Will",
  },
  {
    id: "3",
    nome: "Bruno Campos",
    horario: "14:00",
    servico: "Barba",
    data: "2025-02-11",
    valor: "R$ 35,00",
    local: "Cabelos Will",
  },
  {
    id: "4",
    nome: "Bruno Campos",
    horario: "16:00",
    servico: "Corte Degradê",
    data: "2025-02-10",
    valor: "R$ 60,00",
    local: "Cabelos Will",
  },
  {
    id: "5",
    nome: "Bruno Campos",
    horario: "18:30",
    servico: "Corte + Sobrancelha",
    data: "2025-02-08",
    valor: "R$ 75,00",
    local: "Cabelos Will",
  },
];
