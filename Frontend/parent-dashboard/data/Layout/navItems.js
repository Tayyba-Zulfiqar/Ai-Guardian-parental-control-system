import {
    LayoutDashboard, Activity, Clock, ShieldCheck, Bell,
    User, FileText
} from 'lucide-react';


export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Family Profiles', path: '/family-profiles/1', icon: User },
    { name: 'Child Activity', path: '/child-activity/1', icon: Activity },
    { name: 'Screen Time', path: '/screen-time/1', icon: Clock },
    { name: 'Alerts', path: '/alerts/1', icon: Bell },
    { name: 'Content Reports', path: '/content-reports/1', icon: FileText },
    { name: 'App Controls', path: '/app-controls/1', icon: ShieldCheck },
    { name: 'Parent Account', path: '/parent-account', icon: User },
];
