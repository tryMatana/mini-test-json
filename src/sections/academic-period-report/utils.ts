/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Utility Functions
 * Report Periode Akademik
 *
 * Tujuan :
 * Berisi semua fungsi utilitas untuk modul Report
 * Periode Akademik, meliputi:
 * - Tipe data dan default value filter
 * - Komparator dan fungsi sorting
 * - Fungsi filter berdasarkan tanggal dan status
 * - Fungsi format tanggal
 * - Fungsi export ke CSV dan Excel
 * - Fungsi helper untuk empty rows dan filter info
 *
 * Requirement :
 * - Filter: 5 filter (Tanggal Awal Kuliah, Tanggal Akhir
 *   Kuliah, Tanggal Awal UTS, Tanggal Awal UAS, Status)
 * - Search: menerapkan filter yang dipilih pengguna
 * - Export CSV: mengunduh data dalam format CSV
 * - Export Excel: mengunduh data dalam format XLS
 * ==========================================================
 */

import type { AcademicPeriodProps } from 'src/_mock/academic-period-data';

// ----------------------------------------------------------------------

/**
 * Tipe data untuk nilai filter.
 * Menggunakan string | null untuk date (null = tidak ada filter).
 * Status: 'all' | 'active' | 'inactive'.
 */
export interface FilterValues {
  startDateFrom: string | null;   // Tanggal Awal Kuliah (dari)
  startDateTo: string | null;     // Tanggal Awal Kuliah (hingga)
  endDateFrom: string | null;     // Tanggal Akhir Kuliah (dari)
  endDateTo: string | null;       // Tanggal Akhir Kuliah (hingga)
  utsDateFrom: string | null;     // Tanggal Awal UTS (dari)
  utsDateTo: string | null;       // Tanggal Awal UTS (hingga)
  uasDateFrom: string | null;     // Tanggal Awal UAS (dari)
  uasDateTo: string | null;       // Tanggal Awal UAS (hingga)
  status: 'all' | 'active' | 'inactive';
}

/**
 * Tipe data untuk informasi filter yang aktif.
 * Digunakan untuk ditampilkan di Print Preview dan Export.
 */
export interface FilterInfo {
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  utsDateFrom?: string;
  utsDateTo?: string;
  uasDateFrom?: string;
  uasDateTo?: string;
  status?: string;
}

// ----------------------------------------------------------------------

/**
 * Default value untuk semua filter.
 * Digunakan saat reset filter dan inisialisasi state.
 */
export const defaultFilterValues: FilterValues = {
  startDateFrom: null,
  startDateTo: null,
  endDateFrom: null,
  endDateTo: null,
  utsDateFrom: null,
  utsDateTo: null,
  uasDateFrom: null,
  uasDateTo: null,
  status: 'all',
};

// -----------------------------------------------

/** CSS untuk element yang tersembunyi secara visual (accessibility). */
export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

/**
 * Menghitung jumlah baris kosong di halaman terakhir.
 * Digunakan oleh TableEmptyRows untuk menjaga tinggi tabel konsisten.
 */
export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

/**
 * Komparator untuk sorting descending.
 * Digunakan oleh getComparator untuk mengurutkan data tabel.
 */
function descendingComparator(a: any, b: any, orderBy: string) {
  const valA = a[orderBy];
  const valB = b[orderBy];
  if (valB < valA) return -1;
  if (valB > valA) return 1;
  return 0;
}

// ----------------------------------------------------------------------

/**
 * Membuat fungsi komparator berdasarkan direction (asc/desc).
 * Digunakan oleh applyFilter untuk sorting data sebelum filtering.
 */
