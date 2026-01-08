// pages/BugBounties.tsx - Bug Bounty opportunities page
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bug,
  Shield,
  Coins,
  Clock,
  Users,
  ExternalLink,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Target,
  Award,
  Code,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type BountySeverity = "critical" | "high" | "medium" | "low";
type BountyStatus = "open" | "in-progress" | "completed";

interface BugBounty {
  id: string;
  title: string;
  protocol: string;
  protocolLogo: string;
  description: string;
  severity: BountySeverity;
  reward: {
    min: number;
    max: number;
  };
  status: BountyStatus;
  participants: number;
  deadline: Date;
  tags: string[];
  requiredSkills: string[];
  type: "smart-contract" | "frontend" | "backend" | "infrastructure";
}

const severityColors = {
  critical: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    icon: AlertTriangle,
  },
  high: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
    icon: AlertTriangle,
  },
  medium: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
    icon: Shield,
  },
  low: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
    icon: CheckCircle2,
  },
};

export default function BugBounties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock bug bounties data
  const bounties: BugBounty[] = [
    {
      id: "1",
      title: "Smart Contract Reentrancy Vulnerability",
      protocol: "DeFi Protocol",
      protocolLogo: "🔷",
      description:
        "Identify and fix potential reentrancy vulnerabilities in our lending protocol smart contracts.",
      severity: "critical",
      reward: { min: 50000, max: 100000 },
      status: "open",
      participants: 12,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      tags: ["Solidity", "Security", "DeFi"],
      requiredSkills: ["Solidity", "Security Auditing", "DeFi Protocols"],
      type: "smart-contract",
    },
    {
      id: "2",
      title: "Frontend XSS Protection",
      protocol: "NFT Marketplace",
      protocolLogo: "🎨",
      description:
        "Review and secure our React frontend against XSS and injection attacks.",
      severity: "high",
      reward: { min: 10000, max: 25000 },
      status: "open",
      participants: 8,
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      tags: ["React", "Security", "Frontend"],
      requiredSkills: ["React", "Web Security", "JavaScript"],
      type: "frontend",
    },
    {
      id: "3",
      title: "API Rate Limiting Bypass",
      protocol: "Exchange Platform",
      protocolLogo: "💱",
      description:
        "Find and report any methods to bypass our API rate limiting mechanisms.",
      severity: "medium",
      reward: { min: 5000, max: 15000 },
      status: "in-progress",
      participants: 5,
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      tags: ["Backend", "Security", "API"],
      requiredSkills: ["Backend Development", "API Security", "Node.js"],
      type: "backend",
    },
    {
      id: "4",
      title: "Oracle Price Manipulation",
      protocol: "Lending Protocol",
      protocolLogo: "🏦",
      description:
        "Test our oracle integration for potential price manipulation vulnerabilities.",
      severity: "critical",
      reward: { min: 75000, max: 150000 },
      status: "open",
      participants: 20,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      tags: ["Solidity", "Oracles", "DeFi"],
      requiredSkills: ["Smart Contracts", "Oracle Integration", "MEV"],
      type: "smart-contract",
    },
    {
      id: "5",
      title: "Infrastructure Security Audit",
      protocol: "DAO Platform",
      protocolLogo: "🏛️",
      description:
        "Comprehensive security audit of our deployment infrastructure and CI/CD pipeline.",
      severity: "high",
      reward: { min: 15000, max: 30000 },
      status: "open",
      participants: 3,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      tags: ["DevOps", "Security", "Infrastructure"],
      requiredSkills: ["DevOps", "Cloud Security", "CI/CD"],
      type: "infrastructure",
    },
  ];

  const activeBounties = bounties.filter((b) => b.status === "open");
  const inProgressBounties = bounties.filter((b) => b.status === "in-progress");
  // const completedBounties = bounties.filter((b) => b.status === "completed");

  const formatTimeRemaining = (date: Date) => {
    const days = Math.floor(
      (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days > 30) return `${Math.floor(days / 30)}mo`;
    if (days > 7) return `${Math.floor(days / 7)}w`;
    return `${days}d`;
  };

  const renderBountyCard = (bounty: BugBounty) => {
    const severityConfig = severityColors[bounty.severity];
    const SeverityIcon = severityConfig.icon;

    return (
      <Card
        key={bounty.id}
        className="border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            {/* Protocol Logo */}
            <div className="shrink-0">
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shadow-lg">
                {bounty.protocolLogo}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {bounty.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {bounty.protocol}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    severityConfig.bg,
                    severityConfig.text,
                    severityConfig.border,
                    "uppercase text-xs font-bold"
                  )}
                >
                  <SeverityIcon className="w-3 h-3 mr-1" />
                  {bounty.severity}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {bounty.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {bounty.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-primary/5 text-primary border-primary/20 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-warning" />
                  <span className="font-mono font-bold text-warning">
                    ${bounty.reward.min.toLocaleString()}-$
                    {bounty.reward.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{bounty.participants} hunters</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeRemaining(bounty.deadline)} left</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  className="flex-1 gap-2"
                  size="sm"
                  asChild
                >
                  <Link to={`/bug-bounties/${bounty.id}`}>
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Protocol
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-display flex items-center gap-3">
            <Bug className="h-8 w-8 text-primary" />
            Bug Bounties
          </h1>
          <p className="text-muted-foreground text-lg">
            Earn rewards by finding and reporting security vulnerabilities
          </p>
        </div>
        <Button size="lg" className="gap-2" asChild>
          <Link to="/bug-bounties/submit">
            <FileText className="h-4 w-4" />
            Submit Report
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeBounties.length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Coins className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">$2.5M</div>
                <div className="text-sm text-muted-foreground">Total Rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">480</div>
                <div className="text-sm text-muted-foreground">Hunters</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Bounty */}
      <Card className="border-2 border-primary/30 bg-linear-to-br from-primary/5 via-card to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Featured Bounty</CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              High Reward
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {bounties[0] && renderBountyCard(bounties[0])}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bounties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full sm:w-50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-50">
                <Code className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="smart-contract">Smart Contract</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bounties Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="all">
            All ({bounties.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeBounties.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressBounties.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {bounties.map((bounty) => renderBountyCard(bounty))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {activeBounties.map((bounty) => renderBountyCard(bounty))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {inProgressBounties.map((bounty) => renderBountyCard(bounty))}
          </div>
        </TabsContent>
      </Tabs>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            How Bug Bounties Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <h4 className="font-semibold">Find a Bounty</h4>
              <p className="text-sm text-muted-foreground">
                Browse active bounties and choose one that matches your expertise
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <h4 className="font-semibold">Hunt for Bugs</h4>
              <p className="text-sm text-muted-foreground">
                Review the protocol and identify security vulnerabilities
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <h4 className="font-semibold">Submit Report</h4>
              <p className="text-sm text-muted-foreground">
                Provide detailed findings with proof of concept
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                4
              </div>
              <h4 className="font-semibold">Get Rewarded</h4>
              <p className="text-sm text-muted-foreground">
                Receive payment and build your security reputation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}