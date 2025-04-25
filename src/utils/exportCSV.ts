// Exportação CSV simples e universal
export function exportGridToCSV(data: any[], columns: { field: string, headerName: string }[], fileName: string = 'relatorio-fornecedores.csv') {
  const separator = ',';
  const csvRows = [];
  // Cabeçalho
  csvRows.push(columns.map(col => '"' + col.headerName.replace(/"/g, '""') + '"').join(separator));
  // Dados
  data.forEach(row => {
    const vals = columns.map(col => {
      const val = row[col.field] !== undefined ? row[col.field] : '';
      return '"' + String(val).replace(/"/g, '""') + '"';
    });
    csvRows.push(vals.join(separator));
  });
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
