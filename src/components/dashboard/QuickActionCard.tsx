// components/dashboard/QuickActionCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface QuickActionCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  delay?: number;
}

export const QuickActionCard = ({
  label,
  description,
  icon: Icon,
  href,
  gradient,
  delay = 0,
}: QuickActionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Link to={href}>
        <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden hover:shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div
              className={cn(
                "h-14 w-14 rounded-xl flex items-center justify-center bg-linear-to-br shrink-0 shadow-lg group-hover:scale-110 transition-transform",
                gradient
              )}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {label}
              </div>
              <div className="text-sm text-muted-foreground">
                {description}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
