import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trophy, Medal, Award, Coins, TrendingUp } from "lucide-react";
import {
  mockLeaderboard,
  currentUser,
  currentUserStats,
} from "@/data/mockData";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all-time");

  const filteredLeaderboard = mockLeaderboard.filter((entry) =>
    entry.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUserRank =
    mockLeaderboard.findIndex((e) => e.user.id === currentUser.id) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center font-mono font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-mono">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top contributors in the ParaBuild ecosystem
        </p>
      </div>

      {/* Your Rank Card */}
      <Card className="bg-primary/10 border-primary/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Your Rank</p>
                <p className="text-2xl font-bold font-mono">
                  #{currentUserRank || currentUserStats.rank}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-xl font-mono font-semibold">
                  {currentUserStats.totalPBUILD.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentUserStats.totalPoints.toLocaleString()} points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 0, 2].map((index) => {
          const entry = filteredLeaderboard[index];
          if (!entry) return null;
          const isFirst = index === 0;

          return (
            <Card
              key={entry.user.id}
              className={`${getRankStyle(entry.rank)} ${
                isFirst
                  ? "order-2 lg:-mt-4"
                  : index === 1
                  ? "order-1"
                  : "order-3"
              }`}
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-3">{getRankIcon(entry.rank)}</div>
                <Avatar
                  className={`mx-auto mb-3 ${
                    isFirst ? "h-16 w-16" : "h-12 w-12"
                  } border-2 border-primary`}
                >
                  <AvatarImage src={entry.user.avatar} />
                  <AvatarFallback>
                    {entry.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Link
                  to={`/profile/${entry.user.username}`}
                  className="font-semibold hover:text-primary transition-colors block truncate"
                >
                  {entry.user.username}
                </Link>
                <div className="flex items-center justify-center gap-1 mt-2 text-primary font-mono">
                  <Coins className="w-4 h-4" />
                  {entry.stats.totalPBUILD.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {entry.stats.totalPoints.toLocaleString()} pts
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filteredLeaderboard.slice(3).map((entry) => {
            const isCurrentUser = entry.user.id === currentUser.id;

            return (
              <div
                key={entry.user.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  isCurrentUser ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-8 text-center">{getRankIcon(entry.rank)}</div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.user.avatar} />
                  <AvatarFallback>
                    {entry.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/profile/${entry.user.username}`}
                    className="font-semibold hover:text-primary transition-colors block truncate"
                  >
                    {entry.user.username}
                    {isCurrentUser && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        You
                      </Badge>
                    )}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {entry.stats.contributionsCount} contributions
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary font-mono font-semibold">
                    <Coins className="w-4 h-4" />
                    {entry.stats.totalPBUILD.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {entry.stats.totalPoints.toLocaleString()} pts
                  </p>
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{Math.floor(Math.random() * 5) + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {filteredLeaderboard.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No users found matching "{searchQuery}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;
