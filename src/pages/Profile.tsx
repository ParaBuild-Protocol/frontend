// pages/Profile.tsx - Professional Profile Page
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { mockUsers, mockContributions, currentUser, currentUserStats } from "@/data/mockData";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";

// Import new modular components
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ActivityHeatmap } from "@/components/profile/ActivityHeatmap";
import { ContributionsList } from "@/components/profile/ContributionsList";
import { AchievementsBadges } from "@/components/profile/AchievementsBadges";

const Profile = () => {
  const { address } = useParams();
  const { user: authUser } = useAuthStore();
  
  // Fallback to mock data if auth store is not populated
  const currentAuthUser = authUser || currentUser;

  // Find the profile user by wallet address (primary identifier)
  const user =
    address?.toLowerCase() === currentAuthUser.wallet_address?.toLowerCase()
      ? currentAuthUser
      : mockUsers.find((u) => u.wallet_address?.toLowerCase() === address?.toLowerCase());

  const isOwnProfile = currentAuthUser?.wallet_address?.toLowerCase() === user?.wallet_address?.toLowerCase();
  const stats = isOwnProfile ? currentUserStats : currentUserStats;
  console.log('authUser', authUser)
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
            The profile you're looking for doesn't exist or has been removed.
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

  // Get user contributions
  const userContributions = mockContributions.filter((c) => c.userId === user.id);
  const approvedContributions = userContributions.filter((c) => c.status === "approved");

  // Stats for ProfileStats component
  const profileStats = {
    totalPBUILD: stats?.totalPBUILD || 0,
    contributions: approvedContributions.length,
    rank: stats?.rank || 0,
    totalPoints: stats?.totalPoints || 0,
  };

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
                8
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Contributions Tab */}
          <TabsContent value="contributions" className="mt-6">
            <ContributionsList
              contributions={userContributions}
              isOwnProfile={isOwnProfile}
            />
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