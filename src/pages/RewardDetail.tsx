import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Coins,
  Package,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { mockRewards, currentUserStats } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { RewardCategory } from "@/types";

const categoryLabels: Record<RewardCategory, string> = {
  merch: "🎽 Merchandise",
  tickets: "🎟️ Event Ticket",
  tools: "🛠️ Developer Tool",
  nft: "🖼️ Digital Collectible",
  other: "✨ Other",
};

const RewardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    email: "",
  });

  const reward = mockRewards.find((r) => r.id === id);

  if (!reward) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Reward Not Found</h2>
        <p className="text-muted-foreground mb-4">
          This reward doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/rewards")}>Back to Rewards</Button>
      </div>
    );
  }

  const userBalance = currentUserStats.totalPBUILD;
  const canAfford = userBalance >= reward.costPBUILD;
  const isSoldOut = reward.stock === 0;
  const needsSize =
    reward.category === "merch" && reward.sizes && reward.sizes.length > 0;
  const needsShipping = reward.category === "merch";

  const handleRedeem = async () => {
    if (needsSize && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    if (
      needsShipping &&
      (!shippingInfo.name ||
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.country ||
        !shippingInfo.email)
    ) {
      toast({
        title: "Please fill in all shipping details",
        variant: "destructive",
      });
      return;
    }

    setIsRedeeming(true);

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsRedeeming(false);
    setIsRedeemOpen(false);

    toast({
      title: "Reward Redeemed! 🎉",
      description: `You've successfully redeemed ${reward.name}. ${
        needsShipping
          ? "We'll ship it to you soon!"
          : "Check your email for details."
      }`,
    });

    navigate("/rewards");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rewards
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-border">
            <div className="aspect-square relative">
              <img
                src={reward.imageUrl}
                alt={reward.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm"
                >
                  {categoryLabels[reward.category]}
                </Badge>
                {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
              </div>
            </div>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-mono mb-2">{reward.name}</h1>
            <p className="text-muted-foreground text-lg">
              {reward.description}
            </p>
          </div>

          {/* Price */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-2xl font-mono font-bold text-primary">
                    <Coins className="w-6 h-6" />
                    {reward.costPBUILD.toLocaleString()} $PBUILD
                  </div>
                  <div className="text-muted-foreground">
                    ≈ ${reward.costUsd.toFixed(2)} USD
                  </div>
                </div>
                {reward.stock > 0 && (
                  <div className="text-right">
                    <div className="text-xl font-semibold">{reward.stock}</div>
                    <div className="text-sm text-muted-foreground">
                      of {reward.maxStock} remaining
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Your Balance */}
          <Card
            className={`border ${
              canAfford
                ? "border-success/50 bg-success/5"
                : "border-warning/50 bg-warning/5"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {canAfford ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  )}
                  <span>Your Balance</span>
                </div>
                <span className="font-mono font-semibold">
                  {userBalance.toLocaleString()} $PBUILD
                </span>
              </div>
              {!canAfford && (
                <p className="text-sm text-warning mt-2">
                  You need {(reward.costPBUILD - userBalance).toLocaleString()}{" "}
                  more $PBUILD to redeem this reward.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Size Selector */}
          {needsSize && (
            <div className="space-y-2">
              <Label>Select Size</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  {reward.sizes?.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Redeem Button */}
          <Dialog open={isRedeemOpen} onOpenChange={setIsRedeemOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full"
                disabled={!canAfford || isSoldOut}
              >
                {isSoldOut
                  ? "Sold Out"
                  : canAfford
                  ? "Redeem Now"
                  : "Insufficient Balance"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Redemption</DialogTitle>
                <DialogDescription>
                  You're about to redeem {reward.name} for{" "}
                  {reward.costPBUILD.toLocaleString()} $PBUILD.
                </DialogDescription>
              </DialogHeader>

              {needsShipping && (
                <div className="space-y-4 py-4">
                  <h4 className="font-medium">Shipping Information</h4>
                  <div className="grid gap-3">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            name: e.target.value,
                          })
                        }
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              postalCode: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            country: e.target.value,
                          })
                        }
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Card className="bg-destructive/10 border-destructive/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-destructive">
                        Token Burn Warning
                      </p>
                      <p className="text-muted-foreground">
                        {reward.costPBUILD.toLocaleString()} $PBUILD tokens will
                        be permanently burned from your wallet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsRedeemOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleRedeem}
                  disabled={isRedeeming}
                >
                  {isRedeeming ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Redemption"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RewardDetail;
