/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : View
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen utama untuk halaman Report Periode Akademik.
 * Halaman read-only dengan filter, sorting, pagination,
 * print preview, dan export CSV/Excel.
 *
 * Requirement :
 * - 5 Filter (Tanggal Awal Kuliah, Tanggal Akhir Kuliah,
 *   Tanggal Awal UTS, Tanggal Awal UAS, Status)
 * - Print Preview / Print Modal
 * - Export CSV & Excel
 * - Sorting pada setiap kolom
 * - Pagination (5/10/25 baris per halaman)
 * - Kolom Aksi TIDAK ditampilkan
 * ==========================================================
 */

import { useState, useCallback } from 'react';

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

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

import {
  TableNoData,
  PeriodFilters,
  PeriodToolbar,
  TableEmptyRows,
  PeriodTableHead,
} from '../components';
import {
  emptyRows,
  formatDate,
  applyFilter,
  getComparator,
  getFilterInfo,
  type FilterValues,
  defaultFilterValues,
} from '../utils';

// ----------------------------------------------------------------------

const headLabel = [
  { id: 'code', label: 'Kode' },
  { id: 'name', label: 'Nama Periode' },
  { id: 'startDate', label: 'Tanggal Awal Kuliah' },
  { id: 'endDate', label: 'Tanggal Akhir Kuliah' },
  { id: 'startUts', label: 'Tanggal Awal UTS' },
  { id: 'startUas', label: 'Tanggal Awal UAS' },
  { id: 'totalStudyPrograms', label: 'Total Prodi', align: 'center' as const },
  { id: 'isActive', label: 'Aktif' },
];

// ----------------------------------------------------------------------

export function AcademicPeriodReportView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('code');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterValues>(defaultFilterValues);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilterValues);

  const filterInfo = getFilterInfo(appliedFilters);

  const dataFiltered = applyFilter({
    inputData: _academicPeriods,
    comparator: getComparator(order, orderBy as any),
    filters: appliedFilters,
  });

  const notFound = !dataFiltered.length;

  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const handleFiltersChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback(() => {
    setAppliedFilters(filters);
    setPage(0);
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilterValues);
    setAppliedFilters(defaultFilterValues);
    setPage(0);
  }, []);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Report Periode Akademik
        </Typography>
      </Box>

      <PeriodFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        onReset={handleResetFilters}
      />

      <Card>
        <PeriodToolbar
          dataFiltered={dataFiltered}
          filterInfo={filterInfo}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 900 }}>
              <PeriodTableHead
                order={order}
                orderBy={orderBy}
                headLabel={headLabel}
                onSort={handleSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
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
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>
    </DashboardContent>
  );
}
