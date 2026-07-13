import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const AcademicPeriodListPage = lazy(() => import('src/pages/academic-period'));
const AcademicPeriodAddPage = lazy(() => import('src/pages/academic-period-add'));
const AcademicPeriodEditPage = lazy(() => import('src/pages/academic-period-edit'));
const AcademicPeriodDetailPage = lazy(() => import('src/pages/academic-period-detail'));
const AcademicPeriodReportPage = lazy(() => import('src/pages/academic-period-report'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/academic-period" replace /> },
      { path: 'academic-period', element: <AcademicPeriodListPage /> },
      { path: 'academic-period/add', element: <AcademicPeriodAddPage /> },
      { path: 'academic-period/:id', element: <AcademicPeriodDetailPage /> },
      { path: 'academic-period/:id/edit', element: <AcademicPeriodEditPage /> },
      { path: 'academic-period-report', element: <AcademicPeriodReportPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/academic-period" replace /> },
];
