import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { createWeb3Modal, wagmiAdapter } from "./lib/web3/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import LandingPage from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Contributions from "./pages/Contributions";
import NewContribution from "./pages/NewContribution";
import Rewards from "./pages/Rewards";
import RewardDetail from "./pages/RewardDetail";
import Quests from "./pages/Quests";
import Hackathons from "./pages/Hackathons";
import OpenSource from "./pages/OpenSource";
import Leaderboard from "./pages/Leaderboard";
import Discord from "./pages/Discord";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import GigPage from "./pages/Gig";
import SkillBadges from "./pages/SkillBadges";
import Attestations from "./pages/Attestations";
import BugBountyDetail from "./pages/BugBountyDetail";
import BugBounties from "./pages/BugBounties";

const queryClient = new QueryClient();

// Initialize Web3Modal
createWeb3Modal();

const App = () => (
  <ThemeProvider>   
  <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Protected Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gig" element={<GigPage />} />
              <Route path="/contributions" element={<Contributions />} />
              <Route path="/contributions/new" element={<NewContribution />} />
              <Route path="/attestations" element={<Attestations />} />
              <Route path="/badges" element={<SkillBadges />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/rewards/:id" element={<RewardDetail />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/hackathons" element={<Hackathons />} />
              <Route path="/open-source" element={<OpenSource />} />
              <Route path="/bug-bounties" element={<BugBounties />} />
              <Route path="/bug-bounties/:id" element={<BugBountyDetail />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/discord" element={<Discord />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </WagmiProvider>
  </ThemeProvider>
);

export default App;
