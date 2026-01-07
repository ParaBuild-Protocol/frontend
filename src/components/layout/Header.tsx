// components/layout/Header.tsx - Updated with Zustand
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  LogOut,
  Plus,
  Search,
  X,
  User,
  Settings,
  Sparkles,
  ChevronDown,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useDisconnect } from "@reown/appkit/react";

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export function Header({ onMenuClick, isMobile }: HeaderProps) {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  // Zustand stores
  const { user, stats, isAuthenticated, logout } = useAuthStore();
  const {
    searchOpen,
    searchQuery,
    toggleSearch,
    setSearchOpen,
    setSearchQuery,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
  } = useUIStore();

  const handleLogout = () => {
    disconnect();
    logout();
    navigate("/");
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Show loading state or guest UI if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 md:px-6">
        {isMobile && onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1" />
        <ThemeToggle />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 md:px-6">
      {/* Mobile Menu Button */}
      {isMobile && onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Search */}
      <div className="flex-1 flex items-center">
        {searchOpen ? (
          <div className="flex items-center gap-2 w-full max-w-md animate-fade-in">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contributions, rewards, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
                autoFocus
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={toggleSearch}
            className="text-muted-foreground hover:text-foreground gap-2 h-10 px-4 bg-muted/30 hover:bg-muted/50 border border-border/50"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Search...</span>
            <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Token Balance - Desktop */}
        {stats && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20">
            <Coins className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-semibold text-primary">
              {stats.totalPBUILD.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">$PBUILD</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={() => navigate("/contributions/new")}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Submit</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-muted/50"
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadNotificationsCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadNotificationsCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications yet
                </div>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          notification.type === "success" && "bg-success",
                          notification.type === "info" && "bg-accent",
                          notification.type === "warning" && "bg-warning",
                          notification.type === "error" && "bg-destructive"
                        )}
                      />
                      <span className="font-medium text-sm flex-1">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground pl-4">
                      {notification.message}
                    </span>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              <Sparkles className="h-4 w-4 mr-2" />
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 h-10 px-2 hover:bg-muted/50"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username || "User"}
                  className="h-8 w-8 rounded-full ring-2 ring-border"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold ring-2 ring-border">
                  {user.username?.[0]?.toUpperCase() ||
                    user.wallet_address.slice(2, 4).toUpperCase()}
                </div>
              )}
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user.username || formatAddress(user.wallet_address)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Rank #{stats?.rank || "-"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {user.username || "Anonymous"}
                </span>
                <span className="text-xs font-normal text-muted-foreground font-mono">
                  {formatAddress(user.wallet_address)}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate(`/profile/${user.username || user.wallet_address}`)
              }
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/profile/edit")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
