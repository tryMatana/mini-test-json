/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Table Row (List)
 * List Periode Akademik
 *
 * Tujuan :
 * Komponen baris tabel untuk halaman List Periode Akademik.
 * Menampilkan satu record data dengan checkbox, badge status,
 * dan tombol aksi (View, Edit, Delete).
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

import { useNavigate } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { formatDate } from 'src/sections/academic-period-report/utils';

// ----------------------------------------------------------------------

type PeriodListTableRowProps = {
  row: AcademicPeriodProps;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onEdit: (row: AcademicPeriodProps) => void;
  onDelete: (row: AcademicPeriodProps) => void;
};

export function PeriodListTableRow({
  row,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: PeriodListTableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(event) => onSelect(event.target.checked)} />
      </TableCell>
      <TableCell>{row.code}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{formatDate(row.startDate)}</TableCell>
      <TableCell>{formatDate(row.endDate)}</TableCell>
      <TableCell>{formatDate(row.startUts)}</TableCell>
      <TableCell>{formatDate(row.startUas)}</TableCell>
      <TableCell align="center">{row.totalStudyPrograms}</TableCell>
      <TableCell>
        <Label color={row.isActive ? 'success' : 'error'}>
          {row.isActive ? 'Aktif' : 'Tidak Aktif'}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Lihat Detail">
          <IconButton color="info" onClick={() => navigate(`/academic-period/${row.id}`)}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => onEdit(row)}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hapus">
          <IconButton color="error" onClick={() => onDelete(row)}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
