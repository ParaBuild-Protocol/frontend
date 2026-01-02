import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  FileCheck,
  Gift,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Github,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  mockContributions,
  mockUsers,
  mockRewards,
  currentUser,
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/context/AuthContext";

const Admin = () => {
  // const { user } = useAuth();
  const user = currentUser;
  const { toast } = useToast();
  const [contributions, setContributions] = useState(mockContributions);
  const [selectedContribution, setSelectedContribution] = useState<
    (typeof contributions)[0] | null
  >(null);
  const [reviewNotes, setReviewNotes] = useState("");

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="w-16 h-16 text-warning mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">
          You don't have permission to view this page.
        </p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const pendingContributions = contributions.filter(
    (c) => c.status === "pending"
  );
  const approvedCount = contributions.filter(
    (c) => c.status === "approved"
  ).length;
  const rejectedCount = contributions.filter(
    (c) => c.status === "rejected"
  ).length;

  const handleApprove = (id: string) => {
    setContributions((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "approved" as const,
              reviewedAt: new Date(),
              tokensAwarded: 500,
            }
          : c
      )
    );
    setSelectedContribution(null);
    toast({
      title: "Contribution Approved! ✅",
      description: "Tokens have been allocated to the user.",
    });
  };

  const handleReject = (id: string) => {
    setContributions((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "rejected" as const, reviewedAt: new Date() }
          : c
      )
    );
    setSelectedContribution(null);
    toast({
      title: "Contribution Rejected",
      description: "The user has been notified.",
    });
  };

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-mono">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage contributions, rewards, and users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">
                  {mockUsers.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">
                  {pendingContributions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending Review
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">
                  {approvedCount}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">
                  {mockRewards.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Rewards
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="pending" className="relative">
            Pending Review
            {pendingContributions.length > 0 && (
              <Badge className="ml-2 bg-warning text-warning-foreground">
                {pendingContributions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Contributions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Pending Contributions */}
        <TabsContent value="pending" className="space-y-4">
          {pendingContributions.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-muted-foreground">
                  No pending contributions to review.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingContributions.map((contribution) => {
              const contributor = getUser(contribution.userId);

              return (
                <Card key={contribution.id} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={contributor?.avatar} />
                          <AvatarFallback>
                            {contributor?.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contributor?.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              contribution.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {contribution.projectName}
                          </h3>
                          <Badge variant="outline">
                            {contribution.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {contribution.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <a
                            href={contribution.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Proof
                          </a>
                          {contribution.githubUrl && (
                            <a
                              href={contribution.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedContribution(contribution)
                              }
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Review Contribution</DialogTitle>
                              <DialogDescription>
                                {contribution.projectName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  Description
                                </p>
                                <p className="text-muted-foreground">
                                  {contribution.description}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  Review Notes (Optional)
                                </p>
                                <Textarea
                                  value={reviewNotes}
                                  onChange={(e) =>
                                    setReviewNotes(e.target.value)
                                  }
                                  placeholder="Add notes for the contributor..."
                                  className="bg-background border-border"
                                />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => handleReject(contribution.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                              <Button
                                className="flex-1 bg-success hover:bg-success/90"
                                onClick={() => handleApprove(contribution.id)}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-success"
                          onClick={() => handleApprove(contribution.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => handleReject(contribution.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* All Contributions */}
        <TabsContent value="all" className="space-y-4">
          {contributions.map((contribution) => {
            const contributor = getUser(contribution.userId);

            return (
              <Card key={contribution.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor?.avatar} />
                        <AvatarFallback>
                          {contributor?.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {contribution.projectName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contributor?.username}
                        </p>
                      </div>
                    </div>
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
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-4">
          {mockUsers.map((user) => (
            <Card key={user.id} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.username}</p>
                        {user.isAdmin && (
                          <Badge className="bg-primary/20 text-primary">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {user.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold">
                      {(user.tokenBalance || 0).toLocaleString()} $PBUILD
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rank #{user.rank || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Rewards */}
        <TabsContent value="rewards" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {mockRewards.map((reward) => (
              <Card key={reward.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {reward.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary font-mono">
                          {reward.costPBUILD} $PBUILD
                        </span>
                        {reward.stock > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {reward.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
