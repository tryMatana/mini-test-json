/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Toolbar (List)
 * List Periode Akademik
 *
 * Tujuan :
 * Komponen toolbar untuk halaman List Periode Akademik.
 * Berisi dropdown status, search, tombol Tambah dan Hapus.
 * ==========================================================
 */


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PeriodListToolbarProps = {
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  searchText: string;
  onSearchTextChange: (value: string) => void;
  onSearch: () => void;
  onRefresh: () => void;
  onAdd: () => void;
  onDeleteSelected: () => void;
  numSelected: number;
};

export function PeriodListToolbar({
  filterStatus,
  onFilterStatusChange,
  searchText,
  onSearchTextChange,
  onSearch,
  onRefresh,
  onAdd,
  onDeleteSelected,
  numSelected,
}: PeriodListToolbarProps) {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        p: (theme) => theme.spacing(1, 2),
      }}
    >
      {/* Left side: filters + search */}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', flexGrow: 1 }}>
        <TextField
          select
          size="small"
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          sx={{ minWidth: 140 }}
          label="Status"
        >
          <MenuItem value="all">Semua</MenuItem>
          <MenuItem value="active">Aktif</MenuItem>
          <MenuItem value="inactive">Tidak Aktif</MenuItem>
        </TextField>

        <TextField
          size="small"
          placeholder="Search Periode Akademik..."
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
          sx={{ minWidth: 260 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={20} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Tooltip title="Search">
          <IconButton color="primary" onClick={onSearch}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Refresh">
          <IconButton onClick={onRefresh}>
            <Iconify icon="solar:restart-bold" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Right side: action buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {numSelected > 0 && (
          <Tooltip title="Hapus Terpilih">
            <Button
              variant="outlined"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onDeleteSelected}
            >
              Hapus ({numSelected})
            </Button>
          </Tooltip>
        )}

        <Tooltip title="Tambah Data">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onAdd}
          >
            Tambah
          </Button>
        </Tooltip>
      </Box>
    </Toolbar>
  );
}
