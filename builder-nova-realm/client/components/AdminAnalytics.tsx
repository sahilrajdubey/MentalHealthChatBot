import { Activity, BarChart3 } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { week: "W1", "PHQ-9": 24, "GAD-7": 31 },
  { week: "W2", "PHQ-9": 20, "GAD-7": 28 },
  { week: "W3", "PHQ-9": 26, "GAD-7": 33 },
  { week: "W4", "PHQ-9": 21, "GAD-7": 29 },
];

const usageData = [
  { day: "Mon", chat: 120, bookings: 12 },
  { day: "Tue", chat: 150, bookings: 15 },
  { day: "Wed", chat: 170, bookings: 18 },
  { day: "Thu", chat: 200, bookings: 20 },
  { day: "Fri", chat: 140, bookings: 11 },
  { day: "Sat", chat: 90, bookings: 6 },
  { day: "Sun", chat: 60, bookings: 4 },
];

export default function AdminAnalytics() {
  return (
    <section id="admin" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Admin Dashboard (Anonymous Trends)
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 md:p-6">
          <h3 className="mb-2 font-medium">Screening Scores Over Time</h3>
          <ChartContainer
            config={{
              "PHQ-9": { label: "PHQ-9", color: "hsl(var(--accent))" },
              "GAD-7": { label: "GAD-7", color: "hsl(var(--primary))" },
            }}
            className="aspect-[16/10]"
          >
            <LineChart data={weeklyData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="PHQ-9"
                stroke="var(--color-PHQ-9)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="GAD-7"
                stroke="var(--color-GAD-7)"
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="rounded-xl border bg-card p-4 md:p-6">
          <h3 className="mb-2 font-medium">Weekly Usage</h3>
          <ChartContainer
            config={{
              chat: { label: "AI Chats", color: "hsl(var(--accent))" },
              bookings: { label: "Bookings", color: "hsl(var(--primary))" },
            }}
            className="aspect-[16/10]"
          >
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="chat" fill="var(--color-chat)" radius={4} />
              <Bar dataKey="bookings" fill="var(--color-bookings)" radius={4} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
}
