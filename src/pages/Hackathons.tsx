import { useState } from "react";
import {
  Calendar,
  ExternalLink,
  MapPin,
  Trophy,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  participants: number;
  status: "upcoming" | "live" | "ended";
  tags: string[];
  image: string;
  url: string;
}

const mockHackathons: Hackathon[] = [
  {
    id: "1",
    name: "ETHGlobal London 2024",
    organizer: "ETHGlobal",
    description:
      "The largest Ethereum hackathon in Europe. Build the future of Web3 with 1500+ hackers.",
    location: "London, UK",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    prizePool: "$500,000",
    participants: 1500,
    status: "upcoming",
    tags: ["Ethereum", "DeFi", "NFT"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    url: "https://ethglobal.com/events/london2024",
  },
  {
    id: "2",
    name: "Solana Hyperdrive",
    organizer: "Solana Foundation",
    description:
      "Global online hackathon to build on Solana. Win prizes and get funded.",
    location: "Online",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    prizePool: "$1,000,000",
    participants: 5000,
    status: "live",
    tags: ["Solana", "Infrastructure", "Gaming"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
    url: "https://solana.com/hyperdrive",
  },
  {
    id: "3",
    name: "Chainlink Constellation",
    organizer: "Chainlink Labs",
    description:
      "Build with oracles, CCIP, and automation. Shape the future of hybrid smart contracts.",
    location: "Online",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    prizePool: "$350,000",
    participants: 2500,
    status: "ended",
    tags: ["Oracles", "Cross-chain", "DeFi"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
    url: "https://chain.link/hackathon",
  },
];

const statusConfig = {
  upcoming: {
    color: "bg-accent/10 text-accent border-accent/20",
    label: "Upcoming",
  },
  live: {
    color: "bg-success/10 text-success border-success/20",
    label: "Live Now",
  },
  ended: {
    color: "bg-muted text-muted-foreground border-border",
    label: "Ended",
  },
};

export default function Hackathons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredHackathons = mockHackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || hackathon.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hackathons</h1>
          <p className="text-muted-foreground mt-1">
            Discover and participate in Web3 hackathons to earn $PBUILD tokens
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
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">$1.85M</p>
              <p className="text-sm text-muted-foreground">Total Prize Pool</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-accent/10 p-3">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">9,000+</p>
              <p className="text-sm text-muted-foreground">Active Hackers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-success/10 p-3">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search hackathons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:max-w-xs"
        />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Hackathon Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHackathons.map((hackathon) => (
          <Card
            key={hackathon.id}
            className="group overflow-hidden hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={hackathon.image}
                alt={hackathon.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Badge
                className={`absolute top-3 right-3 ${
                  statusConfig[hackathon.status].color
                }`}
              >
                {statusConfig[hackathon.status].label}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {hackathon.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {hackathon.organizer}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {hackathon.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {hackathon.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {hackathon.startDate} - {hackathon.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" />
                  <span className="font-semibold text-warning">
                    {hackathon.prizePool}
                  </span>
                </div>
              </div>

              <Button className="w-full gap-2" asChild>
                <a
                  href={hackathon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHackathons.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No hackathons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
