import { AlertTriangle, ShieldAlert, Ban, Activity } from 'lucide-react';

export const alertsStatsData = [
  {
    id: 'stat-1',
    title: 'Total Alerts',
    value: '24',
    trend: { type: 'success', value: '12%', text: 'vs yesterday', direction: 'down' },
    Icon: AlertTriangle
  },
  {
    id: 'stat-2',
    title: 'Critical Alerts',
    value: '3',
    trend: { type: 'danger', value: '1', text: 'vs yesterday', direction: 'up' },
    Icon: ShieldAlert
  },
  {
    id: 'stat-3',
    title: 'Blocked Actions',
    value: '18',
    trend: { type: 'success', value: '5%', text: 'vs yesterday', direction: 'up' },
    Icon: Ban
  }
];
