// components/dashboard/DashboardStatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardStatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "warning" | "destructive";
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  bgGradient?: string;
  delay?: number;
}

export const DashboardStatsCard = ({
  label,
  value,
  icon: Icon,
  color,
  trend,
  bgGradient = "from-primary/20 to-primary/5",
  delay = 0,
}: DashboardStatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 group">
        {/* Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-br opacity-50 group-hover:opacity-70 transition-opacity",
            bgGradient
          )}
        />

        <CardContent className="relative p-5 md:p-6">
          {/* Icon and Trend */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                "h-11 w-11 rounded-xl flex items-center justify-center",
                `bg-${color}/10 group-hover:scale-110 transition-transform`
              )}
            >
              <Icon className={cn("h-6 w-6", `text-${color}`)} />
            </div>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  trend.direction === "up" && "text-success",
                  trend.direction === "down" && "text-destructive",
                  trend.direction === "neutral" && "text-muted-foreground"
                )}
              >
                {trend.direction === "up" && <TrendingUp className="h-3 w-3" />}
                {trend.direction === "down" && <TrendingDown className="h-3 w-3" />}
                <span>{trend.value}</span>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="font-mono text-2xl md:text-3xl font-bold mb-1 group-hover:text-primary transition-colors">
            {value}
          </div>

          {/* Label */}
          <div className="text-sm text-muted-foreground font-medium">
            {label}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};