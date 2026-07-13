/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Mock Data
 * Periode Akademik
 *
 * Tujuan :
 * Mendefinisikan tipe data (type) dan data mock untuk
 * modul Periode Akademik. Tipe digunakan di seluruh
 * komponen (table, form, detail, export, dll).
 *
 * Type Fields:
 * - id, code, name, shortName
 * - year, semester, isActive
 * - startDate, endDate
 * - startUts, endUts
 * - startUas, endUas
 * - examChairman, totalMeetings, minAttendance
 * - serviceQuestionnaire, totalStudyPrograms
 * - createdAt
 * ==========================================================
 */

import { _id, _times } from './_mock';

// ----------------------------------------------------------------------

/**
 * Tipe data untuk satu record Periode Akademik.
 * Digunakan di seluruh komponen (table, form, detail, export, dll).
 */
export type AcademicPeriodProps = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  year: number;
  semester: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  startUts: string;
  endUts: string;
  startUas: string;
  endUas: string;
  examChairman: string;
  totalMeetings: number;
  minAttendance: number;
  serviceQuestionnaire: string;
  totalStudyPrograms: number;
  createdAt: string;
};

// ----------------------------------------------------------------------

/**
 * Generate data mock Periode Akademik yang realistis.
 * Mengikuti contoh data dari sistem lama.
 */
export const _academicPeriods: AcademicPeriodProps[] = [
  {
    id: _id(0),
    code: '20261',
    name: 'Periode 2026/2027 Ganjil',
    shortName: '2026/2027-G',
    year: 2026,
    semester: 1,
    isActive: true,
    startDate: '2026-08-31',
    endDate: '2026-12-18',
    startUts: '2026-10-15',
    endUts: '2026-10-22',
    startUas: '2027-01-05',
    endUas: '2027-01-15',
    examChairman: 'Dr. Budi Santoso, M.Kom.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 12,
    createdAt: _times(0),
  },
  {
    id: _id(1),
    code: '20252',
    name: 'Periode 2025/2026 Genap',
    shortName: '2025/2026-Gn',
    year: 2025,
    semester: 2,
    isActive: true,
    startDate: '2026-02-02',
    endDate: '2026-05-29',
    startUts: '2026-04-06',
    endUts: '2026-04-13',
    startUas: '2026-06-15',
    endUas: '2026-06-25',
    examChairman: 'Prof. drg. AHMAD Suharjono, M.Kes.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 12,
    createdAt: _times(1),
  },
  {
    id: _id(2),
    code: '20251',
    name: 'Periode 2025/2026 Ganjil',
    shortName: '2025/2026-G',
    year: 2025,
    semester: 1,
    isActive: false,
    startDate: '2025-09-01',
    endDate: '2025-12-19',
    startUts: '2025-10-13',
    endUts: '2025-10-20',
    startUas: '2026-01-05',
    endUas: '2026-01-14',
    examChairman: 'Dr. Eko Prasetyo, M.T.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 11,
    createdAt: _times(2),
  },
  {
    id: _id(3),
    code: '20242',
    name: 'Periode 2024/2025 Genap',
    shortName: '2024/2025-Gn',
    year: 2024,
    semester: 2,
    isActive: false,
    startDate: '2025-02-03',
    endDate: '2025-05-30',
    startUts: '2025-04-07',
    endUts: '2025-04-14',
    startUas: '2025-06-16',
    endUas: '2025-06-26',
    examChairman: 'Dr. Siti Nurhaliza, M.Pd.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 11,
    createdAt: _times(3),
  },
  {
    id: _id(4),
    code: '20241',
    name: 'Periode 2024/2025 Ganjil',
    shortName: '2024/2025-G',
    year: 2024,
    semester: 1,
    isActive: false,
    startDate: '2024-09-02',
    endDate: '2024-12-20',
    startUts: '2024-10-14',
    endUts: '2024-10-21',
    startUas: '2025-01-06',
    endUas: '2025-01-15',
    examChairman: 'Dr. Andi Wijaya, S.Kom., M.Kom.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 10,
    createdAt: _times(4),
  },
  {
    id: _id(5),
    code: '20232',
    name: 'Periode 2023/2024 Genap',
    shortName: '2023/2024-Gn',
    year: 2023,
    semester: 2,
    isActive: false,
    startDate: '2024-02-05',
    endDate: '2024-05-31',
    startUts: '2024-04-08',
    endUts: '2024-04-15',
    startUas: '2024-06-17',
    endUas: '2024-06-27',
    examChairman: 'Dr. Rina Marlina, S.E., M.M.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Tidak',
    totalStudyPrograms: 10,
    createdAt: _times(5),
  },
  {
    id: _id(6),
    code: '20231',
    name: 'Periode 2023/2024 Ganjil',
    shortName: '2023/2024-G',
    year: 2023,
    semester: 1,
    isActive: false,
    startDate: '2023-09-04',
    endDate: '2023-12-22',
    startUts: '2023-10-16',
    endUts: '2023-10-23',
    startUas: '2024-01-08',
    endUas: '2024-01-17',
    examChairman: 'Prof. Dr. Ir. H. Deddy Suprihadi, M.T.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 9,
    createdAt: _times(6),
  },
  {
    id: _id(7),
    code: '20222',
    name: 'Periode 2022/2023 Genap',
    shortName: '2022/2023-Gn',
    year: 2022,
    semester: 2,
    isActive: false,
    startDate: '2023-02-06',
    endDate: '2023-06-02',
    startUts: '2023-04-10',
    endUts: '2023-04-17',
    startUas: '2023-06-19',
    endUas: '2023-06-29',
    examChairman: 'Dr. Darmawan Setiawan, S.Pd., M.Pd.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Tidak',
    totalStudyPrograms: 9,
    createdAt: _times(7),
  },
  {
    id: _id(8),
    code: '20221',
    name: 'Periode 2022/2023 Ganjil',
    shortName: '2022/2023-G',
    year: 2022,
    semester: 1,
    isActive: false,
    startDate: '2022-09-05',
    endDate: '2022-12-23',
    startUts: '2022-10-17',
    endUts: '2022-10-24',
    startUas: '2023-01-09',
    endUas: '2023-01-18',
    examChairman: 'Dr. Agus Hermawan, S.Kom., M.Kom.',
    totalMeetings: 16,
    minAttendance: 75,
    serviceQuestionnaire: 'Ya',
    totalStudyPrograms: 8,
    createdAt: _times(8),
  },
  {
    id: _id(9),
    code: '20212',
    name: 'Periode 2021/2022 Genap',
    shortName: '2021/2022-Gn',
    year: 2021,
    semester: 2,
    isActive: false,
    startDate: '2022-02-07',
    endDate: '2022-06-03',
    startUts: '2022-04-11',
    endUts: '2022-04-18',
    startUas: '2022-06-20',
    endUas: '2022-06-30',
    examChairman: 'Dr. Mayang Prasetyo, S.T., M.T.',
    totalMeetings: 14,
    minAttendance: 75,
    serviceQuestionnaire: 'Tidak',
    totalStudyPrograms: 8,
    createdAt: _times(9),
  },
];
