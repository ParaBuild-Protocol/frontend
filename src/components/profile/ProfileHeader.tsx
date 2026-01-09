// components/profile/ProfileHeader.tsx - Updated with centralized types
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Github,
  Twitter,
  Calendar,
  Copy,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, formatAddress, getUserDisplayName, getUserInitials, formatDate } from "@/types";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
}

export const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.wallet_address);
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Get display values using utility functions
  const displayName = getUserDisplayName(user);
  const avatarInitials = getUserInitials(user);

  const socialLinks = [
    {
      icon: Github,
      url: user.github_url,
      label: "GitHub",
      color: "text-foreground",
    },
    {
      icon: Twitter,
      url: user.twitter_url,
      label: "Twitter",
      color: "text-blue-500",
    },
    {
      icon: MessageCircle,
      url: user.discord_username
        ? `https://discord.com/users/${user.discord_username}`
        : undefined,
      label: "Discord",
      color: "text-indigo-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border/50 overflow-hidden">
        {/* Cover Image */}
        <div className="h-40 bg-linear-to-r from-primary/20 via-accent/10 to-primary/20 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>

        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-2 ring-primary/20">
                  <AvatarImage src={user.profile_picture} alt={displayName} />
                  <AvatarFallback className="text-3xl font-bold bg-linear-to-br from-primary to-accent text-primary-foreground">
                    {avatarInitials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Username & Address */}
              <div className="flex-1 sm:pb-2">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-3xl font-bold font-display">
                    {displayName}
                  </h1>
                  {user.role === "admin" && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Wallet Address */}
                <button
                  onClick={copyWalletAddress}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm group"
                  title="Click to copy address"
                >
                  <span>{formatAddress(user.wallet_address)}</span>
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 group-hover:text-primary transition-colors" />
                  )}
                </button>

                {/* Join Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined {formatDate(user.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {isOwnProfile && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/profile/edit">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <motion.p
              className="mt-6 text-muted-foreground leading-relaxed max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {user.bio}
            </motion.p>
          )}

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map(
              ({ icon: Icon, url, label, color }) =>
                url && (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-110 ${color}`}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};