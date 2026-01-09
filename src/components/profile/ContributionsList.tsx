// components/profile/ContributionsList.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Target, ExternalLink, Clock, CheckCircle2, XCircle, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Contribution {
  id: string;
  projectName: string;
  description: string;
  status: "approved" | "pending" | "rejected";
  tokensAwarded: number;
  submittedAt: Date;
  category?: string;
  tags?: string[];
  verificationUrl?: string;
}

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

  const getStatusConfig = (status: Contribution["status"]) => {
    const configs = {
      approved: {
        icon: CheckCircle2,
        color: "text-success",
        bgColor: "bg-success/10",
        borderColor: "border-success/30",
        label: "Approved",
      },
      pending: {
        icon: Timer,
        color: "text-warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/30",
        label: "Pending Review",
      },
      rejected: {
        icon: XCircle,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/30",
        label: "Rejected",
      },
    };
    return configs[status];
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-4">
      {contributions.map((contribution, index) => {
        const statusConfig = getStatusConfig(contribution.status);
        const StatusIcon = statusConfig.icon;

        return (
          <motion.div
            key={contribution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-border/50 hover:border-primary/30 transition-all hover:shadow-md group">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title & Category */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                          {contribution.projectName}
                        </h3>
                        {contribution.category && (
                          <Badge variant="outline" className="mb-2">
                            {contribution.category}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {contribution.description}
                    </p>

                    {/* Tags */}
                    {contribution.tags && contribution.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {contribution.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/5 text-primary border-primary/20 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

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
                        <span>{formatDate(contribution.submittedAt)}</span>
                      </div>

                      {/* Verification Link */}
                      {contribution.verificationUrl && (
                        <a
                          href={contribution.verificationUrl}
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
                  {contribution.tokensAwarded > 0 && (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Coins className="w-5 h-5" />
                        <span className="text-2xl font-mono">
                          +{contribution.tokensAwarded.toLocaleString()}
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