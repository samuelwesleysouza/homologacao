// Mock de fornecedores cobrindo todos os tipos de qualificação
const tiposQualificacao = [
  "AGENCIADOR DE CARGA", "AGENTE", "ARQUITETURA - REGULAR", "ASSESSORIA JURÍDICA",
  "ASSESSORIA PARA LICEN", "ASSISTÊNCIA EM MEDIC", "BASE & COLIGADA - B", "BASE COLIGADA - DUPLI"
];

const departamentos = ["Compras", "Financeiro", "Qualidade", "Jurídico"];

const statusList = ["Homologado", "Pendente", "Bloqueado"] as const;

function randomStatus() {
  const r = Math.random();
  if (r < 0.6) return "Homologado";
  if (r < 0.85) return "Pendente";
  return "Bloqueado";
}

const mockFornecedores = Array.from({ length: 62 }).map((_, i) => {
  const tipo = tiposQualificacao[i % tiposQualificacao.length];
  const status = randomStatus();
  const dep = departamentos[i % departamentos.length];
  return {
    codigo: 57000 + i,
    cpfCnpj: (100000000000 + i).toString(),
    nomeFantasia: `Fantasia ${tipo.slice(0, 20)}`,
    tipoQualificacao: tipo,
    dataUltimaOp: "22/04/2025 10:11",
    status,
    departamentoResponsavel: dep,
  };
});

export function getKpis(fornecedores: typeof mockFornecedores) {
  const total = fornecedores.length;
  const statusCounts = statusList.reduce((acc, s) => ({ ...acc, [s]: fornecedores.filter(f => f.status === s).length }), {} as Record<string, number>);
  return [
    {
      title: "Empresas Homologadas",
      value: statusCounts["Homologado"],
      variation: 6.4, // Mock
      statusPercents: {
        Homologado: Math.round((statusCounts["Homologado"] / total) * 100),
        Pendente: Math.round((statusCounts["Pendente"] / total) * 100),
        Bloqueado: Math.round((statusCounts["Bloqueado"] / total) * 100),
      },
    },
    {
      title: "Homologações Pendentes",
      value: statusCounts["Pendente"],
      variation: -4.1, // Mock
      statusPercents: {
        Homologado: Math.round((statusCounts["Homologado"] / total) * 100),
        Pendente: Math.round((statusCounts["Pendente"] / total) * 100),
        Bloqueado: Math.round((statusCounts["Bloqueado"] / total) * 100),
      },
    },
    {
      title: "Falta de Documentos",
      value: statusCounts["Bloqueado"],
      variation: 0.0, // Mock
      statusPercents: {
        Homologado: Math.round((statusCounts["Homologado"] / total) * 100),
        Pendente: Math.round((statusCounts["Pendente"] / total) * 100),
        Bloqueado: Math.round((statusCounts["Bloqueado"] / total) * 100),
      },
    },
  ];
}

export default mockFornecedores;
