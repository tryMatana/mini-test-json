/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : View - List
 * List Periode Akademik
 *
 * Tujuan :
 * Komponen utama untuk halaman List Periode Akademik.
 * Mengelola state data, filter, sorting, pagination,
 * selection (checkbox), dan operasi CRUD.
 *
 * Route : /academic-period
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { _academicPeriods } from 'src/_mock/academic-period-data';

import { Scrollbar } from 'src/components/scrollbar';

import { emptyRows, getComparator } from 'src/sections/academic-period-report/utils';

import {
  PeriodListToolbar,
  PeriodListTableRow,
  PeriodListTableHead,
  PeriodListDeleteDialog,
} from '../components';

// ----------------------------------------------------------------------

const headLabel = [
  { id: 'code' as const, label: 'Kode' },
  { id: 'name' as const, label: 'Nama Periode' },
  { id: 'startDate' as const, label: 'Tanggal Awal Kuliah' },
  { id: 'endDate' as const, label: 'Tanggal Akhir Kuliah' },
  { id: 'startUts' as const, label: 'Tanggal Awal UTS' },
  { id: 'startUas' as const, label: 'Tanggal Awal UAS' },
  { id: 'totalStudyPrograms' as const, label: 'Total Prodi', align: 'center' as const },
  { id: 'isActive' as const, label: 'Aktif' },
  { id: 'actions' as const, label: 'Aksi', align: 'center' as const, sortable: false },
];

// ----------------------------------------------------------------------

export function PeriodListView() {
  const navigate = useNavigate();

  const [data, setData] = useState<AcademicPeriodProps[]>(_academicPeriods);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting
  const [orderBy, setOrderBy] = useState('code');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // Filter
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Selection
  const [selected, setSelected] = useState<string[]>([]);

  // Delete dialog
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AcademicPeriodProps | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Apply filter
  const filteredData = data.filter((item) => {
    if (filterStatus !== 'all') {
      const isActive = filterStatus === 'active';
      if (item.isActive !== isActive) return false;
    }
    if (appliedSearch) {
      const q = appliedSearch.toLowerCase();
      return (
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort
  const sortedData = [...filteredData].sort(getComparator(order, orderBy as any));

  // Handlers
  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const visibleIds = sortedData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((r) => r.id);
        setSelected(visibleIds);
        return;
      }
      setSelected([]);
    },
    [sortedData, page, rowsPerPage]
  );

  const handleSelectRow = useCallback(
    (id: string, checked: boolean) => {
      setSelected((prev) =>
        checked ? [...prev, id] : prev.filter((s) => s !== id)
      );
    },
    []
  );

  const handleSearch = useCallback(() => {
    setAppliedSearch(searchText);
    setPage(0);
  }, [searchText]);

  const handleRefresh = useCallback(() => {
    setSearchText('');
    setAppliedSearch('');
    setFilterStatus('all');
    setPage(0);
    setSelected([]);
  }, []);

  const handleAdd = useCallback(() => {
    navigate('/academic-period/add');
  }, [navigate]);

  const handleEditRow = useCallback(
    (row: AcademicPeriodProps) => {
      navigate(`/academic-period/${row.id}/edit`);
    },
    [navigate]
  );

  const handleDeleteRow = useCallback((row: AcademicPeriodProps) => {
    setDeleteTarget(row);
    setIsBulkDelete(false);
    setOpenDelete(true);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setIsBulkDelete(true);
    setOpenDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (isBulkDelete) {
      setData((prev) => prev.filter((item) => !selected.includes(item.id)));
      setSelected([]);
    } else if (deleteTarget) {
      setData((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setSelected((prev) => prev.filter((id) => id !== deleteTarget.id));
    }
    setOpenDelete(false);
    setDeleteTarget(null);
    setIsBulkDelete(false);
  }, [isBulkDelete, deleteTarget, selected]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Periode Akademik
        </Typography>
      </Box>

      <Card>
        <PeriodListToolbar
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onAdd={handleAdd}
          onDeleteSelected={handleDeleteSelected}
          numSelected={selected.length}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 1000 }}>
              <PeriodListTableHead
                order={order}
                orderBy={orderBy}
                headLabel={headLabel}
                onSort={handleSort}
                onSelectAll={handleSelectAll}
                numSelected={selected.length}
                rowCount={sortedData.length}
              />
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PeriodListTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelect={(checked) => handleSelectRow(row.id, checked)}
                      onEdit={handleEditRow}
                      onDelete={handleDeleteRow}
                    />
                  ))}

                {sortedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={headLabel.length + 1} align="center">
                      <Typography variant="body2" sx={{ py: 3, color: 'text.secondary' }}>
                        Tidak ada data ditemukan
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {sortedData.length > 0 &&
                  Array.from({ length: Math.max(0, emptyRows(page, rowsPerPage, sortedData.length)) }).map(
                    (_, i) => (
                      <TableRow key={`empty-${i}`} style={{ height: 52 }}>
                        <TableCell colSpan={headLabel.length + 1} />
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>

      <PeriodListDeleteDialog
        open={openDelete}
        onClose={() => { setOpenDelete(false); setDeleteTarget(null); setIsBulkDelete(false); }}
        onConfirm={handleConfirmDelete}
        title={isBulkDelete ? 'Hapus Data Terpilih' : 'Hapus Periode Akademik'}
        message={
          isBulkDelete
            ? `Anda yakin ingin menghapus ${selected.length} data yang dipilih?`
            : deleteTarget
              ? `Anda yakin ingin menghapus "${deleteTarget.name}" (${deleteTarget.code})?`
              : ''
        }
      />
    </DashboardContent>
  );
}
