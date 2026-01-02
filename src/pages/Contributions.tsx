import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  ExternalLink,
  Github,
  Calendar,
  Coins,
} from "lucide-react";
import { mockContributions } from "@/data/mockData";
import { ContributionStatus, ContributionType } from "@/types";

const statusColors: Record<ContributionStatus, string> = {
  pending: "bg-warning/20 text-warning border-warning/30",
  approved: "bg-success/20 text-success border-success/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
};

const typeLabels: Record<ContributionType, string> = {
  hackathon_win: "🏆 Hackathon Win",
  hackathon_participation: "🎯 Hackathon Participation",
  bounty: "💰 Bounty",
  open_source: "🔧 Open Source",
  open_source_pr: "🔧 Open Source PR",
  content: "📝 Content",
  tutorial: "📝 Tutorial",
  community: "👥 Community",
  community_event: "👥 Community Event",
};

const Contributions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredContributions = mockContributions.filter((contribution) => {
    const matchesSearch =
      contribution.projectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      contribution.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || contribution.status === statusFilter;
    const matchesType =
      typeFilter === "all" || contribution.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">Contributions</h1>
          <p className="text-muted-foreground">
            Track and manage your contributions
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/contributions/new">
            <Plus className="w-4 h-4 mr-2" />
            New Contribution
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search contributions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hackathon_win">Hackathon Win</SelectItem>
                <SelectItem value="hackathon_participation">
                  Hackathon Participation
                </SelectItem>
                <SelectItem value="bounty">Bounty</SelectItem>
                <SelectItem value="open_source">Open Source</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold font-mono">
              {mockContributions.length}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold font-mono text-success">
              {mockContributions.filter((c) => c.status === "approved").length}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold font-mono text-warning">
              {mockContributions.filter((c) => c.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold font-mono text-primary">
              {mockContributions
                .reduce((acc, c) => acc + (c.tokensAwarded || 0), 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">$PBUILD Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Contributions List */}
      <div className="space-y-4">
        {filteredContributions.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No contributions found</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/contributions/new">
                  Submit your first contribution
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredContributions.map((contribution) => (
            <Card
              key={contribution.id}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">
                            {contribution.projectName}
                          </h3>
                          <Badge
                            variant="outline"
                            className={statusColors[contribution.status]}
                          >
                            {contribution.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {typeLabels[contribution.type]}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {contribution.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          contribution.submittedAt
                        ).toLocaleDateString()}
                      </span>
                      {contribution.tokensAwarded > 0 && (
                        <span className="flex items-center gap-1 text-primary">
                          <Coins className="w-4 h-4" />
                          {contribution.tokensAwarded.toLocaleString()} $PBUILD
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contribution.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={contribution.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={contribution.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Proof
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Contributions;
