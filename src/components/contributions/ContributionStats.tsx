// components/contributions/ContributionStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ContributionStats as ContributionStatsType } from "@/types";
import { motion } from "framer-motion";

interface ContributionStatsProps {
  stats: ContributionStatsType;
  loading?: boolean;
}

export const ContributionStatsGrid = ({
  stats,
  loading = false,
}: ContributionStatsProps) => {
  const statItems = [
    {
      label: "Total",
      value: stats.total,
      color: "text-foreground",
    },
    {
      label: "Approved",
      value: stats.approved,
      color: "text-success",
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "text-warning",
    },
    {
      label: "$PBUILD Earned",
      value: stats.total_tokens.toLocaleString(),
      color: "text-primary",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Card className="bg-card border-border hover:border-primary/30 transition-all group">
            <CardContent className="pt-6">
              <div
                className={`text-2xl font-bold font-mono mb-1 ${stat.color} group-hover:scale-110 transition-transform`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};