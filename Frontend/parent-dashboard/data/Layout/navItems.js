import {
    LayoutDashboard, Activity, Clock, ShieldCheck, Bell,
    User, FileText
} from 'lucide-react';


export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },

    { name: 'Family Profiles', path: '/family-profiles', icon: User },

    { name: 'Child Activity', path: '/child-activity', icon: Activity },

    { name: 'Screen Time', path: '/screen-time', icon: Clock },

    { name: 'Alerts', path: '/alerts', icon: Bell },

    { name: 'Content Reports', path: '/content-reports', icon: FileText },

    { name: 'App Controls', path: '/app-controls', icon: ShieldCheck },

    { name: 'Parent Account', path: '/parent-account', icon: User },
];