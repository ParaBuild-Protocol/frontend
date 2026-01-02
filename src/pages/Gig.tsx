import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Briefcase,
  Code,
  Award,
  Trophy,
  Star,
  ExternalLink,
  Download,
  Share2,
  CheckCircle,
  TrendingUp,
  Zap,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useAuth } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import { currentUser, currentUserStats } from "@/data/mockData";

export default function GigPage() {
  // const { user, stats } = useAuth();
  const user = currentUser;
  const stats = currentUserStats;
  // Mock user gig data (in production, this would come from API/database)
  const userGig = {
    tagline: "Full-Stack Web3 Developer | Smart Contract Specialist",
    bio: "Passionate blockchain developer with 3+ years of experience building DeFi protocols and NFT platforms. Winner of 5+ hackathons including ETHGlobal London 2024. Specialized in Solidity, React, and full-stack Web3 development. I love building innovative solutions that push the boundaries of what's possible with blockchain technology.",
    location: "San Francisco, CA",
    email: "developer@example.com",
    availability: "Available for hire",
    hourlyRate: "$100-150/hr",
    yearsExperience: "3+ years",
    projectsCompleted: 42,
    rating: 4.9,
    reviews: 23,
    responseTime: "Within 2 hours",
    skills: [
      { name: "Solidity", level: 95, category: "blockchain" },
      { name: "React", level: 90, category: "frontend" },
      { name: "Node.js", level: 85, category: "backend" },
      { name: "TypeScript", level: 88, category: "language" },
      { name: "Smart Contracts", level: 92, category: "blockchain" },
      { name: "Web3.js", level: 87, category: "blockchain" },
      { name: "Hardhat", level: 90, category: "tools" },
      { name: "GraphQL", level: 82, category: "backend" },
      { name: "Python", level: 78, category: "language" },
      { name: "Rust", level: 75, category: "language" },
      { name: "Next.js", level: 88, category: "frontend" },
      { name: "Tailwind CSS", level: 92, category: "frontend" },
    ],
    experience: [
      {
        title: "Senior Smart Contract Developer",
        company: "DeFi Protocol Inc",
        period: "Jan 2023 - Present",
        description:
          "Lead development of AMM protocols and governance systems. Built and audited smart contracts handling $10M+ in TVL. Implemented automated testing and security best practices.",
        achievements: [
          "Increased protocol TVL by 300%",
          "Reduced gas costs by 40%",
          "Zero security incidents",
        ],
      },
      {
        title: "Blockchain Developer",
        company: "Web3 Startup",
        period: "Mar 2021 - Dec 2022",
        description:
          "Built NFT marketplace and staking mechanisms. Developed frontend with React and integrated Web3 wallets. Created subgraphs for efficient data querying.",
        achievements: [
          "Launched 3 successful NFT drops",
          "10K+ active users",
          "Featured on CoinDesk",
        ],
      },
      {
        title: "Junior Developer",
        company: "Tech Company",
        period: "Jun 2020 - Feb 2021",
        description:
          "Started career in traditional web development before transitioning to Web3. Built full-stack applications using React, Node.js, and PostgreSQL.",
        achievements: [
          "Shipped 5 major features",
          "Mentored 2 junior developers",
        ],
      },
    ],
    achievements: [
      {
        icon: Trophy,
        label: "5x Hackathon Winner",
        color: "text-amber-500",
        description: "ETHGlobal, DoraHacks",
      },
      {
        icon: Award,
        label: "Top 100 Contributor",
        color: "text-purple-500",
        description: "ParaBuild Platform",
      },
      {
        icon: Code,
        label: "50+ Smart Contracts",
        color: "text-blue-500",
        description: "Deployed & Audited",
      },
      {
        icon: Star,
        label: "4.9★ Rating",
        color: "text-yellow-500",
        description: "Based on 23 reviews",
      },
      {
        icon: CheckCircle,
        label: "Verified Developer",
        color: "text-green-500",
        description: "Identity confirmed",
      },
      {
        icon: TrendingUp,
        label: "$2M+ TVL",
        color: "text-cyan-500",
        description: "Protocols built",
      },
    ],
    socials: {
      github: "github.com/username",
      twitter: "twitter.com/username",
      linkedin: "linkedin.com/in/username",
      website: "portfolio.dev",
    },
    portfolio: [
      {
        name: "DeFi Vault Protocol",
        description:
          "Yield optimization protocol with advanced strategies and automated rebalancing. Built with Solidity, React, and Subgraph.",
        tech: ["Solidity", "React", "Subgraph", "Hardhat"],
        metrics: "$2M TVL • 1,000+ Users",
        link: "#",
        image: "🏦",
      },
      {
        name: "NFT Marketplace",
        description:
          "Cross-chain NFT trading platform with IPFS storage and lazy minting. Supports Ethereum, Polygon, and Arbitrum.",
        tech: ["Solidity", "Next.js", "IPFS", "The Graph"],
        metrics: "5,000+ NFTs • $500K Volume",
        link: "#",
        image: "🎨",
      },
      {
        name: "DAO Governance Platform",
        description:
          "Decentralized governance system with proposal creation, voting, and execution. Includes token-weighted voting.",
        tech: ["Solidity", "React", "Ethers.js", "TypeScript"],
        metrics: "500+ Members • 100+ Proposals",
        link: "#",
        image: "🗳️",
      },
      {
        name: "Staking Protocol",
        description:
          "Flexible staking protocol with multiple pools and reward tiers. Supports single and LP token staking.",
        tech: ["Solidity", "Vue.js", "Web3.js"],
        metrics: "$1M Staked • APY 15-25%",
        link: "#",
        image: "💎",
      },
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        role: "CTO at DeFi Startup",
        avatar: "SC",
        rating: 5,
        date: "2 weeks ago",
        text: "Exceptional developer! Built our entire smart contract infrastructure. Professional, responsive, and delivered beyond expectations.",
      },
      {
        name: "Mike Johnson",
        role: "Founder at NFT Platform",
        avatar: "MJ",
        rating: 5,
        date: "1 month ago",
        text: "Highly skilled in both frontend and smart contracts. Great communication and delivered on time. Will definitely work with again!",
      },
      {
        name: "Alex Rodriguez",
        role: "Product Manager",
        avatar: "AR",
        rating: 4,
        date: "2 months ago",
        text: "Very knowledgeable about Web3 ecosystem. Helped us make important architectural decisions. Minor delays but quality work.",
      },
    ],
    certifications: [
      {
        name: "Certified Blockchain Developer",
        issuer: "Blockchain Council",
        year: "2023",
      },
      { name: "Smart Contract Security", issuer: "OpenZeppelin", year: "2022" },
      { name: "AWS Certified Developer", issuer: "Amazon", year: "2021" },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Professional" },
      { name: "Mandarin", level: "Basic" },
    ],
  };

  const getSkillColor = (category: string) => {
    const colors = {
      blockchain: "from-purple-500 to-pink-500",
      frontend: "from-blue-500 to-cyan-500",
      backend: "from-green-500 to-emerald-500",
      language: "from-orange-500 to-red-500",
      tools: "from-yellow-500 to-amber-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="space-y-8 animate-fade-up pb-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-mono">Gig</h1>
          <p className="text-muted-foreground">
            Update and share your Gig with others
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Resume
          </Button>
          <Button className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </div>

      {/* Hero Card */}
      <Card className="border-border/50 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 p-8 md:p-12 border-b border-border/50">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

          <div className="relative flex flex-col lg:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl font-bold text-primary-foreground shadow-2xl">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-display font-bold">
                    {user?.username}
                  </h1>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground mb-4">
                  {userGig.tagline}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{userGig.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{userGig.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-green-500 font-medium">
                      {userGig.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{userGig.yearsExperience} experience</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {userGig.hourlyRate}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Hourly Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {userGig.projectsCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Projects Completed
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-2xl font-bold">
                    {userGig.rating}
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userGig.reviews} Reviews
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {userGig.responseTime}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Response Time
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://${userGig.socials.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={`https://${userGig.socials.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://${userGig.socials.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`https://${userGig.socials.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0 flex flex-col gap-3">
              <Button size="lg" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {userGig.achievements.map((achievement, i) => (
          <Card
            key={i}
            className="border-border/50 hover:border-primary/30 transition-all group"
          >
            <CardContent className="p-5 text-center">
              <achievement.icon
                className={cn("h-8 w-8 mx-auto mb-3", achievement.color)}
              />
              <div className="font-semibold text-sm mb-1">
                {achievement.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {userGig.bio}
              </p>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Featured Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userGig.portfolio.map((project, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{project.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {project.name}
                        </h4>
                        <a
                          href={project.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {project.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {userGig.experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-8 pb-6 border-l-2 border-border last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-card" />
                  <div className="mb-2">
                    <h4 className="font-semibold text-lg">{exp.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {exp.company}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exp.description}
                  </p>
                  <div className="space-y-1">
                    {exp.achievements.map((achievement, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Client Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userGig.testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-500 fill-yellow-500"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {testimonial.date}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userGig.skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r transition-all duration-500",
                        getSkillColor(skill.category)
                      )}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userGig.certifications.map((cert, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/30">
                  <div className="font-medium text-sm mb-1">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-5 w-5 text-primary" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userGig.languages.map((lang, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{lang.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {lang.level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Platform Stats */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-primary" />
                Platform Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total $PBUILD
                </span>
                <span className="font-mono font-bold text-primary">
                  {stats?.totalPBUILD.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Global Rank
                </span>
                <span className="font-semibold">#{stats?.rank}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Contributions
                </span>
                <span className="font-semibold">
                  {stats?.contributionsCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Points</span>
                <span className="font-semibold">
                  {stats?.totalPoints.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
