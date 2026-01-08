// pages/SkillBadges.tsx - View and mint skill badge NFTs
import { useState } from "react";
import {
  Award,
  Trophy,
  Star,
  Lock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type BadgeLevel = "bronze" | "silver" | "gold" | "platinum";

interface SkillBadge {
  id: string;
  skill: string;
  level: BadgeLevel;
  contributionCount: number;
  requiredContributions: number;
  averageQuality: number;
  requiredQuality: number;
  earned: boolean;
  tokenId?: number;
}

const badgeLevelColors = {
  bronze: {
    gradient: "from-amber-600 to-amber-800",
    text: "text-amber-600",
    bg: "bg-amber-600/10",
    border: "border-amber-600/20",
  },
  silver: {
    gradient: "from-gray-400 to-gray-600",
    text: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/20",
  },
  gold: {
    gradient: "from-yellow-400 to-yellow-600",
    text: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  platinum: {
    gradient: "from-purple-400 to-purple-600",
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
};

const badgeRequirements = {
  bronze: { contributions: 10, quality: 70 },
  silver: { contributions: 50, quality: 80 },
  gold: { contributions: 100, quality: 90 },
  platinum: { contributions: 200, quality: 95 },
};

export default function SkillBadges() {
  const [mintingBadge, setMintingBadge] = useState<string | null>(null);

  // Mock badges data
  const badges: SkillBadge[] = [
    {
      id: "1",
      skill: "Solidity",
      level: "gold",
      contributionCount: 125,
      requiredContributions: 100,
      averageQuality: 92,
      requiredQuality: 90,
      earned: true,
      tokenId: 1001,
    },
    {
      id: "2",
      skill: "React",
      level: "silver",
      contributionCount: 75,
      requiredContributions: 50,
      averageQuality: 85,
      requiredQuality: 80,
      earned: true,
      tokenId: 1002,
    },
    {
      id: "3",
      skill: "DeFi",
      level: "gold",
      contributionCount: 95,
      requiredContributions: 100,
      averageQuality: 91,
      requiredQuality: 90,
      earned: false,
    },
    {
      id: "4",
      skill: "TypeScript",
      level: "bronze",
      contributionCount: 15,
      requiredContributions: 10,
      averageQuality: 78,
      requiredQuality: 70,
      earned: true,
      tokenId: 1003,
    },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const availableBadges = badges.filter((b) => !b.earned);

  const handleMintBadge = async (badge: SkillBadge) => {
    setMintingBadge(badge.id);
    // Simulate minting
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(`${badge.skill} ${badge.level.toUpperCase()} badge minted!`);
    setMintingBadge(null);
  };

  const renderBadgeCard = (badge: SkillBadge) => {
    const colors = badgeLevelColors[badge.level];
    const canMint =
      !badge.earned &&
      badge.contributionCount >= badge.requiredContributions &&
      badge.averageQuality >= badge.requiredQuality;
    const progressPercent =
      (badge.contributionCount / badge.requiredContributions) * 100;

    return (
      <Card
        key={badge.id}
        className={cn(
          "relative overflow-hidden border-2 transition-all duration-300",
          badge.earned
            ? "border-primary/30 hover:border-primary/50 hover:shadow-xl"
            : "border-border/50 hover:border-border"
        )}
      >
        {/* Gradient overlay for earned badges */}
        {badge.earned && (
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-br opacity-10",
              colors.gradient
            )}
          />
        )}

        <CardContent className="relative p-6">
          {/* Badge Icon */}
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "relative h-32 w-32 rounded-2xl flex items-center justify-center",
                badge.earned
                  ? cn("bg-linear-to-br shadow-xl", colors.gradient)
                  : "bg-muted/50 border-2 border-dashed border-border"
              )}
            >
              {badge.earned ? (
                <Award className="h-16 w-16 text-white" />
              ) : (
                <Lock className="h-16 w-16 text-muted-foreground/50" />
              )}
              {badge.earned && (
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-success flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Badge Info */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-1">{badge.skill}</h3>
            <Badge
              variant="outline"
              className={cn(colors.bg, colors.text, colors.border, "uppercase")}
            >
              {badge.level}
            </Badge>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Contributions</span>
                <span className="font-mono font-semibold">
                  {badge.contributionCount}/{badge.requiredContributions}
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Avg Quality</span>
                <span
                  className={cn(
                    "font-mono font-semibold",
                    badge.averageQuality >= badge.requiredQuality
                      ? "text-success"
                      : "text-muted-foreground"
                  )}
                >
                  {badge.averageQuality}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Required: {badge.requiredQuality}%
              </div>
            </div>
          </div>

          {/* Actions */}
          {badge.earned ? (
            <div className="space-y-2">
              <Button variant="outline" className="w-full gap-2" size="sm" asChild>
                <a
                  href={`https://testnets.opensea.io/assets/sepolia/${badge.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on OpenSea
                </a>
              </Button>
              <div className="text-xs text-center text-muted-foreground font-mono">
                Token #{badge.tokenId}
              </div>
            </div>
          ) : canMint ? (
            <Button
              className="w-full gap-2"
              onClick={() => handleMintBadge(badge)}
              disabled={mintingBadge === badge.id}
            >
              {mintingBadge === badge.id ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Minting...
                </>
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  Mint Badge
                </>
              )}
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Keep building to unlock
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-display">Skill Badges</h1>
          <p className="text-muted-foreground">
            Earn NFT badges to showcase your expertise in different skills
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-primary/5 text-primary border-primary/20"
          >
            <Trophy className="w-3 h-3 mr-1" />
            {earnedBadges.length} Earned
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-4 gap-4">
        {(["bronze", "silver", "gold", "platinum"] as BadgeLevel[]).map(
          (level) => {
            const count = earnedBadges.filter((b) => b.level === level).length;
            const colors = badgeLevelColors[level];
            return (
              <Card key={level}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        colors.bg
                      )}
                    >
                      <Award className={cn("h-5 w-5", colors.text)} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {level}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Badge Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Badge Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-4 gap-4">
            {Object.entries(badgeRequirements).map(([level, req]) => (
              <div
                key={level}
                className="p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="font-semibold mb-2 capitalize">{level}</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• {req.contributions}+ contributions</div>
                  <div>• {req.quality}%+ avg quality</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges Tabs */}
      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="earned">
            Earned ({earnedBadges.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available ({availableBadges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-6">
          {earnedBadges.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedBadges.map((badge) => renderBadgeCard(badge))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Badges Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start building in your favorite skills to earn your first badge!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableBadges.map((badge) => renderBadgeCard(badge))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}