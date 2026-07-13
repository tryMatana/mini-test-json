/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Page
 * Report Periode Akademik
 *
 * Tujuan :
 * Page wrapper untuk halaman Report Periode Akademik.
 * Hanya menampilkan title dan merender View component.
 *
 * Route : /academic-period-report
 * ==========================================================
 */

import { CONFIG } from 'src/config-global';

import { AcademicPeriodReportView } from 'src/sections/academic-period-report/view';

// ----------------------------------------------------------------------

export default function AcademicPeriodReportPage() {
  return (
    <>
      <title>{`Report Periode Akademik - ${CONFIG.appName}`}</title>

      <AcademicPeriodReportView />
    </>
  );
}
