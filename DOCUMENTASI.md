# Dokumentasi Lengkap Program Mini Test

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Technologi yang Digunakan](#2-technologi-yang-digunakan)
3. [Cara Menjalankan Program](#3-cara-menjalankan-program)
4. [Struktur Folder](#4-struktur-folder)
5. [Sistem Routing](#5-sistem-routing)
6. [Sistem Layout](#6-sistem-layout)
7. [Sistem Tema (Theme)](#7-sistem-tema-theme)
8. [Modul Periode Akademik](#8-modul-periode-akademik)
9. [Modul Report Periode Akademik](#9-modul-report-periode-akademik)
10. [Komponen-Komponen Umum](#10-komponen-komponen-umum)
11. [Sistem Navigasi Sidebar](#11-sistem-navigasi-sidebar)
12. [Data Mock](#12-data-mock)
13. [Arsitektur Data Flow](#13-arsitektur-data-flow)
14. [Panduan Development](#14-panduan-development)

---

## 1. Ringkasan Proyek

Program ini adalah **Sistem Manajemen Periode Akademik** yang dibangun dengan React + TypeScript + Material UI. Aplikasi ini berupa dashboard admin dengan fitur:

- **CRUD Periode Akademik**: Tambah, Lihat, Edit, Hapus data periode akademik
- **Report Periode Akademik**: Laporan dengan filter, sorting, pagination, print preview, export CSV/Excel
- **Layout Dashboard**: Sidebar navigasi, header dengan search & notifikasi, content area

---

## 2. Technologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| React | 19.1 | UI framework utama |
| TypeScript | 5.8 | Type safety |
| Vite | 6.2 | Build tool & dev server |
| MUI (Material UI) | v7 | Component library |
| React Router | v7.4 | Client-side routing |
| Emotion | - | CSS-in-JS styling |
| ApexCharts | - | Chart/grafik (tersedia tapi belum digunakan aktif) |
| Iconify | - | Icon library |
| Day.js | - | Date formatting |
| simplebar-react | - | Custom scrollbar |
| ESLint | 9 | Linting |
| Prettier | 3.5 | Code formatting |

---

## 3. Cara Menjalankan Program

### Prasyarat
- Node.js >= 20
- npm atau yarn

### Perintah

```bash
# Install dependencies
npm install

# Jalankan development server (port 3039)
npm run dev

# Build untuk produksi
npm run build

# Linting
npm run lint

# Auto-fix linting
npm run lint:fix

# Format code
npm run fm:fix

# Fix semua (lint + format)
npm run fix:all
```

### Akses Aplikasi
Buka browser: **http://localhost:3039/**

---

## 4. Struktur Folder

```
src/
├── main.tsx                  # Entry point - membuat BrowserRouter
├── app.tsx                   # Root component - ThemeProvider + scroll-to-top
├── config-global.ts          # Konfigurasi global (nama app, versi)
├── global.css                # CSS global (font, scrollbar, baseline)
│
├── _mock/                    # LAYER: Data Mock
│   ├── _mock.ts              #   Helper generator (id, nama, harga, dll)
│   ├── _data.ts              #   Dataset mock (users, posts, products)
│   ├── academic-period-data.ts # Tipe data + mock Periode Akademik
│   └── index.ts              #   Barrel export
│
├── pages/                    # LAYER: Page Wrapper
│   ├── academic-period.tsx        # Page List Periode Akademik
│   ├── academic-period-add.tsx    # Page Tambah Data
│   ├── academic-period-edit.tsx   # Page Edit Data
│   ├── academic-period-detail.tsx # Page Detail Data
│   └── academic-period-report.tsx # Page Report
│
├── sections/                 # LAYER: View & Components (UI)
│   ├── academic-period/           # Modul List Periode Akademik
│   │   ├── view/                  #   View utama (state + komposisi)
│   │   │   ├── period-list-view.tsx
│   │   │   └── index.ts
│   │   └── components/            #   Sub-komponen
│   │       ├── period-list-table-head.tsx   # Header tabel
│   │       ├── period-list-table-row.tsx    # Baris tabel
│   │       ├── period-list-toolbar.tsx      # Toolbar (filter, search, tombol)
│   │       ├── period-list-delete-dialog.tsx # Dialog hapus
│   │       └── index.ts
│   │
│   ├── academic-period-form/      # Modul Form (Tambah/Edit)
│   │   └── view/
│   │       ├── period-form-view.tsx  # Form 2 kolom
│   │       └── index.ts
│   │
│   ├── academic-period-detail/    # Modul Detail (Read-only)
│   │   └── view/
│   │       ├── period-detail-view.tsx # Tampilan detail
│   │       └── index.ts
│   │
│   ├── academic-period-report/    # Modul Report
│   │   ├── view/
│   │   │   ├── academic-period-report-view.tsx
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── period-filters.tsx        # Filter tanggal & status
│   │   │   ├── period-toolbar.tsx        # Print, CSV, Excel
│   │   │   ├── period-table-head.tsx     # Header tabel report
│   │   │   ├── period-table-row.tsx      # Baris tabel report
│   │   │   ├── table-no-data.tsx         # State kosong
│   │   │   ├── table-empty-rows.tsx      # Placeholder baris kosong
│   │   │   └── index.ts
│   │   └── utils.ts                     # Fungsi utilitas (filter, export, format)
│   │
│   └── (overview/, auth/, blog/, product/, user/ - template, belum aktif)
│
├── routes/                   # LAYER: Routing
│   ├── sections.tsx          # Definisi route tree
│   ├── hooks/                #   use-router.ts, use-pathname.ts
│   └── components/           #   router-link.tsx, error-boundary.tsx
│
├── layouts/                  # LAYER: Layout System
│   ├── dashboard/            #   Dashboard layout
│   │   ├── layout.tsx        #     Komposisi: header + sidebar + content
│   │   ├── nav.tsx           #     Sidebar (desktop & mobile)
│   │   ├── content.tsx       #     Content container
│   │   └── css-vars.ts       #     CSS variables dashboard
│   ├── core/                 #   Layout primitives
│   │   ├── layout-section.tsx  # Root layout wrapper
│   │   ├── header-section.tsx  # Sticky header dengan blur
│   │   └── main-section.tsx    # Main content area
│   ├── auth/                 #   Auth layout (belum aktif)
│   ├── components/           #   Shared layout components
│   │   ├── account-popover.tsx    # Dropdown user
│   │   ├── notifications-popover.tsx # Notifikasi
│   │   ├── searchbar.tsx          # Search overlay
│   │   ├── workspaces-popover.tsx # Switcher workspace
│   │   ├── language-popover.tsx   # Switcher bahasa
│   │   ├── menu-button.tsx        # Hamburger menu
│   │   └── nav-upgrade.tsx        # Promo upgrade
│   ├── nav-config-dashboard.tsx   # Item sidebar
│   ├── nav-config-account.tsx     # Menu akun
│   └── nav-config-workspace.tsx   # Data workspace
│
├── components/               # LAYER: Reusable Components
│   ├── iconify/              #   Icon component (offline SVG)
│   ├── label/                #   Badge/label (status, variant)
│   ├── scrollbar/            #   Custom scrollbar
│   ├── svg-color/            #   SVG icon via CSS mask
│   ├── logo/                 #   Logo SVG
│   ├── chart/                #   ApexCharts wrapper
│   └── color-utils/          #   Color picker/preview
│
├── theme/                    # LAYER: Theme System
│   ├── create-theme.ts       #   Theme factory
│   ├── theme-provider.tsx     #   Theme provider React
│   ├── theme-config.ts       #   Warna, font, CSS vars
│   ├── types.ts              #   Type definitions
│   ├── create-classes.ts     #   CSS class generator
│   ├── extend-theme-types.d.ts # Type augmentation
│   └── core/                 #   Core theme pieces
│       ├── palette.ts        #     Warna palette
│       ├── typography.ts     #     Font & text styles
│       ├── shadows.ts        #     Box shadows (25 level)
│       ├── custom-shadows.ts #     Semantic shadows
│       └── components.tsx    #     MUI component overrides
│
└── utils/                    # LAYER: Utilities
    ├── format-time.ts        #   Format tanggal/waktu (dayjs)
    └── format-number.ts      #   Format angka/mata uang
```

---

## 5. Sistem Routing

### Definisi Route

Semua route didefinisikan di `src/routes/sections.tsx`.

| Route | Komponen | Keterangan |
|-------|----------|------------|
| `/` | Redirect ke `/academic-period` | Default redirect |
| `/academic-period` | `PeriodListView` | Halaman daftar/data |
| `/academic-period/add` | `PeriodFormView` | Form tambah data |
| `/academic-period/:id` | `PeriodDetailView` | Halaman detail |
| `/academic-period/:id/edit` | `PeriodFormView` | Form edit data |
| `/academic-period-report` | `AcademicPeriodReportView` | Halaman report |
| `*` | Redirect ke `/academic-period` | Catch-all 404 |

### Cara Kerja Routing

1. `main.tsx` membuat `BrowserRouter` dengan route tree
2. `App` (di `app.tsx`) membungkus semua dengan `ThemeProvider`
3. Semua page di-**lazy load** via `React.lazy()` (hemat loading time)
4. `LinearProgress` sebagai fallback saat loading
5. `RouterLink` mengadaptasi React Router `<Link>` agar compatible dengan MUI

### File Routing
```
src/routes/
├── sections.tsx          # Definisi route (edit di sini jika tambah route)
├── hooks/
│   ├── use-router.ts     # Hook: useRouter() → push, replace, back
│   └── use-pathname.ts   # Hook: usePathname() → pathname saat ini
└── components/
    ├── router-link.tsx   # Link adapter (href → to)
    └── error-boundary.tsx # Error page untuk route error
```

---

## 6. Sistem Layout

### Arsitektur Layout

```
DashboardLayout
├── HeaderSection (sticky AppBar)
│   ├── Left: MenuButton (mobile) + Logo
│   ├── Center: (kosong)
│   └── Right: SearchBar + Language + Notifications + Account
├── Sidebar (NavDesktop / NavMobile)
│   ├── Logo
│   ├── WorkspacesPopover
│   ├── Navigation Links (dari nav-config-dashboard.tsx)
│   └── NavUpgrade (promo card)
└── MainSection
    └── DashboardContent (Container dengan padding)
        └── {children} ← halaman aktif
```

### Cara Kerja Layout

1. **Desktop**: Sidebar tetap (fixed) di kiri dengan lebar 300px, content di kanan
2. **Mobile**: Sidebar berupa drawer (slide-in dari kiri), diakses via hamburger menu
3. **Header**: Sticky di atas dengan efek blur saat scroll
4. **Active Nav**: Item sidebar yang aktif (sesuai pathname) mendapat highlight warna primary

### DashboardContent
Komponen wrapper yang memberikan padding dan max-width untuk konten halaman:
```tsx
<DashboardContent>
  {/* Konten halaman Anda di sini */}
</DashboardContent>
```

---

## 7. Sistem Tema (Theme)

### Konfigurasi Warna

| Variabel | Warna | Kode |
|----------|-------|------|
| Primary | Biru | `#1877F2` |
| Secondary | Ungu | `#8E33FF` |
| Success | Hijau | `#10B981` |
| Warning | Kuning | `#F59E0B` |
| Error | Merah | `#EF4444` |
| Info | Biru Muda | `#3B82F6` |

### Typography
- **Font Utama**: DM Sans Variable
- **Font Sekunder**: Barlow (untuk heading h1-h3)
- **Font Size**: Responsive (berubah di breakpoint berbeda)

### Cara Mengubah Tema
Edit `src/theme/theme-config.ts` untuk mengubah warna, font, atau CSS variables.

### CSS Class Naming
Semua komponen menggunakan prefix `minimal__`:
```
minimal__label__root
minimal__iconify__root
minimal__scrollbar__root
minimal__layout__header
```

---

## 8. Modul Periode Akademik

### Tipe Data

```typescript
type AcademicPeriodProps = {
  id: string;
  code: string;              // e.g., "20261"
  name: string;              // e.g., "Periode 2026/2027 Ganjil"
  shortName: string;         // e.g., "2026/2027-G"
  year: number;              // e.g., 2026
  semester: number;          // 1=Ganjil, 2=Genap, 3=Pendek
  isActive: boolean;         // Status aktif/tidak
  startDate: string;         // Tanggal awal kuliah
  endDate: string;           // Tanggal akhir kuliah
  startUts: string;          // Tanggal awal UTS
  endUts: string;            // Tanggal akhir UTS
  startUas: string;          // Tanggal awal UAS
  endUas: string;            // Tanggal akhir UAS
  examChairman: string;      // Ketua Ujian
  totalMeetings: number;     // Jumlah pertemuan
  minAttendance: number;     // Minimal presensi (%)
  serviceQuestionnaire: string; // Kuesioner layanan
  totalStudyPrograms: number;   // Total prodi
  createdAt: string;         // Waktu pembuatan
};
```

### 8.1 Halaman List (`/academic-period`)

**File**: `src/sections/academic-period/view/period-list-view.tsx`

**Fitur**:
- **Checkbox**: Pilih satu atau banyak data sekaligus
- **Filter Status**: Dropdown (Semua / Aktif / Tidak Aktif)
- **Search**: Cari berdasarkan kode atau nama
- **Sorting**: Klik header kolom untuk urutkan
- **Pagination**: 5 / 10 / 25 baris per halaman
- **Aksi per baris**:
  - View (ikon mata) → navigasi ke halaman detail
  - Edit (ikon pensil) → navigasi ke halaman edit
  - Delete (ikon tempat sampah) → muncul dialog konfirmasi
- **Bulk Delete**: Pilih beberapa data, klik "Hapus (N)"

**Komponen**:
| File | Fungsi |
|------|--------|
| `period-list-view.tsx` | View utama, mengelola semua state |
| `period-list-toolbar.tsx` | Toolbar: filter, search, tombol tambah/hapus |
| `period-list-table-head.tsx` | Header tabel dengan sorting |
| `period-list-table-row.tsx` | Baris tabel dengan checkbox & aksi |
| `period-list-delete-dialog.tsx` | Dialog konfirmasi hapus |

### 8.2 Halaman Tambah (`/academic-period/add`)

**File**: `src/sections/academic-period-form/view/period-form-view.tsx`

**Layout**: Dua kolom (Grid)

| Kolom Kiri | Kolom Kanan |
|------------|-------------|
| Kode Periode | Tanggal Akhir UTS |
| Tahun Ajaran | Tanggal Awal UAS |
| Semester | Tanggal Akhir UAS |
| Nama Periode | Ketua Ujian |
| Nama Singkat | Jumlah Pertemuan Kuliah |
| Tanggal Awal Kuliah | Minimal Presensi (%) |
| Tanggal Akhir Kuliah | Kuesioner Layanan |
| Tanggal Awal UTS | Aktif (Switch) |

**Tombol**: Kembali ke Daftar | Simpan

### 8.3 Halaman Detail (`/academic-period/:id`)

**File**: `src/sections/academic-period-detail/view/period-detail-view.tsx`

- Tampilan **read-only** semua field
- Layout dua kolom seperti form
- Badge status aktif/tidak aktif
- Tombol: Kembali | Tambah Baru | Edit

### 8.4 Halaman Edit (`/academic-period/:id/edit`)

**File**: `src/sections/academic-period-form/view/period-form-view.tsx`

- Menggunakan **komponen yang sama** dengan halaman Tambah
- Mode edit: form otomatis terisi dengan data yang dipilih
- Tombol: Kembali ke Daftar | Simpan

---

## 9. Modul Report Periode Akademik

### Fitur

**File**: `src/sections/academic-period-report/`

| Fitur | Keterangan |
|-------|------------|
| **5 Filter** | Tanggal Awal Kuliah, Akhir Kuliah, Awal UTS, Awal UAS (date range), Status |
| **Search & Reset** | Tombol untuk menerapkan/reset filter |
| **Sorting** | Klik header kolom untuk ascending/descing |
| **Pagination** | 5 / 10 / 25 baris per halaman |
| **Print Preview** | Modal dialog menampilkan preview sebelum cetak |
| **Export CSV** | Mengunduh data dalam format CSV |
| **Export Excel** | Mengunduh data dalam format XLS |
| **Read-only** | Tidak ada kolom aksi (sesuai requirement) |

### Kolom Tabel Report

| # | Kolom | Sorting |
|---|-------|---------|
| 1 | Kode | Ya |
| 2 | Nama Periode | Ya |
| 3 | Tanggal Awal Kuliah | Ya |
| 4 | Tanggal Akhir Kuliah | Ya |
| 5 | Tanggal Awal UTS | Ya |
| 6 | Tanggal Awal UAS | Ya |
| 7 | Total Prodi | Ya |
| 8 | Aktif | Ya |

### Alur Export

1. Filter data → 2. Export mengikuti hasil filter → 3. File diunduh

### File Utils

`src/sections/academic-period-report/utils.ts` berisi:

| Fungsi | Kegunaan |
|--------|----------|
| `applyFilter()` | Filter + sort data |
| `getComparator()` | Komparator untuk sorting |
| `getFilterInfo()` | Info filter aktif (untuk print/export) |
| `formatDate()` | Format tanggal ke bahasa Indonesia |
| `exportToCSV()` | Generate & download file CSV |
| `exportToExcel()` | Generate & download file XLS |
| `emptyRows()` | Hitung baris kosong (pagination) |
| `visuallyHidden` | CSS untuk element tersembunyi |

---

## 10. Komponen-Komponen Umum

### Iconify (`src/components/iconify/`)

Komponen icon offline-first. Icon didaftarkan di `icon-sets.ts` sebagai inline SVG.

**Cara pakai**:
```tsx
import { Iconify } from 'src/components/iconify';

<Iconify icon="solar:pen-bold" width={20} />
```

**Icon yang tersedia** (offline):
| Icon | Nama |
|------|------|
| Pensil | `solar:pen-bold` |
| Mata | `solar:eye-bold` |
| Share | `solar:share-bold` |
| Cart | `solar:cart-3-bold` |
| Refresh | `solar:restart-bold` |
| Check Circle | `solar:check-circle-bold` |
| Trash | `solar:trash-bin-trash-bold` |
| Search | `eva:search-fill` |
| Tambah | `mingcute:add-line` |
| Close | `mingcute:close-line` |
| Arrow Forward | `eva:arrow-ios-forward-fill` |

> **Catatan**: Hanya icon di atas yang valid untuk TypeScript. Menggunakan icon lain akan error.

### Label (`src/components/label/`)

Badge/label untuk status.

```tsx
import { Label } from 'src/components/label';

<Label color="success">Aktif</Label>
<Label color="error">Tidak Aktif</Label>
```

**Warna**: default, primary, secondary, info, success, warning, error
**Variant**: filled (default), outlined, soft, inverted

### Scrollbar (`src/components/scrollbar/`)

Custom scrollbar menggunakan simplebar-react.

```tsx
import { Scrollbar } from 'src/components/scrollbar';

<Scrollbar sx={{ height: 400 }}>
  {/* konten yang bisa di-scroll */}
</Scrollbar>
```

### SvgColor (`src/components/svg-color/`)

SVG icon yang bisa diwarnai via CSS `color`.

```tsx
import { SvgColor } from 'src/components/svg-color';

<SvgColor src="/assets/icons/navbar/ic-analytics.svg" />
```

---

## 11. Sistem Navigasi Sidebar

### Konfigurasi

File: `src/layouts/nav-config-dashboard.tsx`

```typescript
export const navData = [
  {
    title: 'Periode Akademik',
    path: '/academic-period',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Report Periode Akademik',
    path: '/academic-period-report',
    icon: icon('ic-analytics'),
  },
];
```

### Cara Menambah Item Sidebar

1. Buka `src/layouts/nav-config-dashboard.tsx`
2. Tambah objek baru ke array `navData`:
```typescript
{
  title: 'Judul Menu',
  path: '/route-anda',
  icon: icon('nama-icon'), // harus ada di /public/assets/icons/navbar/
},
```
3. Tambah route di `src/routes/sections.tsx`
4. Buat page wrapper di `src/pages/`
5. Buat view di `src/sections/`

---

## 12. Data Mock

### Sistem Data

Semua data bersifat **mock** (data contoh di memory). Tidak ada backend/database.

- **Penyimpanan**: `useState` di komponen view
- **Inisialisasi**: Dari array `_academicPeriods` di `src/_mock/academic-period-data.ts`
- **Reset**: Data akan kembali ke awal saat halaman di-refresh

### Data yang Tersedia

| Dataset | Lokasi | Jumlah Record |
|---------|--------|---------------|
| Periode Akademik | `academic-period-data.ts` | 10 record |
| Users | `_data.ts` | 24 record |
| Posts | `_data.ts` | 23 record |
| Products | `_data.ts` | 24 record |
| Notifications | `_data.ts` | 5 record |

### Contoh Data Periode Akademik

| Kode | Nama Periode | Status |
|------|-------------|--------|
| 20261 | Periode 2026/2027 Ganjil | Aktif |
| 20252 | Periode 2025/2026 Genap | Aktif |
| 20251 | Periode 2025/2026 Ganjil | Tidak Aktif |
| 20242 | Periode 2024/2025 Genap | Tidak Aktif |
| 20241 | Periode 2024/2025 Ganjil | Tidak Aktif |

---

## 13. Arsitektur Data Flow

### Alur Data CRUD

```
_academicPeriods (mock data)
        ↓
PeriodListView (useState init)
        ↓
┌───────────────┬──────────────┬───────────────┐
│ Filter/Sort   │ Select       │ CRUD Handler  │
│ (appliedFilters)│ (selected[]) │ (setData)    │
└───────┬───────┴──────┬───────┴───────┬───────┘
        ↓              ↓               ↓
   PeriodListToolbar  Table Rows    Dialogs
   (filter UI)       (aksi buttons) (delete confirm)
```

### State Management

```
// Di PeriodListView
const [data, setData] = useState(_academicPeriods);  // Data utama
const [selected, setSelected] = useState<string[]>([]); // Checkbox selection
const [filterStatus, setFilterStatus] = useState('all'); // Filter
const [searchText, setSearchText] = useState('');       // Search
const [orderBy, setOrderBy] = useState('code');         // Sorting
const [order, setOrder] = useState<'asc'|'desc'>('asc');
const [page, setPage] = useState(0);                    // Pagination
const [rowsPerPage, setRowsPerPage] = useState(10);
```

### Alur CRUD

**Tambah**:
1. Klik "Tambah" → navigate ke `/academic-period/add`
2. Isi form → klik "Simpan"
3. Navigate kembali ke `/academic-period`

**Edit**:
1. Klik ikon pensil → navigate ke `/academic-period/:id/edit`
2. Form terisi otomatis → ubah data → klik "Simpan"
3. Navigate kembali ke `/academic-period`

**Hapus**:
1. Klik ikon tempat sampah → muncul dialog konfirmasi
2. Klik "Hapus" → data dihapus dari state
3. Tabel update otomatis

**View/Detail**:
1. Klik ikon mata → navigate ke `/academic-period/:id`
2. Tampilan read-only semua field
3. Tombol "Edit" untuk langsung edit

---

## 14. Panduan Development

### Menambah Halaman Baru

1. **Buat page wrapper** di `src/pages/`:
```tsx
import { CONFIG } from 'src/config-global';
import { MyNewView } from 'src/sections/my-module/view';

export default function MyNewPage() {
  return (
    <>
      <title>{`Judul - ${CONFIG.appName}`}</title>
      <MyNewView />
    </>
  );
}
```

2. **Buat section** di `src/sections/my-module/`:
```
my-module/
├── view/
│   ├── my-new-view.tsx
│   └── index.ts
└── components/
    ├── my-component.tsx
    └── index.ts
```

3. **Tambah route** di `src/routes/sections.tsx`:
```tsx
const MyNewPage = lazy(() => import('src/pages/my-new'));

// Di children array:
{ path: 'my-new', element: <MyNewPage /> },
```

4. **Tambah sidebar** (opsional) di `src/layouts/nav-config-dashboard.tsx`

### Menambah Field ke Periode Akademik

1. Tambah field di `AcademicPeriodProps` (`src/_mock/academic-period-data.ts`)
2. Update data mock di `_academicPeriods`
3. Update form di `period-form-view.tsx`
4. Update detail di `period-detail-view.tsx`
5. Update tabel di `period-list-table-row.tsx` dan `period-list-table-head.tsx`
6. Update report di `period-table-row.tsx` dan `academic-period-report-view.tsx`

### Style Convention

- Gunakan MUI `sx` prop untuk styling inline
- Gunakan `styled()` dari `@mui/material/styles` untuk komponen complex
- Ikuti BEM-like naming: `minimal__module__element`
- Warna theme: `theme.palette.primary.main`, `theme.palette.text.secondary`
- Spacing: gunakan `theme.spacing(n)` atau shorthand `sx={{ p: 2, m: 1 }}`

### Naming Convention

| Item | Convention | Contoh |
|------|-----------|--------|
| Component file | kebab-case | `period-list-view.tsx` |
| Component name | PascalCase | `PeriodListView` |
| Type/Interface | PascalCase + Props suffix | `AcademicPeriodProps` |
| Handler function | handle + EventName | `handleClick`, `handleSubmit` |
| Hook | use + Feature | `useRouter`, `usePathname` |
| CSS class | minimal__module__element | `minimal__label__root` |
| Mock data | underscore prefix | `_academicPeriods` |

---

## Appendix: Peta File Penting

| Kebutuhan | Edit File |
|-----------|-----------|
| Tambah/hapus route | `src/routes/sections.tsx` |
| Tambah item sidebar | `src/layouts/nav-config-dashboard.tsx` |
| Ubah warna tema | `src/theme/theme-config.ts` |
| Ubah warna palette | `src/theme/core/palette.ts` |
| Tambah icon | `src/components/iconify/icon-sets.ts` + `register-icons.ts` |
| Ubah data mock | `src/_mock/academic-period-data.ts` |
| Ubah form fields | `src/sections/academic-period-form/view/period-form-view.tsx` |
| Ubah tabel list | `src/sections/academic-period/components/period-list-table-row.tsx` |
| Ubah kolom report | `src/sections/academic-period-report/view/academic-period-report-view.tsx` |
| Ubah filter report | `src/sections/academic-period-report/components/period-filters.tsx` |
| Ubah export | `src/sections/academic-period-report/utils.ts` |
