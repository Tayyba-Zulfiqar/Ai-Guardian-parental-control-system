export const averageScreenTimeStats = {
  daily: {
    title: "Daily Average",
    value: "3h 15m",
    trend: { direction: "up", value: "15m", text: "vs yesterday" }
  },
  weekly: {
    title: "Weekly Average",
    value: "22h 45m",
    trend: { direction: "down", value: "2h", text: "vs last week" }
  },
  monthly: {
    title: "Monthly Average",
    value: "98h 30m",
    trend: { direction: "up", value: "5h", text: "vs last month" }
  }
};

export const screenTimeTrendData = {
  daily: [
    { day: "12 AM", time: 0 },
    { day: "4 AM", time: 0 },
    { day: "8 AM", time: 45 },
    { day: "12 PM", time: 90 },
    { day: "4 PM", time: 120 },
    { day: "8 PM", time: 150 },
    { day: "11 PM", time: 30 }
  ],
  weekly: [
    { day: "Mon", time: 180 },
    { day: "Tue", time: 150 },
    { day: "Wed", time: 210 },
    { day: "Thu", time: 120 },
    { day: "Fri", time: 240 },
    { day: "Sat", time: 320 },
    { day: "Sun", time: 280 }
  ],
  monthly: [
    { day: "Week 1", time: 850 },
    { day: "Week 2", time: 920 },
    { day: "Week 3", time: 880 },
    { day: "Week 4", time: 1050 }
  ]
};

export const appWiseBreakdown = [
  { id: 1, name: "YouTube", category: "Entertainment", timeSpent: "2h 30m", iconType: "youtube" },
  { id: 2, name: "Instagram", category: "Social Media", timeSpent: "1h 10m", iconType: "message" },
  { id: 3, name: "Minecraft", category: "Gaming", timeSpent: "45m", iconType: "gamepad" },
  { id: 4, name: "Chrome", category: "Education", timeSpent: "30m", iconType: "globe" }
];
