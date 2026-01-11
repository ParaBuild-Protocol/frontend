import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Gift,
  Target,
  Trophy,
  Settings,
  Shield,
  Coins,
  X,
  Sparkles,
  Code,
  MessageCircle,
  ChevronDown,
  User,
  Award,
  FileCheck,
} from "lucide-react";
import { cn, formatBalance } from "@/lib/utils";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/authStore";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/gig", label: "Gig", icon: User },
  { path: "/contributions", label: "Contributions", icon: FileText },
  { path: "/attestations", label: "Attestations", icon: FileCheck },
  { path: "/badges", label: "Skill Badges", icon: Award },
  { path: "/rewards", label: "Rewards", icon: Gift },
];

const opportunityItems = [
  { path: "/hackathons", label: "Hackathons", icon: Sparkles },
  { path: "/bug-bounties", label: "Bug Bounties", icon: Shield },
  { path: "/quests", label: "Quests", icon: Target },
  { path: "/open-source", label: "Open Source", icon: Code },
];

const communityItems = [
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/discord", label: "Discord", icon: MessageCircle },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation();
  const { user, stats } = useAuthStore();
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(true);
  const [communityOpen, setCommunityOpen] = useState(true);

  const isActiveLink = (path: string) => {
    return (
      location.pathname === path ||
      (path !== "/dashboard" && location.pathname.startsWith(path))
    );
  };

  const renderNavLink = (item: { path: string; label: string; icon: any }) => {
    const isActive = isActiveLink(item.path);

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
        )}
      >
        <item.icon
          className={cn("h-5 w-5 shrink-0", isActive && "text-primary")}
        />
        <span>{item.label}</span>
      </Link>
    );
  };

  const renderCollapsibleGroup = (
    title: string,
    items: { path: string; label: string; icon: any }[],
    isOpenState: boolean,
    setIsOpenState: (open: boolean) => void
  ) => {
    const hasActiveItem = items.some((item) => isActiveLink(item.path));

    return (
      <Collapsible open={isOpenState} onOpenChange={setIsOpenState}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            hasActiveItem
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpenState && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 mt-1">
          {items.map((item) => renderNavLink(item))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border animate-slide-in-left">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              onClick={onClose}
            >
              <div className="w-10 h-10">
                <img
                  src="/pb-logo.png"
                  alt="ParaBuild"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">ParaBuild</span>
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Token Balance */}
          {stats && (
            <div className="mx-3 mt-4 rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Your Balance</p>
                  <p className="text-lg font-bold font-mono text-primary">
                    {formatBalance(stats?.totalPBUILD || 0)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {/* Main Nav */}
            <div className="space-y-1">
              {mainNavItems.map((item) => renderNavLink(item))}
            </div>

            {/* Opportunities */}
            <div className="pt-4">
              {renderCollapsibleGroup(
                "Opportunities",
                opportunityItems,
                opportunitiesOpen,
                setOpportunitiesOpen
              )}
            </div>

            {/* Community */}
            <div className="pt-4">
              {renderCollapsibleGroup(
                "Community",
                communityItems,
                communityOpen,
                setCommunityOpen
              )}
            </div>

            {/* Admin */}
            {user?.isAdmin && (
              <>
                <div className="my-4 mx-2">
                  <div className="h-px bg-sidebar-border" />
                </div>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    location.pathname.startsWith("/admin")
                      ? "bg-destructive/10 text-destructive"
                      : "text-muted-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <Shield className="h-5 w-5 shrink-0" />
                  <span>Admin</span>
                </Link>
              </>
            )}
          </nav>

          {/* Bottom */}
          <div className="border-t border-sidebar-border p-3 space-y-2">
            <Link
              to="/profile/edit"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                location.pathname === "/profile/edit"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <Settings className="h-5 w-5 shrink-0" />
              <span>Settings</span>
            </Link>

            {user && (
              <Link
                to={`/profile/${user.wallet_address}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-sidebar-accent/30 hover:bg-sidebar-accent/50 transition-colors"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username || "User"}
                    className="h-8 w-8 rounded-full ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-semibold ring-2 ring-primary/20 text-sm">
                    {user.username?.charAt(0).toUpperCase() || user.wallet_address?.slice(2, 4).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.username || `${user.wallet_address?.slice(0, 6)}...${user.wallet_address?.slice(-4)}`}
                  </p>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {user.wallet_address?.slice(0, 6)}...{user.wallet_address?.slice(-4)}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}