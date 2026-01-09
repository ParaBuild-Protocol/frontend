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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code,
  MessageCircle,
  ChevronDown,
  User,
  Award,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mainNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/gig", label: "Gig Profile", icon: User },
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

const bottomNavItems = [
  { path: "/profile/edit", label: "Settings", icon: Settings },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
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

  const renderNavLink = (
    item: { path: string; label: string; icon: any },
    className?: string
  ) => {
    const isActive = isActiveLink(item.path);

    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isCollapsed && "justify-center px-2",
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
          className
        )}
      >
        <item.icon
          className={cn(
            "h-5 w-5 shrink-0 transition-colors",
            isActive && "text-primary"
          )}
        />
        {!isCollapsed && <span>{item.label}</span>}
        {!isCollapsed && isActive && (
          <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
        )}
      </Link>
    );
  };

  const renderCollapsibleGroup = (
    title: string,
    items: { path: string; label: string; icon: any }[],
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
  ) => {
    const hasActiveItem = items.some((item) => isActiveLink(item.path));

    if (isCollapsed) {
      return (
        <div className="space-y-1">
          {items.map((item) => renderNavLink(item))}
        </div>
      );
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-sidebar-accent/30",
            hasActiveItem
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 mt-1">
          {items.map((item) => renderNavLink(item))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-sidebar-border px-4",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <img
                src="/pb-logo.png"
                alt="ParaBuild Logo"
                className="w-full h-full object-contain transition-opacity duration-200"
              />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                ParaBuild
              </span>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={onToggle}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Token Balance Card */}
        {!isCollapsed && stats && (
          <div className="mx-3 mt-4 rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Your Balance
                </p>
                <p className="text-lg font-bold font-mono text-primary">
                  {stats.totalPBUILD?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-primary/10">
              <span className="text-muted-foreground">$PBUILD Tokens</span>
              <span className="text-primary font-semibold">
                Rank #{stats.rank || "-"}
              </span>
            </div>
          </div>
        )}

        {/* Collapsed Toggle */}
        {isCollapsed && (
          <button
            onClick={onToggle}
            className="mx-auto mt-4 rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {/* Main Nav */}
          <div className="space-y-1">
            {mainNavItems.map((item) => renderNavLink(item))}
          </div>

          {/* Opportunities */}
          <div className={cn("pt-4", isCollapsed && "pt-2")}>
            {renderCollapsibleGroup(
              "Opportunities",
              opportunityItems,
              opportunitiesOpen,
              setOpportunitiesOpen
            )}
          </div>

          {/* Community */}
          <div className={cn("pt-4", isCollapsed && "pt-2")}>
            {renderCollapsibleGroup(
              "Community",
              communityItems,
              communityOpen,
              setCommunityOpen
            )}
          </div>

          {/* Admin Link */}
          {user?.isAdmin && (
            <>
              <div className={cn("my-4", isCollapsed ? "mx-1" : "mx-2")}>
                <div className="h-px bg-sidebar-border" />
              </div>
              <Link
                to="/admin"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isCollapsed && "justify-center px-2",
                  location.pathname.startsWith("/admin")
                    ? "bg-destructive/10 text-destructive"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
              >
                <Shield
                  className={cn(
                    "h-5 w-5 shrink-0",
                    location.pathname.startsWith("/admin") && "text-destructive"
                  )}
                />
                {!isCollapsed && <span>Admin</span>}
              </Link>
            </>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {bottomNavItems.map((item) => renderNavLink(item))}

          {/* User Profile Link */}
          {user && !isCollapsed && (
            <Link
              to={`/profile/${user.wallet_address}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 mt-2 bg-sidebar-accent/30 hover:bg-sidebar-accent/50 transition-colors group"
            >
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white ring-2 ring-primary/20">
                {user.username?.charAt(0).toUpperCase() || user.wallet_address?.slice(2, 4).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {user.username || `${user.wallet_address?.slice(0, 6)}...${user.wallet_address?.slice(-4)}`}
                </p>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {user.wallet_address?.slice(0, 6)}...
                  {user.wallet_address?.slice(-4)}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}