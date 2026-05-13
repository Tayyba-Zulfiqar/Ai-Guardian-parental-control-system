import {
    User,
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
                description: "Age: 10 • Gender: Female",
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
            },
        ],
    },
    {
        title: "Parent Information",
        data: [
            {
                id: "parent-info",
                icon: User,
                title: "Sarah Johnson",
                description: "Parent Account",
                iconBgColor: Colors.purpleIconBg,
                iconColor: Colors.purpleIcon,
                badge: "Connected",
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