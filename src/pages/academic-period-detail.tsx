/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Page
 * Detail Periode Akademik
 *
 * Tujuan :
 * Page wrapper untuk halaman Detail Periode Akademik.
 * Route : /academic-period/:id
 * ==========================================================
 */

import { CONFIG } from 'src/config-global';

import { PeriodDetailView } from 'src/sections/academic-period-detail/view';

export default function AcademicPeriodDetailPage() {
  return (
    <>
      <title>{`Detail Periode Akademik - ${CONFIG.appName}`}</title>
      <PeriodDetailView />
    </>
  );
}
