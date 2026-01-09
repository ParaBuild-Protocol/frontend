// components/profile/ProfileStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Coins, Target, Trophy, Gift } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, value, label, iconColor, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <Card className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-${iconColor}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 text-${iconColor}`} />
          </div>
          <div>
            <div className="text-3xl font-bold font-mono mb-1">{value}</div>
            <div className="text-sm text-muted-foreground font-medium">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

interface ProfileStatsProps {
  stats: {
    totalPBUILD: number;
    contributions: number;
    rank: number;
    totalPoints: number;
  };
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  const statCards = [
    {
      icon: Coins,
      value: stats.totalPBUILD.toLocaleString(),
      label: "$PBUILD",
      iconColor: "primary",
    },
    {
      icon: Target,
      value: stats.contributions,
      label: "Contributions",
      iconColor: "accent",
    },
    {
      icon: Trophy,
      value: `#${stats.rank || "-"}`,
      label: "Global Rank",
      iconColor: "warning",
    },
    {
      icon: Gift,
      value: stats.totalPoints.toLocaleString(),
      label: "Points",
      iconColor: "success",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <StatCard key={card.label} {...card} delay={index * 0.1} />
      ))}
    </div>
  );
};