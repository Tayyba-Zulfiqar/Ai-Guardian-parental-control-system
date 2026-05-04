import { Clock, Shield, AlertTriangle, Zap } from 'lucide-react';

export const statsData = [
  {
    title: "Screen Time Today",
    value: "4h 23m",
    trend: { value: "15%", text: "from yesterday", direction: "up", type: "success" },
    Icon: Clock
  },
  {
    title: "Safety Score",
    value: "85",
    subtitle: "/ 100",
    trend: { value: "5%", text: "from yesterday", direction: "down", type: "danger" },
    Icon: Shield
  },
  {
    title: "Risk Level",
    value: "Low",
    trend: { value: "Stable", text: "this week", direction: "up", type: "success" },
    Icon: Zap
  },
  {
    title: "Total Alerts",
    value: "12",
    trend: { value: "3 new", text: "since morning", direction: "up", type: "warning" },
    Icon: AlertTriangle
  }
];
