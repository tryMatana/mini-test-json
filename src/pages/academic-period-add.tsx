/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Page
 * Tambah Periode Akademik
 *
 * Tujuan :
 * Page wrapper untuk halaman Tambah Periode Akademik.
 * Route : /academic-period/add
 * ==========================================================
 */

import { CONFIG } from 'src/config-global';

import { PeriodFormView } from 'src/sections/academic-period-form/view';

export default function AcademicPeriodAddPage() {
  return (
    <>
      <title>{`Tambah Periode Akademik - ${CONFIG.appName}`}</title>
      <PeriodFormView />
    </>
  );
}
