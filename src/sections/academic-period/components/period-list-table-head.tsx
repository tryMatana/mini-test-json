/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table Head
 * List Periode Akademik
 *
 * Tujuan :
 * Komponen header tabel untuk halaman List Periode Akademik.
 * Menampilkan kolom-kolom dengan fitur sorting dan checkbox.
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from 'src/sections/academic-period-report/utils';

// ----------------------------------------------------------------------

interface HeadLabel {
  id: keyof AcademicPeriodProps | 'actions';
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface PeriodListTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  headLabel: HeadLabel[];
  onSort: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  numSelected: number;
  rowCount: number;
}

export function PeriodListTableHead({
  order,
  orderBy,
  headLabel,
  onSort,
  onSelectAll,
  numSelected,
  rowCount,
}: PeriodListTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event) => onSelectAll(event.target.checked)}
          />
        </TableCell>
        {headLabel.map((headCell) => {
          if (headCell.sortable === false) {
            return (
              <TableCell key={headCell.id} align={headCell.align || 'left'}>
                {headCell.label}
              </TableCell>
            );
          }
          return (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
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
          );
        })}
      </TableRow>
    </TableHead>
  );
}
