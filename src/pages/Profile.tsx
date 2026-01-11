// pages/Profile.tsx - Updated with API Integration & Latest Types
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useContributionsStore } from "@/store/contributionStore";
import { motion } from "framer-motion";
import { UserStats, addressesMatch } from "@/types";

// Import modular components
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ActivityHeatmap } from "@/components/profile/ActivityHeatmap";
import { ContributionsList } from "@/components/profile/ContributionsList";
import { AchievementsBadges } from "@/components/profile/AchievementsBadges";

const Profile = () => {
  const { address } = useParams<{ address: string }>();
  const { user: authUser, stats: authStats, loading: authLoading, fetchUserStats } = useAuthStore();
  const { 
    contributions, 
    loading: contributionsLoading, 
    fetchContributions 
  } = useContributionsStore();

  // Fetch data on mount
  useEffect(() => {
    fetchUserStats();
    fetchContributions();
  }, [fetchUserStats, fetchContributions]);

  // Determine which user we're viewing
  // If no address param, show current user's profile
  // If address param, we would fetch that user's data (TODO: implement user lookup)
  const user = authUser;
  const isOwnProfile = !address || (authUser && addressesMatch(authUser.wallet_address, address));

  // Loading state
  if (authLoading) {
    return (
      <div className="space-y-8 pb-8">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  // User not found
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24"
      >
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 font-display">Profile Not Found</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {!authUser 
              ? "Please connect your wallet to view your profile."
              : "The profile you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild>
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Filter contributions for this user
  const userContributions = contributions.filter(
    (c) => addressesMatch(c.wallet_address || "", user.wallet_address)
  );

  // Stats for ProfileStats component
  const profileStats: UserStats = {
    totalPBUILD: authStats?.totalPBUILD || user.total_tokens || 0,
    contributions: userContributions.length,
    rank: authStats?.rank || user.global_rank || 0,
    totalPoints: authStats?.totalPoints || user.points_earned || 0,
  };

  // Mock achievements count (TODO: implement actual achievements)
  const achievementsCount = 8;

  return (
    <div className="space-y-8 pb-8">
      {/* Back Button (only for other users' profiles) */}
      {!isOwnProfile && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/leaderboard">
              <ArrowLeft className="w-4 h-4" />
              Back to Leaderboard
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Profile Header */}
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />

      {/* Stats Grid */}
      <ProfileStats stats={profileStats} />

      {/* Activity Heatmap */}
      <ActivityHeatmap />

      {/* Tabs: Contributions & Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="contributions" className="gap-2">
              Contributions
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {userContributions.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              Achievements
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {achievementsCount}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Contributions Tab */}
          <TabsContent value="contributions" className="mt-6">
            {contributionsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <ContributionsList
                contributions={userContributions}
                isOwnProfile={isOwnProfile}
              />
            )}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-6">
            <AchievementsBadges />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;