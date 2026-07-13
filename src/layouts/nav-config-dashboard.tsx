import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

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
