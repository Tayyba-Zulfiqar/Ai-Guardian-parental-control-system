
export const contentReportsData = {
  threatTimeline: [
    {
      id: 1,
      title: "Risks Detected Yesterday",
      value: "12",
      subtitle: "Critical Threats",
      trend: {
        direction: "up",
        value: "8%",
        text: "since previous day",
        type: "danger"
      }
    },
    {
      id: 2,
      title: "Risks Detected Last Week",
      value: "84",
      subtitle: "Total Threats",
      trend: {
        direction: "down",
        value: "12%",
        text: "since previous week",
        type: "success"
      }
    },
    {
      id: 3,
      title: "Risks Detected Last Month",
      value: "312",
      subtitle: "Monthly Summary",
      trend: {
        direction: "up",
        value: "5%",
        text: "vs previous month",
        type: "neutral"
      }
    }
  ],
  categoryAnalysis: [
    { name: "Violence", value: 35, color: "#ef4444" },
    { name: "Adult Content", value: 25, color: "#8b5cf6" },
    { name: "Harmful Behavior", value: 20, color: "#f59e0b" },
    { name: "Other", value: 20, color: "#10b981" }
  ],
  riskScoreTrend: [
    { day: "Mon", score: 45 },
    { day: "Tue", score: 52 },
    { day: "Wed", score: 48 },
    { day: "Thu", score: 70 },
    { day: "Fri", score: 65 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 60 }
  ],
  aiInsights: [
    {
      id: 1,
      type: "alert",
      insight: "Most harmful content detected on YouTube in the evening hours (6 PM - 9 PM)."
    },
    {
      id: 2,
      type: "warning",
      insight: "Violence-related content has increased by 15% over the last 7 days."
    },
    {
      id: 3,
      type: "info",
      insight: "Repeated exposure to similar risky content categories detected on Instagram."
    }
  ]
};
