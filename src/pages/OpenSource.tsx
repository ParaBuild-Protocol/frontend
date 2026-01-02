import { useState } from "react";
import {
  GitPullRequest,
  Star,
  GitFork,
  ExternalLink,
  Code,
  Filter,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  openIssues: number;
  bountyRange: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  url: string;
}

const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "uniswap-v4-core",
    owner: "Uniswap",
    description:
      "Core smart contracts for Uniswap V4. Build hooks and customize AMM logic.",
    stars: 2500,
    forks: 890,
    language: "Solidity",
    topics: ["DeFi", "AMM", "Hooks"],
    openIssues: 45,
    bountyRange: "500-5,000 $PBUILD",
    difficulty: "advanced",
    url: "https://github.com/Uniswap/v4-core",
  },
  {
    id: "2",
    name: "wagmi",
    owner: "wevm",
    description:
      "React Hooks for Ethereum. Type-safe, composable, and feature-rich.",
    stars: 5200,
    forks: 1200,
    language: "TypeScript",
    topics: ["React", "Ethereum", "Hooks"],
    openIssues: 28,
    bountyRange: "200-2,000 $PBUILD",
    difficulty: "intermediate",
    url: "https://github.com/wevm/wagmi",
  },
  {
    id: "3",
    name: "foundry",
    owner: "foundry-rs",
    description:
      "Foundry is a blazing fast, portable and modular toolkit for Ethereum development.",
    stars: 7800,
    forks: 1500,
    language: "Rust",
    topics: ["Tooling", "Testing", "Deployment"],
    openIssues: 120,
    bountyRange: "300-3,000 $PBUILD",
    difficulty: "intermediate",
    url: "https://github.com/foundry-rs/foundry",
  },
  {
    id: "4",
    name: "scaffold-eth-2",
    owner: "scaffold-eth",
    description:
      "Open source forkable Ethereum dev stack. Perfect for learning and prototyping.",
    stars: 3200,
    forks: 2100,
    language: "TypeScript",
    topics: ["Education", "Starter", "Full-stack"],
    openIssues: 15,
    bountyRange: "100-1,000 $PBUILD",
    difficulty: "beginner",
    url: "https://github.com/scaffold-eth/scaffold-eth-2",
  },
];

const difficultyConfig = {
  beginner: {
    color: "bg-success/10 text-success border-success/20",
    label: "Beginner Friendly",
  },
  intermediate: {
    color: "bg-warning/10 text-warning border-warning/20",
    label: "Intermediate",
  },
  advanced: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Advanced",
  },
};

const languageColors: Record<string, string> = {
  Solidity: "bg-purple-500",
  TypeScript: "bg-blue-500",
  Rust: "bg-orange-500",
  JavaScript: "bg-yellow-500",
};

export default function OpenSource() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const filteredRepos = mockRepositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || repo.difficulty === difficultyFilter;
    const matchesLanguage =
      languageFilter === "all" || repo.language === languageFilter;
    return matchesSearch && matchesDifficulty && matchesLanguage;
  });

  const languages = [...new Set(mockRepositories.map((r) => r.language))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Open Source</h1>
          <p className="text-muted-foreground mt-1">
            Contribute to Web3 projects and earn $PBUILD tokens for your PRs
          </p>
        </div>
        <Button className="gap-2" asChild>
          <a
            href="https://learnweb3.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Zap className="h-4 w-4" />
            Learn Web3
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-primary/10 p-3">
              <GitPullRequest className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Merged PRs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-accent/10 p-3">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-success/10 p-3">
              <Star className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">250K</p>
              <p className="text-sm text-muted-foreground">
                $PBUILD Distributed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:max-w-xs"
        />
        <div className="flex gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-[140px]">
              <Code className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-4">
        {filteredRepos.map((repo) => (
          <Card
            key={repo.id}
            className="group hover:border-primary/50 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          languageColors[repo.language] || "bg-muted"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">
                        {repo.language}
                      </span>
                    </div>
                    <Badge className={difficultyConfig[repo.difficulty].color}>
                      {difficultyConfig[repo.difficulty].label}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {repo.owner}/{repo.name}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {repo.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitPullRequest className="h-4 w-4 text-success" />
                      <span>{repo.openIssues} open issues</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Bounty Range
                    </p>
                    <p className="font-semibold text-primary">
                      {repo.bountyRange}
                    </p>
                  </div>
                  <Button className="gap-2" asChild>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Repo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No repositories found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
