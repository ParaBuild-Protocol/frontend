// components/profile/ActivityHeatmap.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

interface ActivityHeatmapProps {
  data?: number[];
}

export const ActivityHeatmap = ({ data }: ActivityHeatmapProps) => {
  const [hoveredDay, setHoveredDay] = useState<{ index: number; value: number } | null>(null);

  // Generate heatmap data if not provided
  const heatmapData = data || generateHeatmapData();

  function generateHeatmapData() {
    const result = [];
    for (let i = 0; i < 365; i++) {
      // Generate more realistic activity patterns
      const dayOfWeek = i % 7;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Lower activity on weekends, higher during weekdays
      const baseChance = isWeekend ? 0.3 : 0.7;
      const randomValue = Math.random();
      
      if (randomValue > baseChance) {
        result.push(0); // No activity
      } else {
        result.push(Math.floor(Math.random() * 4) + 1); // 1-4 contributions
      }
    }
    return result;
  }

  const getIntensityClass = (value: number) => {
    if (value === 0) return "bg-muted hover:bg-muted/80";
    if (value === 1) return "bg-primary/20 hover:bg-primary/30";
    if (value === 2) return "bg-primary/40 hover:bg-primary/50";
    if (value === 3) return "bg-primary/60 hover:bg-primary/70";
    return "bg-primary hover:bg-primary/90";
  };

  const getDateFromIndex = (index: number) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(date.getDate() - (364 - index));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const totalContributions = heatmapData.reduce((sum, val) => sum + val, 0);
  const activeStreak = calculateStreak(heatmapData);

  function calculateStreak(data: number[]) {
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">Contribution Activity</CardTitle>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Total: </span>
                <span className="font-bold">{totalContributions}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Current Streak: </span>
                <span className="font-bold text-primary">{activeStreak} days</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Heatmap Grid */}
          <div className="relative">
            <div className="flex gap-1 flex-wrap">
              {heatmapData.map((value, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${getIntensityClass(value)}`}
                  onMouseEnter={() => setHoveredDay({ index, value })}
                  onMouseLeave={() => setHoveredDay(null)}
                  whileHover={{ scale: 1.5 }}
                  title={`${value} contribution${value !== 1 ? "s" : ""} on ${getDateFromIndex(index)}`}
                />
              ))}
            </div>

            {/* Tooltip */}
            {hoveredDay && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg text-sm z-10"
              >
                <div className="font-semibold">
                  {hoveredDay.value} contribution{hoveredDay.value !== 1 ? "s" : ""}
                </div>
                <div className="text-muted-foreground text-xs">
                  {getDateFromIndex(hoveredDay.index)}
                </div>
              </motion.div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-muted-foreground">
              Last 365 days
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <div className="w-3 h-3 rounded-sm bg-primary/20" />
                <div className="w-3 h-3 rounded-sm bg-primary/40" />
                <div className="w-3 h-3 rounded-sm bg-primary/60" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};