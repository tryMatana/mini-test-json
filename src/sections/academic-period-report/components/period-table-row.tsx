/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table Row
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen baris tabel untuk halaman Report Periode Akademik.
 * Kolom Aksi TIDAK ditampilkan (sesuai requirement).
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

import { formatDate } from '../utils';

// ----------------------------------------------------------------------

type PeriodTableRowProps = {
  row: AcademicPeriodProps;
};

export function PeriodTableRow({ row }: PeriodTableRowProps) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{row.code}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{formatDate(row.startDate)}</TableCell>
      <TableCell>{formatDate(row.endDate)}</TableCell>
      <TableCell>{row.startUts ? formatDate(row.startUts) : '-'}</TableCell>
      <TableCell>{row.startUas ? formatDate(row.startUas) : '-'}</TableCell>
      <TableCell align="center">{row.totalStudyPrograms}</TableCell>
      <TableCell>
        <Label color={row.isActive ? 'success' : 'error'}>
          {row.isActive ? 'Aktif' : 'Tidak Aktif'}
        </Label>
      </TableCell>
    </TableRow>
  );
}