export function getComparator(
  order: 'asc' | 'desc',
  orderBy: string
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

/**
 * Fungsi utama untuk memfilter dan mengurutkan data.
 * 
 * Proses:
 * 1. Sorting data berdasarkan comparator
 * 2. Filter berdasarkan 5 filter yang dipilih pengguna
 * 3. Mengembalikan data yang sudah difilter dan diurutkan
 *
 * Requirement:
 * - Filter Tanggal Awal Kuliah (date range)
 * - Filter Tanggal Akhir Kuliah (date range)
 * - Filter Tanggal Awal UTS (date range)
 * - Filter Tanggal Awal UAS (date range)
 * - Filter Status (all / active / inactive)
 */
export function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: AcademicPeriodProps[];
  comparator: (a: AcademicPeriodProps, b: AcademicPeriodProps) => number;
  filters: FilterValues;
}): AcademicPeriodProps[] {
  const { 
    startDateFrom, 
    startDateTo, 
    endDateFrom, 
    endDateTo,
    utsDateFrom,
    utsDateTo,
    uasDateFrom,
    uasDateTo,
    status 
  } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // ----------------------------------------------------------
  // Mini Test Requirement
  // Filter berdasarkan Tanggal Awal Kuliah (date range)
  // ----------------------------------------------------------
  if (startDateFrom || startDateTo) {
    inputData = inputData.filter((item) => {
      if (startDateFrom && item.startDate < startDateFrom) return false;
      if (startDateTo && item.startDate > startDateTo) return false;
      return true;
    });
  }

  // ----------------------------------------------------------
  // Mini Test Requirement
  // Filter berdasarkan Tanggal Akhir Kuliah (date range)
  // ----------------------------------------------------------
  if (endDateFrom || endDateTo) {
    inputData = inputData.filter((item) => {
      if (endDateFrom && item.endDate < endDateFrom) return false;
      if (endDateTo && item.endDate > endDateTo) return false;
      return true;
    });
  }

  // ----------------------------------------------------------
  // Mini Test Requirement
  // Filter berdasarkan Tanggal Awal UTS (date range)
  // ----------------------------------------------------------
  if (utsDateFrom || utsDateTo) {
    inputData = inputData.filter((item) => {
      if (utsDateFrom && item.startUts < utsDateFrom) return false;
      if (utsDateTo && item.startUts > utsDateTo) return false;
      return true;
    });
  }

  // ----------------------------------------------------------
  // Mini Test Requirement
  // Filter berdasarkan Tanggal Awal UAS (date range)
  // ----------------------------------------------------------
  if (uasDateFrom || uasDateTo) {
    inputData = inputData.filter((item) => {
      if (uasDateFrom && item.startUas < uasDateFrom) return false;
      if (uasDateTo && item.startUas > uasDateTo) return false;
      return true;
    });
  }

  // ----------------------------------------------------------
  // Mini Test Requirement
  // Filter berdasarkan Status (active / inactive)
  // ----------------------------------------------------------
  if (status !== 'all') {
    const isActive = status === 'active';
    inputData = inputData.filter((item) => item.isActive === isActive);
  }

  return inputData;
}

// ----------------------------------------------------------------------

/**
 * Mengambil informasi filter yang aktif (non-default).
 * Digunakan untuk ditampilkan di Print Preview dan header Export.
 */
export function getFilterInfo(filters: FilterValues): FilterInfo {
  const info: FilterInfo = {};

  if (filters.startDateFrom) info.startDateFrom = filters.startDateFrom;
  if (filters.startDateTo) info.startDateTo = filters.startDateTo;
  if (filters.endDateFrom) info.endDateFrom = filters.endDateFrom;
  if (filters.endDateTo) info.endDateTo = filters.endDateTo;
  if (filters.utsDateFrom) info.utsDateFrom = filters.utsDateFrom;
  if (filters.utsDateTo) info.utsDateTo = filters.utsDateTo;
  if (filters.uasDateFrom) info.uasDateFrom = filters.uasDateFrom;
  if (filters.uasDateTo) info.uasDateTo = filters.uasDateTo;
  if (filters.status !== 'all') info.status = filters.status;

  return info;
}

// ----------------------------------------------------------------------

/**
 * Format tanggal dari string ISO ke format Indonesia.
 * Contoh: "2024-01-15" -> "15 Januari 2024"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ----------------------------------------------------------------------

/**
 * Export data ke format CSV dan mengunduh file.
 * File CSV berisi:
 * - Header: judul report, tanggal cetak
 * - Info filter yang digunakan
 * - Data tabel
 *
 * Requirement:
 * - Export CSV
 */
