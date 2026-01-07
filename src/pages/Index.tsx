import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Trophy,
  Gift,
  Users,
  Zap,
  Github,
  Twitter,
  ChevronRight,
  Wallet,
  Target,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { toast } from "sonner";
import { platformStats } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import { BrowserProvider } from "ethers";

const getThemeColors = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const isDark =
    document.documentElement.classList.contains("dark") ||
    rootStyles.getPropertyValue("--background").trim().split(" ")[2] < "50";

  if (isDark) {
    return {
      baseHue: 0,
      baseSaturation: 0,
      baseLightness: 70,
      particleOpacity: 0.4,
      gridOpacity: 0.15,
      glowOpacity: 0.2,
    };
  } else {
    return {
      baseHue: 0,
      baseSaturation: 0,
      baseLightness: 20,
      particleOpacity: 0.5,
      gridOpacity: 0.2,
      glowOpacity: 0.3,
    };
  }
};

const themeColors = getThemeColors();

class BifrostParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  path: number;

  constructor(canvas: HTMLCanvasElement) {
    const pathCount = 18;
    this.path = Math.floor(Math.random() * pathCount);
    this.y = canvas.height + Math.random() * 50;
    const bottomSpread = 0.9;
    const normalizedPath = (this.path - pathCount / 2) / (pathCount / 2);
    this.x = canvas.width * (0.5 + normalizedPath * bottomSpread);
    this.size = 1.5 + Math.random() * 2.5;
    this.speedY = -(1.5 + Math.random() * 2);
    this.opacity = 0.3 + Math.random() * (themeColors.particleOpacity - 0.3);
    this.trail = [];
  }

  update(canvas: HTMLCanvasElement) {
    this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
    if (this.trail.length > 8) this.trail.shift();
    this.y += this.speedY;
    const pathCount = 18;
    const normalizedPath = (this.path - pathCount / 2) / (pathCount / 2);
    const topSpread = 0.15;
    const bottomSpread = 0.9;
    const perspective = Math.max(0, Math.min(1, this.y / canvas.height));
    const spread =
      bottomSpread - (bottomSpread - topSpread) * (1 - perspective);
    this.x = canvas.width * (0.5 + normalizedPath * spread);
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.trail = [];
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { baseHue, baseSaturation, baseLightness } = themeColors;
    this.trail.forEach((point, index) => {
      const trailOpacity = (index / this.trail.length) * this.opacity * 0.6;
      const trailSize = this.size * (0.4 + (index / this.trail.length) * 0.6);
      ctx.beginPath();
      ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${trailOpacity})`;
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
      this.opacity * 0.6
    })`;
    ctx.fillStyle = `hsla(${baseHue}, ${baseSaturation}%, ${Math.min(
      95,
      baseLightness + 5
    )}%, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${baseHue}, ${baseSaturation}%, ${Math.min(
      100,
      baseLightness + 10
    )}%, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Token logos with proper SVG paths
const TokenIcon = ({
  symbol,
  className = "",
}: {
  symbol: string;
  className?: string;
}) => {
  const icons = {
    ETH: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none" fillRule="evenodd">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g fill="#FFF" fillRule="nonzero">
            <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
            <path d="M16.498 4L9 16.22l7.498-3.35z" />
            <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
            <path d="M16.498 27.995v-6.028L9 17.616z" />
            <path
              fillOpacity=".2"
              d="M16.498 20.573l7.497-4.353-7.497-3.348z"
            />
            <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    ),
    BTC: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none" fillRule="evenodd">
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
          />
        </g>
      </svg>
    ),
    SOL: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#66F9A1" />
          <path
            fill="#FFF"
            d="M8.5 19.5l3-3c.2-.2.4-.3.7-.3h11.3c.5 0 .7.6.4 1l-3 3c-.2.2-.4.3-.7.3H8.9c-.5 0-.7-.6-.4-1zm0-7l3-3c.2-.2.4-.3.7-.3h11.3c.5 0 .7.6.4 1l-3 3c-.2.2-.4.3-.7.3H8.9c-.5 0-.7-.6-.4-1zm11.3 3.5H8.5c-.5 0-.7.6-.4 1l3 3c.2.2.4.3.7.3h11.3c.5 0 .7-.6.4-1l-3-3c-.2-.2-.4-.3-.7-.3z"
          />
        </g>
      </svg>
    ),
    MATIC: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#8247E5" />
          <path
            fill="#FFF"
            d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V12.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0l-4.244 2.372A1.16 1.16 0 006 11.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z"
          />
        </g>
      </svg>
    ),
    ARB: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#28A0F0" />
          <path
            fill="#FFF"
            d="M16.5 8l-1.2 2.8-2.8 6.5 1.4 3.2h5.2l1.4-3.2-2.8-6.5L16.5 8zm-4.8 10.5l-2.2-5.1 1.8-4.2 2.4 5.6-2 3.7zm9.6 0l-2-3.7 2.4-5.6 1.8 4.2-2.2 5.1z"
          />
        </g>
      </svg>
    ),
    OP: (
      <svg viewBox="0 0 32 32" className={className}>
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#FF0420" />
          <path
            fill="#FFF"
            d="M13.8 10.5c-2.3 0-3.8 1.5-3.8 3.8 0 2.3 1.5 3.8 3.8 3.8h.6c1.2 0 2-.7 2-1.8 0-1.1-.8-1.8-2-1.8h-.6c-.7 0-1.2-.4-1.2-1.2s.5-1.2 1.2-1.2h.6c.7 0 1.2.4 1.2 1.2h2.6c0-2.3-1.5-3.8-3.8-3.8h-.6zm8.4 0c-2.3 0-3.8 1.5-3.8 3.8v3.8h2.6v-1.2h2.4v1.2h2.6v-3.8c0-2.3-1.5-3.8-3.8-3.8zm0 2.6c.7 0 1.2.4 1.2 1.2v.6h-2.4v-.6c0-.8.5-1.2 1.2-1.2z"
          />
        </g>
      </svg>
    ),
  };

  return icons[symbol] || icons.ETH;
};

// Bifrost-style Animated Vortex Component with theme-aware colors
const BifrostVortex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const particleCount = 200;
    const particles: BifrostParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new BifrostParticle(canvas));
      particles[i].y = canvas.height * Math.random();
    }

    const drawGrid = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number
    ) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const { baseHue, baseSaturation, baseLightness, gridOpacity } =
        themeColors;

      for (let i = 0; i <= 20; i++) {
        const y = height * 0.2 + (i / 20) * (height * 0.8);
        const perspective = (y - height * 0.2) / (height * 0.8);
        const lineWidth = 0.15 + perspective * 0.75;
        const x = width * (0.5 - lineWidth / 2);
        const w = width * lineWidth;
        const wave = Math.sin(time * 0.001 + i * 0.3) * 0.15 + 0.85;
        ctx.strokeStyle = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
          (gridOpacity + perspective * 0.15) * wave
        })`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.stroke();
      }

      const pathCount = 18;
      for (let i = 0; i < pathCount; i++) {
        const normalizedPath = (i - pathCount / 2) / (pathCount / 2);
        const topSpread = 0.15;
        const bottomSpread = 0.9;
        const topX = width * (0.5 + normalizedPath * topSpread);
        const bottomX = width * (0.5 + normalizedPath * bottomSpread);
        const wave = Math.sin(time * 0.001 + i * 0.2) * 0.15 + 0.85;
        ctx.strokeStyle = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
          (gridOpacity + Math.abs(normalizedPath) * 0.05) * wave
        })`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(topX, height * 0.2);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }
    };

    const drawFunnel = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number
    ) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const { baseHue, baseSaturation, baseLightness } = themeColors;
      const glow = Math.sin(time * 0.002) * 0.3 + 0.7;
      ctx.strokeStyle = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
        0.4 * glow
      })`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
        0.2 * glow
      })`;
      ctx.beginPath();
      ctx.moveTo(width * 0.425, height * 0.2);
      ctx.quadraticCurveTo(width * 0.3, height * 0.6, width * 0.05, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.575, height * 0.2);
      ctx.quadraticCurveTo(width * 0.7, height * 0.6, width * 0.95, height);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawGlow = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number
    ) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const { baseHue, baseSaturation, baseLightness, glowOpacity } =
        themeColors;
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.15,
        0,
        width * 0.5,
        height * 0.15,
        width * 0.35
      );
      const pulse = Math.sin(time * 0.002) * 0.25 + 0.75;
      gradient.addColorStop(
        0,
        `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
          glowOpacity * pulse
        })`
      );
      gradient.addColorStop(
        0.5,
        `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, ${
          glowOpacity * 0.6 * pulse
        })`
      );
      gradient.addColorStop(
        1,
        `hsla(${baseHue}, ${baseSaturation}%, ${baseLightness}%, 0)`
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const currentTime = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);
      drawGlow(ctx, canvas, currentTime);
      drawGrid(ctx, canvas, currentTime);
      particles.forEach((particle) => {
        particle.update(canvas);
        particle.draw(ctx);
      });
      drawFunnel(ctx, canvas, currentTime);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
};

// Floating protocol icons with animation
const FloatingIcon = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-xl bg-surface/60 backdrop-blur-md border border-border/30 flex items-center justify-center shadow-2xl hover:scale-110 hover:border-primary/40 transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 3,
    }}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </motion.div>
);

// Feature card with icon
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-6 rounded-2xl border border-border/50 bg-surface/30 backdrop-blur-sm hover:bg-surface/50 hover:border-primary/30 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { open } = useAppKit();

  // Get wallet state
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  
  // Get auth state from Zustand
  const { isAuthenticated, authenticating, authenticate } = useAuthStore();
  
  // Track if we've already triggered auth
  const authTriggeredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  // AUTO-NAVIGATE: When authenticated, go to dashboard
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log("✅ Authenticated! Navigating to dashboard...");
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  // AUTO-AUTHENTICATE: When wallet connects, immediately trigger sign message
  useEffect(() => {
    const shouldAuthenticate = 
      isConnected && 
      !isAuthenticated && 
      address && 
      walletProvider && 
      !authenticating &&
      !authTriggeredRef.current; // Prevent duplicate triggers

    if (shouldAuthenticate) {
      console.log("🔐 Wallet connected! Auto-triggering authentication...");
      authTriggeredRef.current = true; // Mark as triggered
      
      const triggerAuth = async () => {
        try {
          toast.info("Please sign the message to authenticate...");
          const provider = new BrowserProvider(walletProvider);
          await authenticate(address, provider);
          console.log("✅ Authentication successful!");
          navigate("/dashboard");
        } catch (error) {
          console.error("❌ Authentication failed:", error);
          authTriggeredRef.current = false; // Reset so user can try again
        }
      };
      
      // Small delay to ensure wallet provider is ready
      const timer = setTimeout(triggerAuth, 300);
      return () => clearTimeout(timer);
    }
    
    // Reset auth trigger flag when wallet disconnects
    if (!isConnected) {
      authTriggeredRef.current = false;
    }
  }, [isConnected, isAuthenticated, address, walletProvider, authenticating, authenticate]);


  const handleConnect = async () => {
    // If already authenticated, navigate to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    }

    // If connected but not authenticated, manually trigger sign
    if (isConnected && !isAuthenticated && address && walletProvider) {
      try {
        toast.info("Please sign the message to authenticate...");
        const provider = new BrowserProvider(walletProvider);
        await authenticate(address, provider);
        // Navigation happens automatically via useEffect
      } catch (error) {
        console.error("Authentication failed:", error);
      }
      return;
    }

    // If not connected, open wallet modal
    if (!isConnected) {
      open();
      return;
    }
  };
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Enhanced Background with Gradient Mesh */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Enhanced Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-12 h-12">
              <img
                src="/logo.png"
                alt="ParaBuild Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ParaBuild
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#quests"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Quests
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleConnect}
              disabled={authenticating}
            >
              {authenticating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Authenticating...
                </>
              ) : isAuthenticated ? (
                <>
                  Enter App
                  <ChevronRight className="h-5 w-5" />
                </>
              ) : isConnected ? (
                <>
                  Sign Message
                  <Wallet className="h-5 w-5" />
                </>
              ) : (
                <>
                  Connect Wallet
                  <Wallet className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section with Vortex Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Vortex Animation as Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <BifrostVortex />
        </div>

        {/* Floating Token Icons */}
        <FloatingIcon
          className="h-16 w-16 top-[15%] left-[8%] p-2 z-10"
          delay={0}
        >
          <TokenIcon symbol="ETH" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-14 w-14 top-[20%] left-[18%] p-2 z-10"
          delay={0.5}
        >
          <TokenIcon symbol="BTC" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-16 w-16 top-[12%] right-[10%] p-2 z-10"
          delay={1}
        >
          <TokenIcon symbol="SOL" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-14 w-14 top-[25%] right-[18%] p-2 z-10"
          delay={1.5}
        >
          <TokenIcon symbol="MATIC" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-16 w-16 top-[40%] right-[8%] p-2 z-10"
          delay={2}
        >
          <TokenIcon symbol="ARB" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-14 w-14 bottom-[35%] right-[12%] p-2 z-10"
          delay={2.5}
        >
          <TokenIcon symbol="OP" className="w-full h-full" />
        </FloatingIcon>

        <FloatingIcon
          className="h-14 w-14 bottom-[40%] left-[12%] p-2 z-10"
          delay={3}
        >
          <TokenIcon symbol="ETH" className="w-full h-full" />
        </FloatingIcon>

        {/* Main Hero Content */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Web3's Contribution Economy
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-8 leading-[1.05]">
              <span className="text-foreground">Earn rewards by</span>
              <br />
              <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Contributing in Web3
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              ParaBuild rewards developers who contribute to the ecosystem.
              Submit your hackathon wins, quests, and open source work to earn{" "}
              <span className="text-foreground font-semibold">$PBUILD</span>{" "}
              tokens.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleConnect}
                className="gap-2 px-8 h-12 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all backdrop-blur-sm"
              >
                {isConnected ? (
                  <>
                    Enter Dashboard
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Connect Wallet
                    <Wallet className="h-5 w-5" />
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="gap-2 px-8 h-12 text-base border-border/50 hover:border-primary/30 backdrop-blur-sm"
              >
                How it Works
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>On-Chain Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>10K+ Builders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>$5M+ Earned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 md:py-32 border-t border-border/30"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p
              className="text-sm text-primary font-semibold uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why ParaBuild
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Turn Your Contributions Into{" "}
              <span className="text-primary">Lasting Value</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The first platform where your Web3 contributions compound into
              real rewards
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Trophy}
              title="On-Chain Reputation"
              description="Every contribution is verified and recorded on-chain. Build a permanent, composable record of your achievements."
              delay={0}
            />
            <FeatureCard
              icon={Code2}
              title="Automated Verification"
              description="Connect your GitHub, hackathon accounts, and let our system automatically verify your contributions."
              delay={0.1}
            />
            <FeatureCard
              icon={Gift}
              title="Real Rewards"
              description="Redeem $PBUILD tokens for exclusive merch, conference tickets, tool subscriptions, and more."
              delay={0.2}
            />
            <FeatureCard
              icon={Target}
              title="Daily Quests"
              description="Complete daily and weekly quests to earn bonus tokens and level up your profile."
              delay={0.3}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Leaderboards"
              description="Compete with other builders globally. Top contributors unlock exclusive benefits and recognition."
              delay={0.4}
            />
            <FeatureCard
              icon={Users}
              title="Global Community"
              description="Join 10,000+ builders from India, SEA, LatAm, and beyond who are earning rewards daily."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Quests Section */}
      <section id="quests" className="py-24 md:py-32 border-t border-border/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-4">
              Quest Terminal
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Multiple ways to</span>
              <br />
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                earn $PBUILD tokens
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From hackathons to bounties, open source to content creation —
              every contribution counts
            </p>
          </motion.div>

          {/* Quest Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Win a Hackathon",
                reward: "10,000",
                icon: Trophy,
                color: "from-amber-500 to-orange-600",
              },
              {
                title: "Complete Bounty",
                reward: "5,000",
                icon: Target,
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "Merge PR",
                reward: "2,500",
                icon: Code2,
                color: "from-blue-500 to-cyan-600",
              },
              {
                title: "Create Content",
                reward: "1,500",
                icon: Sparkles,
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Host Event",
                reward: "3,000",
                icon: Users,
                color: "from-rose-500 to-red-600",
              },
            ].map((quest, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-border/50 bg-surface/40 backdrop-blur-sm hover:border-primary/40 hover:bg-surface/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group text-center cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`h-16 w-16 mx-auto rounded-2xl bg-linear-to-br ${quest.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <quest.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-3">{quest.title}</h3>
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-bold text-primary">
                    {quest.reward}
                  </div>
                  <div className="text-xs text-muted-foreground">$PBUILD</div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-4 w-full text-xs h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Start Quest
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How it Works */}
      <section
        id="how-it-works"
        className="py-24 md:py-32 border-t border-border/30 bg-surface/20"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-4">
                Getting Started
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                How ParaBuild Works
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                The more you contribute and the more tokens you earn, the more
                opportunities you unlock in the Web3 ecosystem.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
              >
                Read our Documentation
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Connect Your Wallet",
                  desc: "Download any crypto wallet or connect one you already have. We support MetaMask, WalletConnect, and more.",
                  icon: Wallet,
                },
                {
                  step: "02",
                  title: "Submit Contributions",
                  desc: "Add your hackathon wins, bounty completions, open source PRs, and any Web3 contribution.",
                  icon: Code2,
                },
                {
                  step: "03",
                  title: "Get Verified",
                  desc: "Our automated system verifies your submissions through GitHub, ETHGlobal, and other platforms.",
                  icon: CheckCircle2,
                },
                {
                  step: "04",
                  title: "Earn $PBUILD Tokens",
                  desc: "Receive tokens directly to your wallet as rewards for your verified contributions.",
                  icon: Zap,
                },
                {
                  step: "05",
                  title: "Redeem Rewards",
                  desc: "Use your tokens to claim exclusive merch, conference tickets, tool subscriptions, and NFTs.",
                  icon: Gift,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 p-4 rounded-xl hover:bg-surface/50 transition-colors group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl border border-border/50 bg-surface/50 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.step}
                      </span>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced */}
      <section className="py-24 md:py-32 border-t border-border/30">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-6">
              Our Mission
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              <span className="text-foreground">We imagine a world where </span>
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                builders' contributions
              </span>
              <span className="text-foreground"> are valued more than </span>
              <span className="text-muted-foreground">capital investments</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              For Web3 to reach its next stage of growth, tokens should be in
              the hands of the builders and contributors rather than
              concentrated in the wallets of passive investors. ParaBuild is
              building that future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 border-t border-border/30 bg-surface/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                label: "Active Builders",
                value: platformStats.totalContributors.toLocaleString(),
                icon: Users,
              },
              {
                label: "Rewards Claimed",
                value: platformStats.totalRewardsDistributed.toLocaleString(),
                icon: Gift,
              },
              {
                label: "$PBUILD Earned",
                value: `${(platformStats.totalPBuildEarned / 1000000).toFixed(
                  1
                )}M`,
                icon: TrendingUp,
              },
              {
                label: "Partner Projects",
                value: platformStats.activeProjects.toLocaleString(),
                icon: Code2,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 md:py-32 border-t border-border/30">
        <div className="container">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-surface/80 to-surface/40 backdrop-blur-sm p-12 md:p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Ready to Start <span className="text-primary">Building?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Join 10,000+ Web3 developers already earning rewards for their
                contributions. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleConnect}
                  className="gap-2 px-8 h-12 text-base shadow-xl shadow-primary/25"
                >
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 h-12 text-base border-border/50"
                >
                  View Rewards
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-8 mt-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent border-2 border-background"
                      />
                    ))}
                  </div>
                  <span>10K+ builders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span>5.0 rating</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/30 py-12 bg-surface/20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                  <span className="font-display text-base font-bold text-primary-foreground">
                    B3
                  </span>
                </div>
                <span className="font-display text-xl font-bold">
                  ParaBuild
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-4">
                The Web3 contribution-to-rewards platform. Earn tokens for your
                hackathon wins, bounties, and open source work.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface hover:bg-primary/10 border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface hover:bg-primary/10 border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#quests"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Quests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Rewards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              © 2025 ParaBuild. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
