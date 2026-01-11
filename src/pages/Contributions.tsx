// pages/ContributionsUpdated.tsx - Professional Contributions with API Integration
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, FileText } from "lucide-react";
import { useContributionsStore } from "@/store/contributionStore";
// import { ContributionStatus, ContributionType } from "@/types";
import { motion } from "framer-motion";

// Import modular components
import { ContributionCard } from "@/components/contributions/ContributionCard";
import { ContributionFilters } from "@/components/contributions/ContributionFilters";
import { ContributionStatsGrid } from "@/components/contributions/ContributionStats";

const Contributions = () => {
  const {
    contributions,
    loading,
    error,
    statusFilter,
    typeFilter,
    searchQuery,
    setStatusFilter,
    setTypeFilter,
    setSearchQuery,
    fetchContributions,
    getFilteredContributions,
    getStats,
  } = useContributionsStore();

  // Fetch contributions on mount
  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const filteredContributions = getFilteredContributions();
  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-display">Contributions</h1>
          <p className="text-muted-foreground">
            Track and manage your contributions
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
          <Link to="/contributions/new">
            <Plus className="w-4 h-4" />
            New Contribution
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ContributionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ContributionStatsGrid stats={stats} loading={loading} />
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="py-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => fetchContributions()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Contributions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {loading ? (
          // Loading State
          <>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : filteredContributions.length === 0 ? (
          // Empty State
          <Card className="bg-card border-border border-dashed">
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery || statusFilter !== "all"
                  ? "No contributions found"
                  : "No contributions yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Start building your onchain reputation by submitting your first contribution"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Button asChild>
                  <Link to="/contributions/new">
                    Submit your first contribution
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          // Contributions List
          filteredContributions.map((contribution, i) => (
            <ContributionCard
              key={contribution._id}
              contribution={contribution}
              delay={i * 0.05}
            />
          ))
        )}
      </motion.div>

      {/* Pagination Placeholder */}
      {!loading && filteredContributions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-4"
        >
          <p className="text-sm text-muted-foreground">
            Showing {filteredContributions.length} of {contributions.length}{" "}
            contributions
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Contributions;
