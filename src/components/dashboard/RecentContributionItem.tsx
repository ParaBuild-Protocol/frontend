// components/dashboard/RecentContributionItem.tsx
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Contribution, ContributionStatus, formatRelativeTime } from "@/types";
import { motion } from "framer-motion";

interface RecentContributionItemProps {
  contribution: Contribution;
  delay?: number;
}

export const RecentContributionItem = ({
  contribution,
  delay = 0,
}: RecentContributionItemProps) => {
  const getStatusIcon = (status: ContributionStatus) => {
    switch (status) {
      case ContributionStatus.APPROVED:
        return CheckCircle;
      case ContributionStatus.REJECTED:
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: ContributionStatus) => {
    switch (status) {
      case ContributionStatus.APPROVED:
        return "bg-success/10 text-success";
      case ContributionStatus.REJECTED:
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-warning/10 text-warning";
    }
  };

  const StatusIcon = getStatusIcon(contribution.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
    >
      <div
        className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
          getStatusColor(contribution.status)
        )}
      >
        <StatusIcon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium truncate group-hover:text-primary transition-colors">
          {contribution.name}
        </div>
        <div className="text-sm text-muted-foreground">
          {contribution.type}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(contribution.created_at)}
        </div>
        {contribution.status === ContributionStatus.APPROVED &&
          contribution.tokens_won > 0 && (
            <div className="text-xs text-success mt-1 font-medium">
              +{contribution.tokens_won.toLocaleString()} $PBUILD
            </div>
          )}
      </div>

      <Badge
        variant={
          contribution.status === ContributionStatus.APPROVED
            ? "default"
            : "secondary"
        }
        className={cn(
          "shrink-0 capitalize",
          contribution.status === ContributionStatus.APPROVED &&
            "bg-success/10 text-success border-success/20",
          contribution.status === ContributionStatus.PENDING &&
            "bg-warning/10 text-warning border-warning/20",
          contribution.status === ContributionStatus.REJECTED &&
            "bg-destructive/10 text-destructive border-destructive/20"
        )}
      >
        {contribution.status.toLowerCase()}
      </Badge>
    </motion.div>
  );
};