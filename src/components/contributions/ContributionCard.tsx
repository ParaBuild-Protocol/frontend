// components/contributions/ContributionCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Coins,
  ExternalLink,
  Github,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Contribution,
  ContributionStatus,
  formatDate,
  formatRelativeTime,
} from "@/types";
import { cn } from "@/lib/utils";

interface ContributionCardProps {
  contribution: Contribution;
  delay?: number;
}

export const ContributionCard = ({
  contribution,
  delay = 0,
}: ContributionCardProps) => {
  const getStatusBadgeClass = (status: ContributionStatus) => {
    switch (status) {
      case ContributionStatus.APPROVED:
        return "bg-success/20 text-success border-success/30";
      case ContributionStatus.REJECTED:
        return "bg-destructive/20 text-destructive border-destructive/30";
      case ContributionStatus.PENDING:
      case ContributionStatus.PENDING_REVIEW:
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {contribution.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        getStatusBadgeClass(contribution.status)
                      )}
                    >
                      {contribution.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {contribution.type}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground line-clamp-2">
                {contribution.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(contribution.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatRelativeTime(contribution.created_at)}
                </span>
                {contribution.tokens_won > 0 && (
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <Coins className="w-4 h-4" />
                    {contribution.tokens_won.toLocaleString()} $PBUILD
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {contribution.github_url && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={contribution.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {contribution.proof_url && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={contribution.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Proof
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};