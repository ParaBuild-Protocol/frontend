import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Coins, Package, ArrowUpDown } from "lucide-react";
import { mockRewards, currentUserStats } from "@/data/mockData";
import { RewardCategory } from "@/types";

const categoryLabels: Record<RewardCategory, string> = {
  merch: "🎽 Merch",
  tickets: "🎟️ Tickets",
  tools: "🛠️ Tools",
  nft: "🖼️ NFT",
  other: "✨ Other",
};

const Rewards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("cost-low");

  const userBalance = currentUserStats.totalPBUILD;

  const filteredRewards = mockRewards
    .filter((reward) => {
      const matchesSearch =
        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || reward.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "cost-low":
          return a.costPBUILD - b.costPBUILD;
        case "cost-high":
          return b.costPBUILD - a.costPBUILD;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">Rewards</h1>
          <p className="text-muted-foreground">
            Redeem your $PBUILD tokens for exclusive rewards
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Coins className="w-5 h-5 text-primary" />
          <span className="font-mono font-semibold">
            {userBalance.toLocaleString()} $PBUILD
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="merch">Merch</SelectItem>
                <SelectItem value="tickets">Tickets</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="nft">NFTs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background border-border">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost-low">Cost: Low to High</SelectItem>
                <SelectItem value="cost-high">Cost: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      {filteredRewards.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No rewards found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => {
            const canAfford = userBalance >= reward.costPBUILD;
            const isSoldOut = reward.stock === 0;

            return (
              <Card
                key={reward.id}
                className={`bg-card border-border overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
                  !canAfford || isSoldOut ? "opacity-70" : ""
                }`}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={reward.imageUrl}
                    alt={reward.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      {categoryLabels[reward.category]}
                    </Badge>
                    {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
                    {canAfford && !isSoldOut && (
                      <Badge className="bg-success/80 text-success-foreground backdrop-blur-sm">
                        Can Afford
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {reward.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {reward.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-primary font-mono font-semibold">
                        <Coins className="w-4 h-4" />
                        {reward.costPBUILD.toLocaleString()} $PBUILD
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ≈ ${reward.costUsd.toFixed(2)} USD
                      </div>
                    </div>
                    {reward.stock > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {reward.stock} left
                        </div>
                        <div className="text-xs text-muted-foreground">
                          of {reward.maxStock}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    asChild
                    className="w-full"
                    variant={canAfford && !isSoldOut ? "default" : "secondary"}
                    disabled={isSoldOut}
                  >
                    <Link to={`/rewards/${reward.id}`}>
                      {isSoldOut
                        ? "Sold Out"
                        : canAfford
                        ? "View & Redeem"
                        : "View Details"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rewards;
