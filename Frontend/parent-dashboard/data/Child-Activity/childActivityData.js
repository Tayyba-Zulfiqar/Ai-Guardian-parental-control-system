export const childActivityStats = {
  totalAppsToday: 12,
  mostUsedAppToday: "YouTube",
  mostUsedCategoryToday: "Entertainment"
};

export const topUsedAppsMonth = [
  {
    id: 1,
    name: "YouTube",
    category: "Entertainment",
    avgTime: "2h 15m",
    progress: 75,
    trend: "+12%",
    iconType: "youtube"
  },
  {
    id: 2,
    name: "Roblox",
    category: "Gaming",
    avgTime: "1h 45m",
    progress: 60,
    trend: "+5%",
    iconType: "gamepad"
  },
  {
    id: 3,
    name: "TikTok",
    category: "Social Media",
    avgTime: "1h 20m",
    progress: 45,
    trend: "-8%",
    iconType: "video"
  },
  {
    id: 4,
    name: "Chrome",
    category: "Productivity",
    avgTime: "45m",
    progress: 25,
    trend: "+2%",
    iconType: "globe"
  },
  {
    id: 5,
    name: "Discord",
    category: "Communication",
    avgTime: "30m",
    progress: 15,
    trend: "-1%",
    iconType: "message"
  }
];

export const appsUsedToday = [
  {
    id: 1,
    name: "YouTube",
    category: "Entertainment",
    timeSpent: "1h 10m",
    lastOpened: "10 mins ago",
    status: "active",
    iconType: "youtube"
  },
  {
    id: 2,
    name: "Roblox",
    category: "Gaming",
    timeSpent: "45m",
    lastOpened: "2 hours ago",
    status: "inactive",
    iconType: "gamepad"
  },
  {
    id: 3,
    name: "Chrome",
    category: "Productivity",
    timeSpent: "20m",
    lastOpened: "Just now",
    status: "active",
    iconType: "globe"
  },
  {
    id: 4,
    name: "Messages",
    category: "Communication",
    timeSpent: "15m",
    lastOpened: "5 hours ago",
    status: "inactive",
    iconType: "message"
  }
];

export const appUsageDistribution = {
  daily: [
    { name: "Gaming", value: 30, fill: "#FF9A9E" },
    { name: "Social Media", value: 20, fill: "#A18CD1" },
    { name: "Education", value: 15, fill: "#FBC2EB" },
    { name: "Entertainment", value: 25, fill: "#84FAB0" },
    { name: "Communication", value: 5, fill: "#8FD3F4" },
    { name: "Productivity", value: 5, fill: "#FCCB90" }
  ],
  weekly: [
    { name: "Gaming", value: 35, fill: "#FF9A9E" },
    { name: "Social Media", value: 25, fill: "#A18CD1" },
    { name: "Education", value: 10, fill: "#FBC2EB" },
    { name: "Entertainment", value: 20, fill: "#84FAB0" },
    { name: "Communication", value: 5, fill: "#8FD3F4" },
    { name: "Productivity", value: 5, fill: "#FCCB90" }
  ],
  monthly: [
    { name: "Gaming", value: 40, fill: "#FF9A9E" },
    { name: "Social Media", value: 20, fill: "#A18CD1" },
    { name: "Education", value: 5, fill: "#FBC2EB" },
    { name: "Entertainment", value: 25, fill: "#84FAB0" },
    { name: "Communication", value: 5, fill: "#8FD3F4" },
    { name: "Productivity", value: 5, fill: "#FCCB90" }
  ]
};

export const weeklyActivityTrend = [
  { day: "Mon", time: 120 },
  { day: "Tue", time: 90 },
  { day: "Wed", time: 150 },
  { day: "Thu", time: 100 },
  { day: "Fri", time: 200 },
  { day: "Sat", time: 300 },
  { day: "Sun", time: 250 }
];

export const aiInsightsData = [
  {
    id: 1,
    insight: "Gaming usage increased by 20% this week.",
    type: "warning"
  },
  {
    id: 2,
    insight: "Educational app usage dropped compared to last week.",
    type: "alert"
  },
  {
    id: 3,
    insight: "Most active period: 7PM - 9PM",
    type: "info"
  }
];
