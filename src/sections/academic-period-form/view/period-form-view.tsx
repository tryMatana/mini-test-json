/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : View - Form
 * Form Periode Akademik (Tambah / Edit)
 *
 * Tujuan :
 * Komponen form untuk menambah atau mengedit data
 * Periode Akademik. Menggunakan layout dua kolom.
 * Mode ditentukan oleh URL params.
 *
 * Route :
 * - /academic-period/add      (Create mode)
 * - /academic-period/:id/edit (Edit mode)
 * ==========================================================
 */


import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';
import { _academicPeriods } from 'src/_mock/academic-period-data';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type FormValues = {
  code: string;
  name: string;
  shortName: string;
  year: string;
  semester: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  startUts: string;
  endUts: string;
  startUas: string;
  endUas: string;
  examChairman: string;
  totalMeetings: string;
  minAttendance: string;
  serviceQuestionnaire: string;
};

const defaultFormValues: FormValues = {
  code: '',
  name: '',
  shortName: '',
  year: '',
  semester: '1',
  isActive: true,
  startDate: '',
  endDate: '',
  startUts: '',
  endUts: '',
  startUas: '',
  endUas: '',
  examChairman: '',
  totalMeetings: '16',
  minAttendance: '75',
  serviceQuestionnaire: 'Ya',
};

// ----------------------------------------------------------------------

export function PeriodFormView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    if (isEdit && id) {
      const existing = _academicPeriods.find((item) => item.id === id);
      if (existing) {
        setFormValues({
          code: existing.code,
          name: existing.name,
          shortName: existing.shortName,
          year: String(existing.year),
          semester: String(existing.semester),
          isActive: existing.isActive,
          startDate: existing.startDate,
          endDate: existing.endDate,
          startUts: existing.startUts,
          endUts: existing.endUts,
          startUas: existing.startUas,
          endUas: existing.endUas,
          examChairman: existing.examChairman,
          totalMeetings: String(existing.totalMeetings),
          minAttendance: String(existing.minAttendance),
          serviceQuestionnaire: existing.serviceQuestionnaire,
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = useCallback(
    (field: keyof FormValues) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!formValues.code.trim()) newErrors.code = 'Wajib diisi';
    if (!formValues.name.trim()) newErrors.name = 'Wajib diisi';
    if (!formValues.shortName.trim()) newErrors.shortName = 'Wajib diisi';
    if (!formValues.year.trim()) newErrors.year = 'Wajib diisi';
    if (!formValues.startDate) newErrors.startDate = 'Wajib diisi';
    if (!formValues.endDate) newErrors.endDate = 'Wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formValues]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    navigate('/academic-period');
  }, [validate, navigate]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Kembali ke Daftar">
          <IconButton onClick={() => navigate('/academic-period')}>
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4">
          {isEdit ? 'Edit Periode Akademik' : 'Tambah Periode Akademik'}
        </Typography>
      </Box>

      <Card sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <TextField
                label="Kode Periode"
                value={formValues.code}
                onChange={handleChange('code')}
                error={Boolean(errors.code)}
                helperText={errors.code}
                fullWidth
                required
              />
              <TextField
                label="Tahun Ajaran"
                type="number"
                value={formValues.year}
                onChange={handleChange('year')}
                error={Boolean(errors.year)}
                helperText={errors.year}
                fullWidth
                required
              />
              <TextField
                label="Semester"
                select
                value={formValues.semester}
                onChange={handleChange('semester')}
                fullWidth
              >
                <MenuItem value="1">1 (Ganjil)</MenuItem>
                <MenuItem value="2">2 (Genap)</MenuItem>
                <MenuItem value="3">3 (Pendek)</MenuItem>
              </TextField>
              <TextField
                label="Nama Periode"
                value={formValues.name}
                onChange={handleChange('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                required
              />
              <TextField
                label="Nama Singkat"
                value={formValues.shortName}
                onChange={handleChange('shortName')}
                error={Boolean(errors.shortName)}
                helperText={errors.shortName}
                fullWidth
                required
              />
              <TextField
                label="Tanggal Awal Kuliah"
                type="date"
                value={formValues.startDate}
                onChange={handleChange('startDate')}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Tanggal Akhir Kuliah"
                type="date"
                value={formValues.endDate}
                onChange={handleChange('endDate')}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate}
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Tanggal Awal UTS"
                type="date"
                value={formValues.startUts}
                onChange={handleChange('startUts')}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <TextField
                label="Tanggal Akhir UTS"
                type="date"
                value={formValues.endUts}
                onChange={handleChange('endUts')}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Tanggal Awal UAS"
                type="date"
                value={formValues.startUas}
                onChange={handleChange('startUas')}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Tanggal Akhir UAS"
                type="date"
                value={formValues.endUas}
                onChange={handleChange('endUas')}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Ketua Ujian"
                value={formValues.examChairman}
                onChange={handleChange('examChairman')}
                fullWidth
              />
              <TextField
                label="Jumlah Pertemuan Kuliah"
                type="number"
                value={formValues.totalMeetings}
                onChange={handleChange('totalMeetings')}
                fullWidth
                inputProps={{ min: 1 }}
              />
              <TextField
                label="Minimal Presensi (%)"
                type="number"
                value={formValues.minAttendance}
                onChange={handleChange('minAttendance')}
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
              <TextField
                label="Kuesioner Layanan"
                select
                value={formValues.serviceQuestionnaire}
                onChange={handleChange('serviceQuestionnaire')}
                fullWidth
              >
                <MenuItem value="Ya">Ya</MenuItem>
                <MenuItem value="Tidak">Tidak</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Switch
                    checked={formValues.isActive}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, isActive: e.target.checked }))}
                  />
                }
                label="Aktif"
              />
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
            Kembali ke Daftar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Iconify icon="solar:check-circle-bold" />}
          >
            Simpan
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
