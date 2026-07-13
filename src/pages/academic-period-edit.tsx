/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Page
 * Edit Periode Akademik
 *
 * Tujuan :
 * Page wrapper untuk halaman Edit Periode Akademik.
 * Route : /academic-period/:id/edit
 * ==========================================================
 */

import { CONFIG } from 'src/config-global';

import { PeriodFormView } from 'src/sections/academic-period-form/view';

export default function AcademicPeriodEditPage() {
  return (
    <>
      <title>{`Edit Periode Akademik - ${CONFIG.appName}`}</title>
      <PeriodFormView />
    </>
  );
}
