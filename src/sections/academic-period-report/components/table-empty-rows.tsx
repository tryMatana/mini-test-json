/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table Empty Rows
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen untuk menampilkan baris kosong di akhir tabel
 * agar tinggi tabel tetap konsisten meskipun data tidak
 * mengisi seluruh halaman.
 * ==========================================================
 */

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// -----------------------------------------------

interface TableEmptyRowsProps {
  emptyRows: number;
  height: number;
}

export function TableEmptyRows({ emptyRows, height }: TableEmptyRowsProps) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        height: height * emptyRows,
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
