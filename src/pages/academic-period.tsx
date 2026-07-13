/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Page
 * List Periode Akademik
 *
 * Tujuan :
 * Page wrapper untuk halaman List Periode Akademik.
 * Route : /academic-period
 * ==========================================================
 */

import { CONFIG } from 'src/config-global';

import { PeriodListView } from 'src/sections/academic-period/view';

export default function AcademicPeriodListPage() {
  return (
    <>
      <title>{`Periode Akademik - ${CONFIG.appName}`}</title>
      <PeriodListView />
    </>
  );
}
