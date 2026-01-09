// components/profile/ContributionsList.tsx - Updated with centralized types
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Target, ExternalLink, Clock, CheckCircle2, XCircle, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Contribution, ContributionStatus, formatRelativeTime } from "@/types";

interface ContributionsListProps {
  contributions: Contribution[];
  isOwnProfile: boolean;
}

export const ContributionsList = ({ contributions, isOwnProfile }: ContributionsListProps) => {
  if (contributions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border/50 border-dashed">
          <CardContent className="py-16 text-center">
            <Target className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contributions yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              {isOwnProfile
                ? "Start contributing to hackathons, open source projects, and more to build your reputation."
                : "This user hasn't made any contributions yet."}
            </p>
            {isOwnProfile && (
              <Button asChild>
                <Link to="/contributions/submit">Submit Contribution</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const getStatusConfig = (status: ContributionStatus) => {
    const configs = {
      [ContributionStatus.APPROVED]: {
        icon: CheckCircle2,
        color: "text-success",
        bgColor: "bg-success/10",
        borderColor: "border-success/30",
        label: "Approved",
      },
      [ContributionStatus.PENDING]: {
        icon: Timer,
        color: "text-warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/30",
        label: "Pending",
      },
      [ContributionStatus.PENDING_REVIEW]: {
        icon: Timer,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        label: "Pending Review",
      },
      [ContributionStatus.REJECTED]: {
        icon: XCircle,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/30",
        label: "Rejected",
      },
    };
    return configs[status];
  };

  return (
    <div className="space-y-4">
      {contributions.map((contribution, index) => {
        const statusConfig = getStatusConfig(contribution.status);
        const StatusIcon = statusConfig.icon;

        return (
          <motion.div
            key={contribution._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-border/50 hover:border-primary/30 transition-all hover:shadow-md group">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                          {contribution.name}
                        </h3>
                        <Badge variant="outline" className="mb-2">
                          {contribution.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {contribution.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatRelativeTime(contribution.created_at)}</span>
                      </div>

                      {/* Verification Link */}
                      {contribution.proof_url && (
                        <a
                          href={contribution.proof_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Proof</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tokens Awarded */}
                  {contribution.tokens_won > 0 && (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Coins className="w-5 h-5" />
                        <span className="text-2xl font-mono">
                          +{contribution.tokens_won.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">$PBUILD earned</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};