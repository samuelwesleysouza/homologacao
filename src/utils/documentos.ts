// Função utilitária para status de vencimento de documento
// Recebe a data de vencimento, lembreteDias e retorna 'VALIDO', 'A_VENCER', 'VENCIDO'

export function getStatusDocumento(vencimento: string | undefined, lembreteDias: number = 3): 'VALIDO' | 'A_VENCER' | 'VENCIDO' | 'NAO_INFORMADO' {
  if (!vencimento) return 'NAO_INFORMADO';
  const hoje = new Date();
  const dataVenc = new Date(vencimento);
  // Zera horas para comparar apenas datas
  hoje.setHours(0,0,0,0);
  dataVenc.setHours(0,0,0,0);
  const diffDias = Math.ceil((dataVenc.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDias < 0) return 'VENCIDO';
  if (diffDias <= lembreteDias) return 'A_VENCER';
  return 'VALIDO';
}
