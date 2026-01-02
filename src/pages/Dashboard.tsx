import { Link } from "react-router-dom";
import {
  Coins,
  FileText,
  Trophy,
  Star,
  ArrowRight,
  Plus,
  Gift,
  Sword,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  ChevronRight,
  User,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// import { useAuth } from '@/context/AuthContext';
import {
  mockContributions,
  mockQuests,
  mockActivity,
  contributionTypeLabels,
  currentUser,
  currentUserStats,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  // const { user, stats } = useAuth();
  const user = currentUser;
  const stats = currentUserStats;
  const recentContributions = mockContributions.slice(0, 3);
  const activeQuests = mockQuests.filter((q) => !q.isCompleted).slice(0, 3);

  // Mock user gig preview data
  const userGigPreview = {
    tagline: "Full-Stack Web3 Developer | Smart Contract Specialist",
    location: "San Francisco, CA",
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
      value: stats?.totalPBUILD.toLocaleString() || "0",
      icon: Coins,
      color: "primary",
      trend: "+2,500 this week",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      label: "Contributions",
      value: stats?.contributionsCount.toString() || "0",
      icon: FileText,
      color: "accent",
      trend: "+3 pending",
      bgGradient: "from-accent/20 to-accent/5",
    },
    {
      label: "Points Earned",
      value: stats?.totalPoints.toLocaleString() || "0",
      icon: Star,
      color: "warning",
      trend: "+5,000 this month",
      bgGradient: "from-warning/20 to-warning/5",
    },
    {
      label: "Global Rank",
      value: `#${stats?.rank || "-"}`,
      icon: Trophy,
      color: "success",
      trend: "Top 5%",
      bgGradient: "from-success/20 to-success/5",
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
      label: "View Quests",
      desc: "Earn bonus points",
      icon: Target,
      href: "/quests",
      color: "warning",
      gradient: "from-warning to-warning/70",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-8 md:p-10">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px]" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Welcome back
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Hey,{" "}
              <span className="text-gradient-primary">{user?.username}</span>!
              👋
            </h1>
            <p className="text-muted-foreground max-w-md">
              You're ranked{" "}
              <span className="text-primary font-semibold">#{stats?.rank}</span>{" "}
              globally. Keep building to climb the leaderboard!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-card/80 backdrop-blur border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">
                Your Balance
              </div>
              <div className="font-mono text-2xl md:text-3xl font-bold text-primary">
                {stats?.totalPBUILD.toLocaleString()}
              </div>
              <div className="text-xs text-primary">$PBUILD tokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card
            key={i}
            className="relative overflow-hidden card-hover border-border/50 hover:border-primary/30"
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50",
                stat.bgGradient
              )}
            />
            <CardContent className="relative p-5 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    `bg-${stat.color}/10`
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", `text-${stat.color}`)} />
                </div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span className="hidden sm:inline">{stat.trend}</span>
                </div>
              </div>
              <div className="font-mono text-2xl md:text-3xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {quickActions.map((action, i) => (
          <Link key={i} to={action.href}>
            <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div
                  className={cn(
                    "h-14 w-14 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0",
                    action.gradient
                  )}
                >
                  <action.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg">{action.label}</div>
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

      {/* YOUR GIG PREVIEW - MINIMAL */}
      <Card className="border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 group">
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Your Gig</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  Professional
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link to="/gig">
                  View Profile
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
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {user?.username}
                  </h3>
                  <p className="text-muted-foreground">
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
                  <div className="text-xs text-muted-foreground mb-2">
                    Top Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userGigPreview.topSkills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/5 text-primary border-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mini Achievements */}
                <div className="flex items-center gap-4">
                  {userGigPreview.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <achievement.icon
                        className={cn("h-4 w-4", achievement.color)}
                      />
                      <span className="text-muted-foreground">
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
                    contrib.status === "pending" &&
                      "bg-warning/10 text-warning",
                    contrib.status === "rejected" &&
                      "bg-destructive/10 text-destructive"
                  )}
                >
                  {contrib.status === "approved" && (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  {contrib.status === "pending" && (
                    <Clock className="h-5 w-5" />
                  )}
                  {contrib.status === "rejected" && (
                    <FileText className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate group-hover:text-primary transition-colors">
                    {contrib.projectName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {contributionTypeLabels[contrib.type]}
                  </div>
                  {contrib.status === "approved" && (
                    <div className="text-xs text-success mt-1">
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
                      "bg-warning/10 text-warning border-warning/20",
                    contrib.status === "rejected" &&
                      "bg-destructive/10 text-destructive border-destructive/20"
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

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivity.slice(0, 5).map((activity, i) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-muted/30",
                  i === 0 && "bg-muted/20"
                )}
              >
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                    activity.type === "contribution" &&
                      "bg-primary/10 text-primary",
                    activity.type === "reward" && "bg-accent/10 text-accent",
                    activity.type === "quest" && "bg-warning/10 text-warning",
                    activity.type === "points" && "bg-success/10 text-success"
                  )}
                >
                  {activity.type === "contribution" && (
                    <FileText className="h-5 w-5" />
                  )}
                  {activity.type === "reward" && <Gift className="h-5 w-5" />}
                  {activity.type === "quest" && (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  {activity.type === "points" && <Star className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {activity.description}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="h-3 w-3" />
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
