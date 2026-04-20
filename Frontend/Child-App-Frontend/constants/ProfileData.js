import {
    User,
    Smartphone,
    Bell,
    Fingerprint,
    ShieldCheck,
    HelpCircle,
} from "lucide-react-native";

import { Colors } from "./Colors";

export const profileSections = [
    {
        title: "Profile",
        data: [
            {
                id: "profile-user",
                icon: User,
                title: "Alex Johnson",
                description: "Age: 10 • Parent: Sarah J.",
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
            },
        ],
    },
    {
        title: "Device Information",
        data: [
            {
                id: "device-info",
                icon: Smartphone,
                title: "Alex's Phone",
                description: "Protection active",
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
                badge: "Active",
            },
        ],
    },
    {
        title: "SETTINGS",
        data: [
            {
                id: "notifications",
                icon: Bell,
                title: "Notifications",
                description: "Alerts & weekly recaps",
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
                type: "switch",
            },
            {
                id: "permissions",
                icon: Fingerprint,
                title: "Permissions",
                description: "System access levels",
                iconBgColor: Colors.pinkIconBg,
                iconColor: Colors.pinkIcon,
                type: "link",
            },
            {
                id: "privacy",
                icon: ShieldCheck,
                title: "Privacy",
                description: "Data & encryption",
                iconBgColor: Colors.greenIconBg,
                iconColor: Colors.greenIcon,
                type: "link",
            },
        ],
    },
    {
        title: "SUPPORT",
        data: [
            {
                id: "help",
                icon: HelpCircle,
                title: "Help Center",
                description: "FAQ & Contact support",
                iconBgColor: Colors.cardBluePastel,
                iconColor: Colors.cardBlueIcon,
                type: "link",
            },
        ],
    },
];