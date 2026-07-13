/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Filters
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen filter untuk halaman Report Periode Akademik.
 * Menampilkan 5 filter (date range + status) beserta
 * tombol Search dan Reset.
 *
 * Requirement :
 * - Filter Date Range Tanggal Awal Kuliah (Dari & Hingga)
 * - Filter Date Range Tanggal Akhir Kuliah (Dari & Hingga)
 * - Filter Date Range Tanggal Awal UTS (Dari & Hingga)
 * - Filter Date Range Tanggal Awal UAS (Dari & Hingga)
 * - Filter Status (Semua / Aktif / Tidak Aktif)
 * - Tombol Search
 * - Tombol Reset
 * ==========================================================
 */

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Iconify } from 'src/components/iconify';

import type { FilterValues } from '../utils';

// ----------------------------------------------------------------------

type PeriodFiltersProps = {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  onSearch: () => void;
  onReset: () => void;
};

export function PeriodFilters({ filters, onFiltersChange, onSearch, onReset }: PeriodFiltersProps) {
  const handleDateChange = (field: keyof FilterValues, value: string | null) => {
    onFiltersChange({
      ...filters,
      [field]: value || null,
    });
  };

  const handleStatusChange = (value: 'all' | 'active' | 'inactive') => {
    onFiltersChange({
      ...filters,
      status: value,
    });
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        {/* ----------------------------------------------------------
          Mini Test Requirement
          Filter Date Range Tanggal Awal Kuliah (Dari & Hingga)
        ---------------------------------------------------------- */}
        {/* Row 1: Tanggal Awal Kuliah */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
          <TextField
            type="date"
            label="Tanggal Awal Kuliah (Dari)"
            value={filters.startDateFrom || ''}
            onChange={(e) => handleDateChange('startDateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
          <TextField
            type="date"
            label="Tanggal Awal Kuliah (Hingga)"
            value={filters.startDateTo || ''}
            onChange={(e) => handleDateChange('startDateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />

          {/* ----------------------------------------------------------
            Mini Test Requirement
            Filter Date Range Tanggal Akhir Kuliah (Dari & Hingga)
          ---------------------------------------------------------- */}
          {/* Row 2: Tanggal Akhir Kuliah */}
          <TextField
            type="date"
            label="Tanggal Akhir Kuliah (Dari)"
            value={filters.endDateFrom || ''}
            onChange={(e) => handleDateChange('endDateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
          <TextField
            type="date"
            label="Tanggal Akhir Kuliah (Hingga)"
            value={filters.endDateTo || ''}
            onChange={(e) => handleDateChange('endDateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
        </Stack>

        {/* ----------------------------------------------------------
          Mini Test Requirement
          Filter Date Range Tanggal Awal UTS & Tanggal Awal UAS
        ---------------------------------------------------------- */}
        {/* Row 3: Tanggal UTS & UAS */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
          <TextField
            type="date"
            label="Tanggal Awal UTS (Dari)"
            value={filters.utsDateFrom || ''}
            onChange={(e) => handleDateChange('utsDateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
          <TextField
            type="date"
            label="Tanggal Awal UTS (Hingga)"
            value={filters.utsDateTo || ''}
            onChange={(e) => handleDateChange('utsDateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />

          <TextField
            type="date"
            label="Tanggal Awal UAS (Dari)"
            value={filters.uasDateFrom || ''}
            onChange={(e) => handleDateChange('uasDateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
          <TextField
            type="date"
            label="Tanggal Awal UAS (Hingga)"
            value={filters.uasDateTo || ''}
            onChange={(e) => handleDateChange('uasDateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flexBasis: '20%', minWidth: 200 }}
          />
        </Stack>

        {/* ----------------------------------------------------------
          Mini Test Requirement
          Filter Status (Semua / Aktif / Tidak Aktif)
        ---------------------------------------------------------- */}
        {/* Row 4: Status & Buttons */}
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value as 'all' | 'active' | 'inactive')}
              label="Status"
            >
              <MenuItem value="all">Semua</MenuItem>
              <MenuItem value="active">Aktif</MenuItem>
              <MenuItem value="inactive">Tidak Aktif</MenuItem>
            </Select>
          </FormControl>

          {/* ----------------------------------------------------------
            Mini Test Requirement
            Tombol Search - Menerapkan filter yang dipilih
          ---------------------------------------------------------- */}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:search-fill" />}
            onClick={onSearch}
          >
            Search
          </Button>

          {/* ----------------------------------------------------------
            Mini Test Requirement
            Tombol Reset - Mengembalikan semua filter ke default
          ---------------------------------------------------------- */}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:restart-bold" />}
            onClick={onReset}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
