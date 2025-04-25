import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportGridToXLS(data: any[], columns: { field: string, headerName: string }[], fileName: string = 'relatorio-fornecedores.xlsx') {
  // Monta os dados para exportação
  const exportData = data.map(row => {
    const obj: any = {};
    columns.forEach(col => {
      obj[col.headerName] = row[col.field];
    });
    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
}
