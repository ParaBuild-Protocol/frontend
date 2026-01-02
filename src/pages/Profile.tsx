import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Github,
  Twitter,
  Globe,
  Coins,
  Trophy,
  Target,
  Gift,
  Calendar,
  Copy,
  CheckCircle2,
} from "lucide-react";
import {
  mockUsers,
  mockContributions,
  currentUser,
  currentUserStats,
} from "@/data/mockData";
// import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { username } = useParams();
  // const { user: authUser, stats: authStats } = useAuth();
  const authUser = currentUser;
  const authStats = currentUserStats;
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const user =
    username === currentUser.username
      ? currentUser
      : mockUsers.find((u) => u.username === username);
  const isOwnProfile = authUser?.id === user?.id;
  const stats = isOwnProfile ? authStats : currentUserStats;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-4">
          This profile doesn't exist.
        </p>
        <Button asChild>
          <Link to="/leaderboard">View Leaderboard</Link>
        </Button>
      </div>
    );
  }

  const userContributions = mockContributions.filter(
    (c) => c.userId === user.id
  );
  const approvedContributions = userContributions.filter(
    (c) => c.status === "approved"
  );

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.address);
    setCopied(true);
    toast({ title: "Address copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  // Generate activity heatmap data (mock)
  const generateHeatmapData = () => {
    const data = [];
    for (let i = 0; i < 365; i++) {
      data.push(Math.floor(Math.random() * 5));
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30" />
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold font-mono">
                  {user.username}
                </h1>
                {user.isAdmin && (
                  <Badge className="bg-primary/20 text-primary">Admin</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <button
                  onClick={copyWalletAddress}
                  className="flex items-center gap-1 hover:text-foreground transition-colors font-mono text-sm"
                >
                  {truncateAddress(user.address)}
                  {copied ? (
                    <CheckCircle2 className="w-3 h-3 text-success" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
            {isOwnProfile && (
              <Button asChild variant="outline">
                <Link to="/profile/edit">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            )}
          </div>

          {user.bio && <p className="mt-4 text-muted-foreground">{user.bio}</p>}

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4">
            {user.socialLinks?.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined{" "}
              {user.joinedAt.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">
              {(stats?.totalPBUILD || 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">$PBUILD</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">
              {approvedContributions.length}
            </div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">
              #{stats?.rank || "-"}
            </div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Gift className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">
              {(stats?.totalPoints || 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Contribution Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 flex-wrap">
            {heatmapData.map((value, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  value === 0
                    ? "bg-muted"
                    : value === 1
                    ? "bg-primary/20"
                    : value === 2
                    ? "bg-primary/40"
                    : value === 3
                    ? "bg-primary/60"
                    : "bg-primary"
                }`}
                title={`${value} contributions`}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-primary/20" />
              <div className="w-3 h-3 rounded-sm bg-primary/40" />
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Contributions & Achievements */}
      <Tabs defaultValue="contributions">
        <TabsList className="bg-muted">
          <TabsTrigger value="contributions">
            Contributions ({userContributions.length})
          </TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="contributions" className="space-y-4 mt-4">
          {userContributions.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No contributions yet</p>
              </CardContent>
            </Card>
          ) : (
            userContributions.map((contribution) => (
              <Card key={contribution.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {contribution.projectName}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {contribution.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            contribution.status === "approved"
                              ? "border-success/50 text-success"
                              : contribution.status === "pending"
                              ? "border-warning/50 text-warning"
                              : "border-destructive/50 text-destructive"
                          }
                        >
                          {contribution.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {contribution.submittedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {contribution.tokensAwarded > 0 && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary font-mono">
                          <Coins className="w-4 h-4" />
                          {contribution.tokensAwarded.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🚀",
                name: "Early Adopter",
                desc: "Joined in first month",
              },
              { icon: "🏆", name: "First Win", desc: "Won first hackathon" },
              { icon: "💎", name: "Diamond Hands", desc: "Held 10K+ $PBUILD" },
              {
                icon: "🔥",
                name: "On Fire",
                desc: "7-day contribution streak",
              },
            ].map((badge, i) => (
              <Card key={i} className="bg-card border-border text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
