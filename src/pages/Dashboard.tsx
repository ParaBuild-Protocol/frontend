import { Link } from "react-router-dom";
import {
  Coins,
  FileText,
  Trophy,
  ArrowRight,
  Plus,
  Gift,
  Clock,
  CheckCircle,
  TrendingUp,
  Target,
  ChevronRight,
  Briefcase,
  Code,
  Award,
  MapPin,
  Shield,
  Flame,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, stats } = useAuthStore();

  // Mock data for demo (replace with real API calls)
  const recentContributions = [
    {
      id: 1,
      projectName: "DeFi Vault Protocol",
      type: "Hackathon",
      status: "approved",
      tokensAwarded: 15000,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      projectName: "NFT Marketplace UI",
      type: "Bounty",
      status: "pending",
      tokensAwarded: 0,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      projectName: "Governance Module",
      type: "Open Source",
      status: "approved",
      tokensAwarded: 8000,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ];

  const activeQuests = [
    {
      id: 1,
      title: "First Attestation",
      description: "Submit 3 verified contributions",
      progress: 2,
      maxProgress: 3,
      pointsReward: 1000,
    },
    {
      id: 2,
      title: "Skill Master",
      description: "Earn Gold badge in any skill",
      progress: 75,
      maxProgress: 100,
      pointsReward: 5000,
    },
    {
      id: 3,
      title: "Community Builder",
      description: "Refer 3 new builders",
      progress: 1,
      maxProgress: 3,
      pointsReward: 2000,
    },
  ];

  const userGigPreview = {
    tagline: "Full-Stack Web3 Developer | Smart Contract Specialist",
    location: "Remote",
    availability: "Available for hire",
    topSkills: ["Solidity", "React", "Node.js", "TypeScript"],
    achievements: [
      { icon: Trophy, label: "5x Winner", color: "text-amber-500" },
      { icon: Award, label: "Top 100", color: "text-purple-500" },
      { icon: Code, label: "50+ Contracts", color: "text-blue-500" },
    ],
  };

  const statCards = [
    {
      label: "Total $PBUILD",
      value: stats?.totalPBUILD?.toLocaleString() || "0",
      icon: Coins,
      color: "primary",
      trend: "+2,500 this week",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      label: "Contributions",
      value: stats?.totalContributions?.toString() || "0",
      icon: FileText,
      color: "accent",
      trend: "+3 pending",
      bgGradient: "from-accent/20 to-accent/5",
    },
    {
      label: "Attestations",
      value: stats?.totalAttestations?.toString() || "0",
      icon: Shield,
      color: "success",
      trend: "12 verified",
      bgGradient: "from-success/20 to-success/5",
    },
    {
      label: "Global Rank",
      value: `#${stats?.rank || "-"}`,
      icon: Trophy,
      color: "warning",
      trend: "Top 5%",
      bgGradient: "from-warning/20 to-warning/5",
    },
  ];

  const quickActions = [
    {
      label: "Submit Contribution",
      desc: "Log your latest work",
      icon: Plus,
      href: "/contributions/new",
      color: "primary",
      gradient: "from-primary to-primary/70",
    },
    {
      label: "Browse Rewards",
      desc: "Redeem your tokens",
      icon: Gift,
      href: "/rewards",
      color: "accent",
      gradient: "from-accent to-accent/70",
    },
    {
      label: "Active Quests",
      desc: "Earn bonus points",
      icon: Target,
      href: "/quests",
      color: "success",
      gradient: "from-success to-success/70",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-accent/5 p-8 md:p-10">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px]" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground font-medium">
                Build Beyond
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-2 tracking-tight">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                {user?.username || "Builder"}
              </span>
              ! 👋
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              You're ranked{" "}
              <span className="text-primary font-semibold">
                #{stats?.rank || "-"}
              </span>{" "}
              globally. Keep building your onchain reputation!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur border border-border/50 shadow-xl">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Your Balance
              </div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-primary mb-1">
                {stats?.totalPBUILD?.toLocaleString() || "0"}
              </div>
              <div className="text-xs text-primary font-medium">
                $PBUILD Tokens
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br opacity-50 group-hover:opacity-70 transition-opacity",
                stat.bgGradient
              )}
            />
            <CardContent className="relative p-5 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center",
                    `bg-${stat.color}/10`
                  )}
                >
                  <stat.icon className={cn("h-6 w-6", `text-${stat.color}`)} />
                </div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                </div>
              </div>
              <div className="font-mono text-2xl md:text-3xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground/70">
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {quickActions.map((action, i) => (
          <Link key={i} to={action.href}>
            <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden hover:shadow-xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div
                  className={cn(
                    "h-14 w-14 rounded-xl flex items-center justify-center bg-linear-to-br shrink-0 shadow-lg",
                    action.gradient
                  )}
                >
                  <action.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg mb-1">
                    {action.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {action.desc}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Gig Preview Card */}
      <Card className="border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 group">
        <div className="bg-linear-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Your Gig Profile</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link to="/gig">
                  View Full Profile
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardHeader>
        </div>

        <CardContent className="p-6">
          <Link to="/gig" className="block">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary via-accent to-primary flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                  {user?.username?.charAt(0).toUpperCase() || "B"}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {user?.username || "Builder"}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {userGigPreview.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{userGigPreview.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-green-500 font-medium">
                      {userGigPreview.availability}
                    </span>
                  </div>
                </div>

                {/* Top Skills */}
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    Top Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userGigPreview.topSkills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-primary border-primary/20 px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mini Achievements */}
                <div className="flex items-center gap-6">
                  {userGigPreview.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <achievement.icon
                        className={cn("h-5 w-5", achievement.color)}
                      />
                      <span className="text-muted-foreground font-medium">
                        {achievement.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contributions */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Recent Contributions</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-primary"
            >
              <Link to="/contributions" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentContributions.map((contrib) => (
              <div
                key={contrib.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                    contrib.status === "approved" &&
                      "bg-success/10 text-success",
                    contrib.status === "pending" && "bg-warning/10 text-warning"
                  )}
                >
                  {contrib.status === "approved" && (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  {contrib.status === "pending" && <Clock className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate group-hover:text-primary transition-colors">
                    {contrib.projectName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {contrib.type}
                  </div>
                  {contrib.status === "approved" && (
                    <div className="text-xs text-success mt-1 font-medium">
                      +{contrib.tokensAwarded.toLocaleString()} $PBUILD
                    </div>
                  )}
                </div>
                <Badge
                  variant={
                    contrib.status === "approved" ? "default" : "secondary"
                  }
                  className={cn(
                    "shrink-0 capitalize",
                    contrib.status === "approved" &&
                      "bg-success/10 text-success border-success/20",
                    contrib.status === "pending" &&
                      "bg-warning/10 text-warning border-warning/20"
                  )}
                >
                  {contrib.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Quests */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-warning" />
              <CardTitle className="text-lg">Active Quests</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-primary"
            >
              <Link to="/quests" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{quest.title}</div>
                  <Badge
                    variant="outline"
                    className="text-xs bg-primary/5 text-primary border-primary/20"
                  >
                    +{quest.pointsReward} pts
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {quest.description}
                </div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={(quest.progress / quest.maxProgress) * 100}
                    className="h-2 flex-1"
                  />
                  <span className="text-xs text-muted-foreground font-mono">
                    {quest.progress}/{quest.maxProgress}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}