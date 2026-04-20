import { Clock, Award, CheckCircle, ShieldAlert } from "lucide-react-native";
import { Colors } from "./Colors";

export const statusData = {
    label: "Protection Status",
    status: "You're Safe!",
};

export const safetyScoreData = {
    icon: Award,
    iconBgColor: Colors.purpleIconBg,
    iconColor: Colors.purpleIcon,
    title: "Safety Score Today",
    label: "Safe activities",
    value: "98%",
    progress: "98%",
    progressColor: Colors.purpleIcon,
    stats: [
        {
            icon: CheckCircle,
            iconColor: Colors.badgeGreenText,
            iconBgColor: Colors.badgeGreenBg,
            label: "Safe sessions",
            value: "12",
        },
        {
            icon: ShieldAlert,
            iconColor: Colors.warning,
            iconBgColor: "#FEF2F2",
            label: "Blocked events",
            value: "0",
        },
    ],
};

export const screenTimeData = {
    icon: Clock,
    iconBgColor: Colors.pinkIconBg,
    iconColor: Colors.pinkIcon,
    title: "Screen Time Today",
    label: "Total time used",
    value: "45 minutes",
    progress: "65%",
    progressColor: Colors.pinkIcon,
};