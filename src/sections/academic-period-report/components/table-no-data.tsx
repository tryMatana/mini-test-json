/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table No Data
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen untuk menampilkan pesan "No data" saat hasil
 * filter tidak mengembalikan data apapun.
 * ==========================================================
 */

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// -----------------------------------------------

interface TableNoDataProps {
  searchQuery?: string;
}

export function TableNoData({ searchQuery }: TableNoDataProps) {
  return (
    <TableRow>
      <TableCell colSpan={9} sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          {searchQuery ? `No data found for "${searchQuery}"` : 'No data'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
