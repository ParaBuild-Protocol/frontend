// components/contributions/ContributionFilters.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { ContributionStatus, ContributionType } from "@/types";

interface ContributionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: ContributionStatus | "all";
  onStatusChange: (value: ContributionStatus | "all") => void;
  typeFilter: ContributionType | "all";
  onTypeChange: (value: ContributionType | "all") => void;
}

export const ContributionFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: ContributionFiltersProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contributions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusChange(value as ContributionStatus | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-45 bg-background border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={ContributionStatus.PENDING}>
                Pending
              </SelectItem>
              <SelectItem value={ContributionStatus.PENDING_REVIEW}>
                Pending Review
              </SelectItem>
              <SelectItem value={ContributionStatus.APPROVED}>
                Approved
              </SelectItem>
              <SelectItem value={ContributionStatus.REJECTED}>
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={typeFilter}
            onValueChange={(value) =>
              onTypeChange(value as ContributionType | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-50 bg-background border-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={ContributionType.HACKATHON_WIN}>
                Hackathon Win
              </SelectItem>
              <SelectItem value={ContributionType.HACKATHON_PARTICIPATION}>
                Hackathon Participation
              </SelectItem>
              <SelectItem value={ContributionType.BOUNTY}>Bounty</SelectItem>
              <SelectItem value={ContributionType.OPEN_SOURCE}>
                Open Source
              </SelectItem>
              <SelectItem value={ContributionType.TUTORIAL}>
                Tutorial
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};