// components/profile/AchievementsBadges.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlockedAt?: Date;
  isLocked?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
  progress?: {
    current: number;
    total: number;
  };
}

interface AchievementsBadgesProps {
  achievements?: Achievement[];
}

const defaultAchievements: Achievement[] = [
  {
    id: "1",
    icon: "🚀",
    name: "Early Adopter",
    description: "Joined ParaBuild in the first month",
    unlockedAt: new Date("2024-01-15"),
    rarity: "rare",
  },
  {
    id: "2",
    icon: "🏆",
    name: "First Win",
    description: "Won your first hackathon",
    unlockedAt: new Date("2024-02-20"),
    rarity: "common",
  },
  {
    id: "3",
    icon: "💎",
    name: "Diamond Hands",
    description: "Hold 10,000+ $PBUILD tokens",
    unlockedAt: new Date("2024-03-10"),
    rarity: "epic",
  },
  {
    id: "4",
    icon: "🔥",
    name: "On Fire",
    description: "Maintain a 7-day contribution streak",
    unlockedAt: new Date("2024-04-05"),
    rarity: "rare",
  },
  {
    id: "5",
    icon: "⭐",
    name: "Rising Star",
    description: "Reach top 100 on the leaderboard",
    isLocked: true,
    rarity: "epic",
    progress: { current: 150, total: 100 },
  },
  {
    id: "6",
    icon: "👑",
    name: "Legend",
    description: "Complete 100 contributions",
    isLocked: true,
    rarity: "legendary",
    progress: { current: 45, total: 100 },
  },
  {
    id: "7",
    icon: "🎯",
    name: "Perfect Score",
    description: "Achieve 100% quality rating on 10 contributions",
    isLocked: true,
    rarity: "epic",
    progress: { current: 3, total: 10 },
  },
  {
    id: "8",
    icon: "🌟",
    name: "Community Leader",
    description: "Help verify 50 contributions",
    isLocked: true,
    rarity: "rare",
    progress: { current: 12, total: 50 },
  },
];

export const AchievementsBadges = ({ achievements = defaultAchievements }: AchievementsBadgesProps) => {
  const getRarityColor = (rarity: Achievement["rarity"]) => {
    const colors = {
      common: "from-gray-500 to-gray-600",
      rare: "from-blue-500 to-blue-600",
      epic: "from-purple-500 to-purple-600",
      legendary: "from-amber-500 to-amber-600",
    };
    return colors[rarity || "common"];
  };

  const getRarityBadge = (rarity: Achievement["rarity"]) => {
    const configs = {
      common: { label: "Common", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
      rare: { label: "Rare", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
      epic: { label: "Epic", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
      legendary: { label: "Legendary", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    };
    return configs[rarity || "common"];
  };

  const unlockedCount = achievements.filter((a) => !a.isLocked).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">Achievements</h3>
          <p className="text-sm text-muted-foreground">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
          <div className="text-xs text-muted-foreground">Completion</div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => {
          const rarityConfig = getRarityBadge(achievement.rarity);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={`border-border/50 transition-all ${
                  achievement.isLocked
                    ? "opacity-60 hover:opacity-80"
                    : "hover:border-primary/30 hover:shadow-lg hover:scale-105"
                } group relative overflow-hidden`}
              >
                {/* Rarity Gradient Background */}
                {!achievement.isLocked && (
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${getRarityColor(
                      achievement.rarity
                    )} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                )}

                <CardContent className="pt-6 pb-6 text-center relative">
                  {/* Icon */}
                  <div className="relative inline-block mb-3">
                    <div
                      className={`text-5xl transition-transform ${
                        achievement.isLocked ? "filter grayscale" : "group-hover:scale-110"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    {achievement.isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/90 rounded-full p-1.5">
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    {!achievement.isLocked && achievement.rarity === "legendary" && (
                      <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                    )}
                  </div>

                  {/* Rarity Badge */}
                  <Badge variant="outline" className={`mb-2 text-xs ${rarityConfig.color}`}>
                    {rarityConfig.label}
                  </Badge>

                  {/* Name */}
                  <h4 className="font-semibold mb-1">{achievement.name}</h4>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {achievement.description}
                  </p>

                  {/* Unlocked Date or Progress */}
                  {achievement.unlockedAt ? (
                    <div className="text-xs text-success flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>
                        Unlocked{" "}
                        {achievement.unlockedAt.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  ) : achievement.progress ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>
                          {achievement.progress.current}/{achievement.progress.total}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              (achievement.progress.current / achievement.progress.total) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Locked</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};