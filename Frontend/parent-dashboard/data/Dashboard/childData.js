import { Clock, Shield, AlertTriangle, Zap, Gamepad2, Video, MessageSquare } from 'lucide-react';

export const childrenData = [
  {
    id: 1,
    name: "Emma",
    age: 10,
    avatar: "👧",
    device: "Samsung A52",
    status: "Online",
    lastActive: "2 mins ago",
    parentName: "Parent",
    stats: [
      {
        title: "Screen Time Today",
        value: "4h 23m",
        trend: { value: "15%", text: "from yesterday", direction: "up", type: "success" },
        Icon: Clock
      },
      {
        title: "Safety Score",
        value: "85 / 100",
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
    ],
    topApps: [
      {
        id: 1,
        name: "YouTube",
        usage: "1h 45m",
        category: "Entertainment",
        Icon: Video,
        color: "#FF0000"
      },
      {
        id: 2,
        name: "Roblox",
        usage: "1h 10m",
        category: "Gaming",
        Icon: Gamepad2,
        color: "#000000"
      },
      {
        id: 3,
        name: "WhatsApp",
        usage: "45m",
        category: "Social Media",
        Icon: MessageSquare,
        color: "#25D366"
      }
    ],
    aiSummary: "Emma has spent a balanced amount of time on educational and entertainment apps today. Most of her activity was on YouTube Kids. No major security risks were detected, but screen time has increased by 15% compared to yesterday."
  },
  {
    id: 2,
    name: "Alex",
    age: 8,
    avatar: "👦",
    device: "iPad Mini",
    status: "Offline",
    lastActive: "1 hour ago",
    parentName: "Parent",
    stats: [
      {
        title: "Screen Time Today",
        value: "2h 15m",
        trend: { value: "10%", text: "from yesterday", direction: "down", type: "success" },
        Icon: Clock
      },
      {
        title: "Safety Score",
        value: "92 / 100",
        trend: { value: "2%", text: "from yesterday", direction: "up", type: "success" },
        Icon: Shield
      },
      {
        title: "Risk Level",
        value: "Low",
        trend: { value: "Safe", text: "this week", direction: "up", type: "success" },
        Icon: Zap
      },
      {
        title: "Total Alerts",
        value: "2",
        trend: { value: "0 new", text: "since morning", direction: "down", type: "success" },
        Icon: AlertTriangle
      }
    ],
    topApps: [
      {
        id: 1,
        name: "Minecraft",
        usage: "1h 20m",
        category: "Gaming",
        Icon: Gamepad2,
        color: "#388E3C"
      },
      {
        id: 2,
        name: "Khan Academy",
        usage: "45m",
        category: "Education",
        Icon: Video,
        color: "#99CC00"
      },
      {
        id: 3,
        name: "Discord",
        usage: "10m",
        category: "Communication",
        Icon: MessageSquare,
        color: "#5865F2"
      }
    ],
    aiSummary: "Alex had a productive day with significant time spent on Minecraft and Khan Academy. His safety score remains high, and he followed all scheduled breaks perfectly today."
  }
];

export const parentData = {
  name: "Parent"
};
