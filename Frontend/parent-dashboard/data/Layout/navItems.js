import {
    LayoutDashboard, Activity, Clock, ShieldCheck, Bell, Settings,
    User, FileText
} from 'lucide-react';


export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Child Profile', path: '/child-profile/1', icon: User },
    { name: 'Child Activity', path: '/child-activity/1', icon: Activity },
    { name: 'Screen Time', path: '/screen-time/1', icon: Clock },
    { name: 'App Controls', path: '/controls/1', icon: ShieldCheck },
    { name: 'Alerts', path: '/alerts/1', icon: Bell },
    { name: 'Content Reports', path: '/content-reports/1', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
];
