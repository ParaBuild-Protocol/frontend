import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { useAccount } from 'wagmi';
// import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  // const { isAuthenticated, isLoading } = useAuth();
  const { isConnected } = useAccount();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  // if () {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-background">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  //         <p className="text-muted-foreground">Connecting wallet...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      )}

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content */}
      <div
        className={cn(
          'flex flex-col transition-all duration-300',
          !isMobile && (isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64')
        )}
      >
        <Header
          onMenuClick={() => setIsMobileNavOpen(true)}
          isMobile={isMobile}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
