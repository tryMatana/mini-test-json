/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Toolbar
 * Report Periode Akademik
 *
 * Tujuan :
 * Komponen toolbar untuk halaman Report Periode Akademik.
 * Menampilkan tombol Print (dengan Print Preview Modal),
 * Export CSV, dan Export Excel.
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

import { formatDate, exportToCSV, exportToExcel } from '../utils';

import type { FilterInfo } from '../utils';

// ----------------------------------------------------------------------

type PeriodToolbarProps = {
  dataFiltered: AcademicPeriodProps[];
  filterInfo: FilterInfo;
};

export function PeriodToolbar({ dataFiltered, filterInfo }: PeriodToolbarProps) {
  const [openPrintPreview, setOpenPrintPreview] = useState(false);

  const handleOpenPrintPreview = useCallback(() => {
    setOpenPrintPreview(true);
  }, []);

  const handleClosePrintPreview = useCallback(() => {
    setOpenPrintPreview(false);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExportCSVClick = useCallback(() => {
    exportToCSV(dataFiltered, filterInfo);
  }, [dataFiltered, filterInfo]);

  const handleExportExcelClick = useCallback(() => {
    exportToExcel(dataFiltered, filterInfo);
  }, [dataFiltered, filterInfo]);

  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          p: (theme) => theme.spacing(0, 1, 0, 3),
        }}
      >
        <Tooltip title="Print Preview">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={handleOpenPrintPreview}
          >
            Print
          </Button>
        </Tooltip>

        <Tooltip title="Export CSV">
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:share-bold" />}
            onClick={handleExportCSVClick}
          >
            CSV
          </Button>
        </Tooltip>

        <Tooltip title="Export Excel">
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:cart-3-bold" />}
            onClick={handleExportExcelClick}
          >
            Excel
          </Button>
        </Tooltip>
      </Toolbar>

      <Dialog
        open={openPrintPreview}
        onClose={handleClosePrintPreview}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Print Preview - Report Periode Akademik</Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ overflow: 'auto', p: 2 }}>
            <Box sx={{ print: { display: 'block' } }}>
              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                Report Periode Akademik
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                Tanggal Cetak: {formatDate(new Date().toISOString().split('T')[0])}
              </Typography>

              {Object.keys(filterInfo).length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Filter yang Digunakan:
                  </Typography>
                  {Object.entries(filterInfo).map(([key, value]) => {
                    const keyLabel = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <Typography key={key} variant="body2">
                        • {keyLabel}: {value}
                      </Typography>
                    );
                  })}
                </Box>
              )}

              <TableContainer sx={{ mt: 2 }}>
                <Table size="small" sx={{ border: '1px solid #ddd' }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Kode</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Nama Periode</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Tanggal Awal Kuliah</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Tanggal Akhir Kuliah</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Tanggal Awal UTS</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Tanggal Awal UAS</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ddd' }}>Total Prodi</TableCell>
                      <TableCell>Aktif</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataFiltered.map((item) => (
                      <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{item.code}</TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{item.name}</TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{formatDate(item.startDate)}</TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{formatDate(item.endDate)}</TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                          {item.startUts ? formatDate(item.startUts) : '-'}
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                          {item.startUas ? formatDate(item.startUas) : '-'}
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>{item.totalStudyPrograms}</TableCell>
                        <TableCell>{item.isActive ? 'Aktif' : 'Tidak Aktif'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClosePrintPreview} color="inherit">
            Cancel
          </Button>
          <Button onClick={handlePrint} variant="contained" color="inherit">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
