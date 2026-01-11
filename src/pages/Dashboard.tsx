// pages/DashboardUpdated.tsx - Professional Dashboard with API Integration
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  FileText,
  Trophy,
  ArrowRight,
  Plus,
  Gift,
  Target,
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { useContributionsStore } from "@/store/contributionStore";
import { cn, formatBalance } from "@/lib/utils";
import { motion } from "framer-motion";
import { getUserDisplayName, ContributionStatus } from "@/types";

// Import modular components
import { DashboardStatsCard } from "@/components/dashboard/DashboardStatsCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { RecentContributionItem } from "@/components/dashboard/RecentContributionItem";

export default function Dashboard() {
  const { user, stats, loading: authLoading, fetchUserStats } = useAuthStore();
  const {
    contributions,
    loading: contributionsLoading,
    fetchContributions,
  } = useContributionsStore();

  // Fetch data on mount
  useEffect(() => {
    fetchUserStats();
    fetchContributions();
  }, [fetchUserStats, fetchContributions]);
  console.log("contributions", contributions);
  // Get recent contributions (last 5)
  const recentContributions = contributions?.slice(0, 5);

  // Calculate contribution stats
  const contributionStats = {
    total: contributions.length,
    approved: contributions.filter(
      (c) => c.status === ContributionStatus.APPROVED
    ).length,
    pending: contributions.filter(
      (c) => c.status === ContributionStatus.PENDING
    ).length,
    totalTokens: contributions.reduce((sum, c) => sum + c.tokens_won, 0),
  };

  // Mock data for quests (TODO: Replace with actual API)
  const activeQuests = [
    {
      id: 1,
      title: "First Attestation",
      description: "Submit 3 verified contributions",
      progress: Math.min(contributionStats.approved, 3),
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

  // Gig preview (TODO: Replace with actual user gig data)
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

  const displayName = getUserDisplayName(user);

  const statCards = [
    {
      label: "Total $PBUILD",
      value: formatBalance(stats?.totalPBUILD || 0),
      icon: Coins,
      color: "primary" as const,
      trend: {
        value: "+2,500 this week",
        direction: "up" as const,
      },
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      label: "Contributions",
      value: contributionStats.total.toString(),
      icon: FileText,
      color: "accent" as const,
      trend: {
        value: `${contributionStats.pending} pending`,
        direction: "neutral" as const,
      },
      bgGradient: "from-accent/20 to-accent/5",
    },
    {
      label: "Attestations",
      value: "0",
      icon: Shield,
      color: "success" as const,
      trend: {
        value: `${contributionStats.approved} verified`,
        direction: "up" as const,
      },
      bgGradient: "from-success/20 to-success/5",
    },
    {
      label: "Global Rank",
      value: `#${stats?.rank || "-"}`,
      icon: Trophy,
      color: "warning" as const,
      trend: {
        value: "Top 5%",
        direction: "up" as const,
      },
      bgGradient: "from-warning/20 to-warning/5",
    },
  ];

  const quickActions = [
    {
      label: "Submit Contribution",
      description: "Log your latest work",
      icon: Plus,
      href: "/contributions/new",
      gradient: "from-primary to-primary/70",
    },
    {
      label: "Browse Rewards",
      description: "Redeem your tokens",
      icon: Gift,
      href: "/rewards",
      gradient: "from-accent to-accent/70",
    },
    {
      label: "Active Quests",
      description: "Earn bonus points",
      icon: Target,
      href: "/quests",
      gradient: "from-success to-success/70",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-accent/5 p-8 md:p-10"
      >
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
                {displayName}
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
                {authLoading ? (
                  <Skeleton className="h-10 w-32" />
                ) : (
                  // Use the formatter here; default to 0 if stats is missing
                  formatBalance(stats?.totalPBUILD || 0)
                )}
              </div>
              <div className="text-xs text-primary font-medium">
                $PBUILD Tokens
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {authLoading || contributionsLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <Skeleton className="h-11 w-11 rounded-xl mb-4" />
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          statCards.map((stat, i) => (
            <DashboardStatsCard key={i} {...stat} delay={i * 0.1} />
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {quickActions.map((action, i) => (
          <QuickActionCard key={i} {...action} delay={i * 0.1} />
        ))}
      </div>

      {/* Gig Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
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
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                    {user?.username?.charAt(0).toUpperCase() ||
                      user?.wallet_address?.slice(2, 4).toUpperCase() ||
                      "B"}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {displayName}
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
      </motion.div>

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
            {contributionsLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/30">
                    <Skeleton className="h-10 w-10 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </>
            ) : recentContributions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="mb-4">No contributions yet</p>
                <Button asChild size="sm">
                  <Link to="/contributions/new">Submit your first</Link>
                </Button>
              </div>
            ) : (
              recentContributions.map((contribution, i) => (
                <RecentContributionItem
                  key={contribution._id}
                  contribution={contribution}
                  delay={i * 0.05}
                />
              ))
            )}
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
            {activeQuests.map((quest, i) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
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
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
