import { Eye, Smartphone, MonitorSmartphone, Bell } from "lucide-react-native";

export const permissions = [
    {
        icon: Eye,
        title: "Accessibility Monitoring",
        description: "Detect harmful or unsafe content.",
    },
    {
        icon: Smartphone,
        title: "App Usage Access",
        description: "Monitor app activity.",
    },
    {
        icon: MonitorSmartphone,
        title: "Screen Monitoring",
        description: "Detect screenshots of unsafe content.",
    },
    {
        icon: Bell,
        title: "Notification Access",
        description: "Monitor suspicious notifications.",
    },
];