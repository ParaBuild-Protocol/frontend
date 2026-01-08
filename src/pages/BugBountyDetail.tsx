// pages/BugBountyDetail.tsx - Individual bug bounty detail page
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bug,
  Coins,
  Clock,
  Users,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Award,
  Code,
  Github,
  Globe,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function BugBountyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock bounty data (in real app, fetch based on id)
  const bounty = {
    id: "1",
    title: "Smart Contract Reentrancy Vulnerability",
    protocol: "DeFi Protocol",
    protocolLogo: "🔷",
    description:
      "We are seeking security researchers to identify and report potential reentrancy vulnerabilities in our lending protocol smart contracts. Our protocol manages over $100M in TVL and security is our top priority.",
    longDescription: `
## Overview
Our DeFi lending protocol allows users to deposit collateral and borrow assets. We need security experts to thoroughly review our smart contracts for reentrancy vulnerabilities that could lead to fund loss.

## Scope
- Main lending pool contract
- Collateral manager
- Interest rate model
- Liquidation engine
- Price oracle integration

## Out of Scope
- Frontend vulnerabilities
- Off-chain infrastructure
- Social engineering attacks
    `,
    severity: "critical" as const,
    reward: {
      min: 50000,
      max: 100000,
    },
    status: "open" as const,
    participants: 12,
    submittedReports: 3,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    tags: ["Solidity", "Security", "DeFi"],
    requiredSkills: ["Solidity", "Security Auditing", "DeFi Protocols"],
    type: "smart-contract",
    requirements: [
      "Proof of concept demonstrating the vulnerability",
      "Clear steps to reproduce",
      "Impact assessment",
      "Suggested fix (optional but appreciated)",
    ],
    resources: [
      {
        name: "GitHub Repository",
        url: "https://github.com/protocol/contracts",
        icon: Github,
      },
      {
        name: "Documentation",
        url: "https://docs.protocol.xyz",
        icon: FileText,
      },
      {
        name: "Protocol Website",
        url: "https://protocol.xyz",
        icon: Globe,
      },
    ],
    timeline: {
      submission: 30,
      review: 7,
      resolution: 14,
    },
    paymentTerms:
      "Rewards are paid in USDC within 7 days of validation. Severity is determined by impact and exploitability.",
  };

  const handleSubmitReport = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success("Redirecting to submission form...");
      navigate(`/bug-bounties/${id}/submit`);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const severityConfig = {
    critical: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
      icon: AlertTriangle,
    },
    high: {
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      icon: AlertTriangle,
    },
  };

  const config = severityConfig[bounty.severity];
  const SeverityIcon = config.icon;

  const formatTimeRemaining = (date: Date) => {
    const days = Math.floor(
      (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const daysRemaining = formatTimeRemaining(bounty.deadline);
  const progressPercent = ((30 - daysRemaining) / 30) * 100;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => navigate("/bug-bounties")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bounties
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="h-16 w-16 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl shadow-lg">
              {bounty.protocolLogo}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold font-display">
                {bounty.title}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  config.bg,
                  config.text,
                  config.border,
                  "uppercase text-xs font-bold"
                )}
              >
                <SeverityIcon className="w-3 h-3 mr-1" />
                {bounty.severity}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{bounty.protocol}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="gap-2" onClick={handleSubmitReport} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" className="gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Coins className="h-6 w-6 text-warning" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Reward Range
                </div>
                <div className="text-xl font-bold font-mono text-warning">
                  ${bounty.reward.min.toLocaleString()}-$
                  {bounty.reward.max.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Active Hunters
                </div>
                <div className="text-xl font-bold">{bounty.participants}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Reports Submitted
                </div>
                <div className="text-xl font-bold">
                  {bounty.submittedReports}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Time Remaining
                </div>
                <div className="text-xl font-bold">{daysRemaining} days</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bounty Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Submission Phase ({bounty.timeline.submission} days)
                </span>
                <span className="font-mono font-semibold">
                  {daysRemaining} days left
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-semibold mb-1">1. Submission</div>
                <div className="text-muted-foreground">
                  {bounty.timeline.submission} days
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-semibold mb-1">2. Review</div>
                <div className="text-muted-foreground">
                  {bounty.timeline.review} days
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-semibold mb-1">3. Resolution</div>
                <div className="text-muted-foreground">
                  {bounty.timeline.resolution} days
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="description" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-primary" />
                Bounty Description
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg">{bounty.description}</p>
              <div className="whitespace-pre-wrap text-muted-foreground">
                {bounty.longDescription}
              </div>
            </CardContent>
          </Card>

          {/* Tags & Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Required Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {bounty.requiredSkills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/5 text-primary border-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {bounty.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Submission Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bounty.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{bounty.paymentTerms}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-accent" />
                Helpful Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bounty.resources.map((resource, i) => {
                  const ResourceIcon = resource.icon;
                  return (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <ResourceIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {resource.name}
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="border-primary/20 bg-linear-to-br from-primary/5 via-card to-accent/5">
        <CardContent className="p-8 text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Ready to Hunt?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Submit your security findings and earn up to $
            {bounty.reward.max.toLocaleString()} in rewards while building your
            reputation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2" onClick={handleSubmitReport}>
              <FileText className="h-4 w-4" />
              Submit Report
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://discord.gg/protocol" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4" />
                Join Discord
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}