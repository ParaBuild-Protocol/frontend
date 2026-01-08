// pages/Attestations.tsx - View and manage EAS attestations
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileCheck,
  Shield,
  ExternalLink,
  Share2,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Attestations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock attestations data
  const attestations = [
    {
      id: "0x1234567890abcdef",
      skillProven: "Solidity Expert",
      verifier: "ParaBuild Verifier",
      verifierAddress: "0xabcd...ef12",
      skills: ["Solidity", "Smart Contracts", "Security"],
      qualityScore: 95,
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      type: "skill",
      status: "verified",
    },
    {
      id: "0xabcdef1234567890",
      skillProven: "React Developer",
      verifier: "Community Validator",
      verifierAddress: "0x1234...5678",
      skills: ["React", "TypeScript", "Web3"],
      qualityScore: 88,
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      type: "skill",
      status: "verified",
    },
    {
      id: "0x567890abcdef1234",
      skillProven: "Hackathon Winner",
      verifier: "ETHGlobal",
      verifierAddress: "0x5678...9abc",
      skills: ["DeFi", "Protocol Design"],
      qualityScore: 92,
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      type: "achievement",
      status: "verified",
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-display">
            Your Attestations
          </h1>
          <p className="text-muted-foreground">
            View and manage your EAS attestations - your verifiable onchain credentials
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            <Shield className="w-3 h-3 mr-1" />
            {attestations.length} Verified
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{attestations.length}</div>
                <div className="text-sm text-muted-foreground">Total Attestations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {attestations.filter(a => a.status === "verified").length}
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(attestations.reduce((acc, a) => acc + a.qualityScore, 0) / attestations.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Quality</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search attestations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="skill">Skills</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="endorsement">Endorsements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attestations List */}
      <div className="grid gap-4">
        {attestations.map((attestation) => (
          <Card
            key={attestation.id}
            className="border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="h-16 w-16 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {attestation.skillProven}
                        </h3>
                        <Badge className="bg-success/10 text-success border-success/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Attested by:</span>
                        <span className="font-medium text-foreground">
                          {attestation.verifier}
                        </span>
                        <span className="font-mono text-xs">
                          ({attestation.verifierAddress})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                      Skills Proven
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {attestation.skills.map((skill, i) => (
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

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Quality Score</div>
                      <div className="font-bold text-lg">{attestation.qualityScore}/100</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Timestamp</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(attestation.timestamp)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">UID</div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span>{attestation.id.slice(0, 10)}...</span>
                        <button
                          onClick={() => copyToClipboard(attestation.id, attestation.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedId === attestation.id ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={`https://sepolia.easscan.org/attestation/view/${attestation.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on EAS
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        toast.success("Share link copied!");
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Verify Onchain
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {attestations.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Shield className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Attestations Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start building your reputation by submitting contributions and earning verified attestations.
            </p>
            <Button asChild>
              <Link to="/contributions/submit">
                <FileCheck className="h-4 w-4 mr-2" />
                Submit Your First Contribution
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}