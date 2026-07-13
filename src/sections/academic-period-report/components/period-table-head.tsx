/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table Head
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen header tabel untuk halaman Report Periode Akademik.
 * Menampilkan kolom-kolom dengan fitur sorting.
 *
 * Requirement :
 * - Kolom: Kode, Tahun, Semester, Status, Tanggal Awal Kuliah,
 *   Tanggal Akhir Kuliah, Tanggal Awal UTS, Tanggal Awal UAS
 * - Sorting pada setiap kolom (asc/desc)
 * - Kolom Aksi TIDAK ditampilkan (sesuai requirement)
 * ==========================================================
 */


import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '../utils';

// ----------------------------------------------------------------------

/**
 * Tipe data untuk label kolom tabel.
 */
interface HeadLabel {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
}

interface PeriodTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  headLabel: HeadLabel[];
  onSort: (id: string) => void;
}

export function PeriodTableHead({
  order,
  orderBy,
  headLabel,
  onSort,
}: PeriodTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Aksi</TableCell>
      </TableRow>
    </TableHead>
  );
}
