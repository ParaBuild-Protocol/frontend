import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContributionType } from "@/types";

const contributionTypes: {
  value: ContributionType;
  label: string;
  description: string;
}[] = [
  {
    value: "hackathon_win",
    label: "🏆 Hackathon Win",
    description: "Won a prize at a hackathon",
  },
  {
    value: "hackathon_participation",
    label: "🎯 Hackathon Participation",
    description: "Participated in a hackathon",
  },
  {
    value: "bounty",
    label: "💰 Bounty Completion",
    description: "Completed a bounty task",
  },
  {
    value: "open_source",
    label: "🔧 Open Source PR",
    description: "Merged pull request to open source project",
  },
  {
    value: "content",
    label: "📝 Content Creation",
    description: "Created tutorial, article, or video",
  },
  {
    value: "community",
    label: "👥 Community Event",
    description: "Organized or spoke at an event",
  },
];

const NewContribution = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "" as ContributionType | "",
    projectName: "",
    description: "",
    proofUrl: "",
    githubUrl: "",
    placement: "",
    prize: "",
  });

  const selectedType = contributionTypes.find((t) => t.value === formData.type);
  const showPlacement =
    formData.type === "hackathon_win" ||
    formData.type === "hackathon_participation";
  const showPrize =
    formData.type === "hackathon_win" || formData.type === "bounty";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.projectName ||
      !formData.description ||
      !formData.proofUrl
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Contribution submitted! 🎉",
      description:
        "Your contribution is now pending review. We'll notify you once it's approved.",
    });

    navigate("/contributions");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-mono">Submit Contribution</h1>
          <p className="text-muted-foreground">
            Share your Web3 work and earn $PBUILD tokens
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Contribution Details</CardTitle>
          <CardDescription>
            Provide details about your contribution. All submissions are
            reviewed before approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Contribution Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as ContributionType })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select contribution type" />
                </SelectTrigger>
                <SelectContent>
                  {contributionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div>{type.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {type.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedType && (
                <p className="text-sm text-muted-foreground">
                  {selectedType.description}
                </p>
              )}
            </div>

            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                placeholder="e.g., ETH Global Istanbul - DeFi Protocol"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what you built, the technologies used, and the impact of your contribution..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-background border-border min-h-[120px]"
              />
            </div>

            {/* Proof URL */}
            <div className="space-y-2">
              <Label htmlFor="proofUrl">Proof URL *</Label>
              <Input
                id="proofUrl"
                type="url"
                placeholder="https://devfolio.co/projects/..."
                value={formData.proofUrl}
                onChange={(e) =>
                  setFormData({ ...formData, proofUrl: e.target.value })
                }
                className="bg-background border-border"
              />
              <p className="text-sm text-muted-foreground">
                Link to hackathon submission, bounty platform, or other proof of
                contribution
              </p>
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository (Optional)</Label>
              <Input
                id="githubUrl"
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>

            {/* Conditional: Placement */}
            {showPlacement && (
              <div className="space-y-2">
                <Label htmlFor="placement">Placement / Position</Label>
                <Input
                  id="placement"
                  placeholder="e.g., 1st Place, Top 10, Finalist"
                  value={formData.placement}
                  onChange={(e) =>
                    setFormData({ ...formData, placement: e.target.value })
                  }
                  className="bg-background border-border"
                />
              </div>
            )}

            {/* Conditional: Prize */}
            {showPrize && (
              <div className="space-y-2">
                <Label htmlFor="prize">Prize Amount (if any)</Label>
                <Input
                  id="prize"
                  placeholder="e.g., $5,000 USDC"
                  value={formData.prize}
                  onChange={(e) =>
                    setFormData({ ...formData, prize: e.target.value })
                  }
                  className="bg-background border-border"
                />
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Contribution
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">💡 Submission Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Provide clear, verifiable proof of your contribution</li>
            <li>• Include all relevant links (GitHub, demo, documentation)</li>
            <li>• Describe the technical details and your specific role</li>
            <li>• Review typically takes 24-48 hours</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewContribution;
