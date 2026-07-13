/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : View - Detail
 * Detail Periode Akademik
 *
 * Tujuan :
 * Komponen untuk menampilkan detail data Periode Akademik
 * secara read-only. Semua field ditampilkan dalam layout
 * dua kolom seperti form.
 *
 * Route : /academic-period/:id
 * ==========================================================
 */

import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { DashboardContent } from 'src/layouts/dashboard';
import { _academicPeriods } from 'src/_mock/academic-period-data';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { formatDate } from 'src/sections/academic-period-report/utils';

// ----------------------------------------------------------------------

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function PeriodDetailView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = _academicPeriods.find((item) => item.id === id);

  if (!data) {
    return (
      <DashboardContent>
        <Typography variant="h4">Data tidak ditemukan</Typography>
        <Button onClick={() => navigate('/academic-period')} sx={{ mt: 2 }}>
          Kembali ke Daftar
        </Button>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Kembali ke Daftar">
          <IconButton onClick={() => navigate('/academic-period')}>
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Detail Periode Akademik
        </Typography>
        <Tooltip title="Tambah Baru">
          <IconButton color="primary" onClick={() => navigate('/academic-period/add')}>
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => navigate(`/academic-period/${id}/edit`)}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hapus">
          <IconButton color="error" onClick={() => navigate('/academic-period')}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      </Box>

      <Card sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <DetailField label="Kode Periode" value={data.code} />
              <DetailField label="Tahun Ajaran" value={String(data.year)} />
              <DetailField
                label="Semester"
                value={data.semester === 1 ? '1 (Ganjil)' : data.semester === 2 ? '2 (Genap)' : '3 (Pendek)'}
              />
              <DetailField label="Nama Periode" value={data.name} />
              <DetailField label="Nama Singkat" value={data.shortName} />
              <DetailField label="Tanggal Awal Kuliah" value={formatDate(data.startDate)} />
              <DetailField label="Tanggal Akhir Kuliah" value={formatDate(data.endDate)} />
              <DetailField label="Tanggal Awal UTS" value={data.startUts ? formatDate(data.startUts) : '-'} />
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <DetailField label="Tanggal Akhir UTS" value={data.endUts ? formatDate(data.endUts) : '-'} />
              <DetailField label="Tanggal Awal UAS" value={data.startUas ? formatDate(data.startUas) : '-'} />
              <DetailField label="Tanggal Akhir UAS" value={data.endUas ? formatDate(data.endUas) : '-'} />
              <DetailField label="Ketua Ujian" value={data.examChairman || '-'} />
              <DetailField label="Jumlah Pertemuan Kuliah" value={String(data.totalMeetings)} />
              <DetailField label="Minimal Presensi (%)" value={`${data.minAttendance}%`} />
              <DetailField label="Kuesioner Layanan" value={data.serviceQuestionnaire || '-'} />
              <Stack spacing={0.5}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Aktif
                </Typography>
                <Label color={data.isActive ? 'success' : 'error'}>
                  {data.isActive ? 'Aktif' : 'Tidak Aktif'}
                </Label>
              </Stack>
              <DetailField label="Total Program Studi" value={String(data.totalStudyPrograms)} />
            </Stack>
          </Grid>
        </Grid>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            onClick={() => navigate('/academic-period')}
          >
            Kembali
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => navigate('/academic-period/add')}
          >
            Tambah Baru
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={() => navigate(`/academic-period/${id}/edit`)}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