export function exportToCSV(
  data: AcademicPeriodProps[],
  filterInfo: FilterInfo
): void {
  const headers = [
    'Kode',
    'Nama Periode',
    'Tanggal Awal Kuliah',
    'Tanggal Akhir Kuliah',
    'Tanggal Awal UTS',
    'Tanggal Awal UAS',
    'Total Prodi',
    'Aktif',
  ];

  const rows = data.map((item) => [
    item.code,
    item.name,
    formatDate(item.startDate),
    formatDate(item.endDate),
    formatDate(item.startUts),
    formatDate(item.startUas),
    String(item.totalStudyPrograms),
    item.isActive ? 'Aktif' : 'Tidak Aktif',
  ]);

  // Add header info
  let csvContent = 'Report Periode Akademik\n';
  csvContent += `Tanggal Cetak: ${formatDate(new Date().toISOString().split('T')[0])}\n\n`;

  if (Object.keys(filterInfo).length > 0) {
    csvContent += 'Filter yang Digunakan:\n';
    Object.entries(filterInfo).forEach(([key, value]) => {
      const keyLabel = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      csvContent += `${keyLabel}: ${value}\n`;
    });
    csvContent += '\n';
  }

  csvContent += headers.join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.map((cell) => `"${cell}"`).join(',') + '\n';
  });

  const element = document.createElement('a');
  element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
  element.setAttribute('download', `report-periode-akademik-${Date.now()}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// ----------------------------------------------------------------------

/**
 * Export data ke format Excel (.xls) dan mengunduh file.
 * Menggunakan pendekatan HTML table yang dibaca oleh Excel.
 * File Excel berisi:
 * - Header: judul report, tanggal cetak
 * - Info filter yang digunakan
 * - Data tabel
 *
 * Requirement:
 * - Export Excel
 */
export function exportToExcel(
  data: AcademicPeriodProps[],
  filterInfo: FilterInfo
): void {
  // Simple XLSX export using HTML table approach
  const headers = [
    'Kode',
    'Nama Periode',
    'Tanggal Awal Kuliah',
    'Tanggal Akhir Kuliah',
    'Tanggal Awal UTS',
    'Tanggal Awal UAS',
    'Total Prodi',
    'Aktif',
  ];

  let html = '<table border="1">';

  // Title
  html += '<tr><td colspan="' + headers.length + '"><b>Report Periode Akademik</b></td></tr>';

  // Print date
  html += '<tr><td colspan="' + headers.length + '">Tanggal Cetak: ' + formatDate(new Date().toISOString().split('T')[0]) + '</td></tr>';

  // Filter info
  if (Object.keys(filterInfo).length > 0) {
    html += '<tr><td colspan="' + headers.length + '"><b>Filter yang Digunakan:</b></td></tr>';
    Object.entries(filterInfo).forEach(([key, value]) => {
      const keyLabel = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      html += '<tr><td colspan="' + headers.length + '">' + keyLabel + ': ' + value + '</td></tr>';
    });
  }

  // Empty row
  html += '<tr><td colspan="' + headers.length + '"></td></tr>';

  // Headers
  html += '<tr>';
  headers.forEach((header) => {
    html += '<th>' + header + '</th>';
  });
  html += '</tr>';

  // Data rows
  data.forEach((item) => {
    html += '<tr>';
    html += '<td>' + item.code + '</td>';
    html += '<td>' + item.name + '</td>';
    html += '<td>' + formatDate(item.startDate) + '</td>';
    html += '<td>' + formatDate(item.endDate) + '</td>';
    html += '<td>' + formatDate(item.startUts) + '</td>';
    html += '<td>' + formatDate(item.startUas) + '</td>';
    html += '<td>' + item.totalStudyPrograms + '</td>';
    html += '<td>' + (item.isActive ? 'Aktif' : 'Tidak Aktif') + '</td>';
    html += '</tr>';
  });

  html += '</table>';

  const element = document.createElement('a');
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  element.setAttribute('href', URL.createObjectURL(blob));
  element.setAttribute('download', `report-periode-akademik-${Date.now()}.xls`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
