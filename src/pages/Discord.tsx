import { ExternalLink, MessageCircle, Users, Zap, Heart, BookOpen, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Channel {
  name: string;
  description: string;
  icon: React.ReactNode;
  memberCount?: number;
}

const channels: Channel[] = [
  {
    name: '#general',
    description: 'Chat with the community about anything Web3 related',
    icon: <MessageCircle className="h-5 w-5" />,
    memberCount: 12500,
  },
  {
    name: '#introductions',
    description: 'Introduce yourself and meet other builders',
    icon: <Users className="h-5 w-5" />,
    memberCount: 8900,
  },
  {
    name: '#help',
    description: 'Get help with your projects and questions',
    icon: <HelpCircle className="h-5 w-5" />,
    memberCount: 6200,
  },
  {
    name: '#showcase',
    description: 'Share your projects and get feedback',
    icon: <Zap className="h-5 w-5" />,
    memberCount: 4500,
  },
  {
    name: '#resources',
    description: 'Curated learning resources and tutorials',
    icon: <BookOpen className="h-5 w-5" />,
    memberCount: 7800,
  },
  {
    name: '#collaborations',
    description: 'Find teammates for hackathons and projects',
    icon: <Heart className="h-5 w-5" />,
    memberCount: 3200,
  },
];

const stats = [
  { label: 'Members', value: '25,000+' },
  { label: 'Online Now', value: '2,500+' },
  { label: 'Messages/Day', value: '5,000+' },
];

export default function Discord() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#5865F2]/10 mb-6">
          <svg className="h-8 w-8 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Join Our Discord</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Connect with 25,000+ Web3 builders, get help, and find collaborators
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center bg-[#5865F2]/5 border-[#5865F2]/20">
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-[#5865F2]">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Join Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8"
          asChild
        >
          <a href="https://discord.gg/learnweb3" target="_blank" rel="noopener noreferrer">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord Server
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Channels Preview */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Popular Channels</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.name} className="group hover:border-[#5865F2]/50 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#5865F2]/10 p-2.5 text-[#5865F2]">
                    {channel.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-[#5865F2] transition-colors">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {channel.description}
                    </p>
                    {channel.memberCount && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{channel.memberCount.toLocaleString()} members</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <Card className="bg-gradient-to-br from-[#5865F2]/5 to-[#5865F2]/10 border-[#5865F2]/20">
        <CardHeader>
          <CardTitle className="text-center">Why Join Our Community?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Network</h4>
              <p className="text-sm text-muted-foreground">Connect with top Web3 builders</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 mb-3">
                <HelpCircle className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold">Get Help</h4>
              <p className="text-sm text-muted-foreground">Quick answers from experts</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-success/10 mb-3">
                <Zap className="h-6 w-6 text-success" />
              </div>
              <h4 className="font-semibold">Early Access</h4>
              <p className="text-sm text-muted-foreground">Be first to know about opportunities</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-warning/10 mb-3">
                <Heart className="h-6 w-6 text-warning" />
              </div>
              <h4 className="font-semibold">Collaborate</h4>
              <p className="text-sm text-muted-foreground">Find teammates for projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
