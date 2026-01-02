import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Clock, CheckCircle2, Star, Zap, Gift, Trophy } from "lucide-react";
import { mockQuests } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { QuestType } from "@/types";

const typeIcons: Record<string, React.ReactNode> = {
  daily: <Clock className="w-4 h-4" />,
  weekly: <Target className="w-4 h-4" />,
  onetime: <Star className="w-4 h-4" />,
  one_time: <Star className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  daily: "bg-accent/20 text-accent border-accent/30",
  weekly: "bg-primary/20 text-primary border-primary/30",
  onetime: "bg-warning/20 text-warning border-warning/30",
  one_time: "bg-warning/20 text-warning border-warning/30",
};

const Quests = () => {
  const { toast } = useToast();
  const [quests, setQuests] = useState(mockQuests);

  const dailyQuests = quests.filter(q => q.type === "daily");
  const weeklyQuests = quests.filter(q => q.type === "weekly");
  const onetimeQuests = quests.filter(q => q.type === "onetime" || q.type === "one_time");

  const totalPoints = quests.reduce((acc, q) => acc + (q.isCompleted ? q.pointsReward : 0), 0);
  const completedCount = quests.filter(q => q.isCompleted).length;

  const handleClaimQuest = (questId: string) => {
    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, isCompleted: true, progress: q.maxProgress } : q
    ));
    
    const quest = quests.find(q => q.id === questId);
    toast({
      title: "Quest Completed! 🎉",
      description: `You earned ${quest?.pointsReward} points!`,
    });
  };

  const QuestCard = ({ quest }: { quest: typeof quests[0] }) => {
    const progressPercent = (quest.progress / quest.maxProgress) * 100;
    const canClaim = quest.progress >= quest.maxProgress && !quest.isCompleted;

    return (
      <Card className={`bg-card border-border transition-all ${quest.isCompleted ? "opacity-60" : "hover:border-primary/50"}`}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={typeColors[quest.type]}>
                  {typeIcons[quest.type]}
                  <span className="ml-1 capitalize">{quest.type}</span>
                </Badge>
                {quest.isCompleted && (
                  <Badge className="bg-success/20 text-success border-success/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{quest.title}</h3>
                <p className="text-sm text-muted-foreground">{quest.description}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono">{quest.progress} / {quest.maxProgress}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-1 text-primary font-mono font-semibold">
                <Zap className="w-4 h-4" />
                {quest.pointsReward} pts
              </div>
              {canClaim && (
                <Button size="sm" onClick={() => handleClaimQuest(quest.id)}>
                  <Gift className="w-4 h-4 mr-1" />
                  Claim
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-mono">Quests</h1>
        <p className="text-muted-foreground">Complete quests to earn bonus points</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">{completedCount}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">{quests.length - completedCount}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Zap className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Clock className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono">{dailyQuests.filter(q => !q.isCompleted).length}</div>
            <div className="text-sm text-muted-foreground">Daily Left</div>
          </CardContent>
        </Card>
      </div>

      {/* Quest Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All ({quests.length})</TabsTrigger>
          <TabsTrigger value="daily">Daily ({dailyQuests.length})</TabsTrigger>
          <TabsTrigger value="weekly">Weekly ({weeklyQuests.length})</TabsTrigger>
          <TabsTrigger value="onetime">One-Time ({onetimeQuests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {quests.map(quest => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          {dailyQuests.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No daily quests available</p>
              </CardContent>
            </Card>
          ) : (
            dailyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {weeklyQuests.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No weekly quests available</p>
              </CardContent>
            </Card>
          ) : (
            weeklyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))
          )}
        </TabsContent>

        <TabsContent value="onetime" className="space-y-4">
          {onetimeQuests.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No one-time quests available</p>
              </CardContent>
            </Card>
          ) : (
            onetimeQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quests;
