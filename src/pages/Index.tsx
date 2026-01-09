// pages/LandingPage.tsx - Professional ParaBuild Landing Page
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Trophy,
  Gift,
  Users,
  Github,
  Twitter,
  ChevronRight,
  Wallet,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Shield,
  FileCheck,
  Boxes,
  Award,
  Zap,
  Lock,
  Globe,
  Terminal,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

// Theme-aware Bifrost Vortex implementation
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

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { open } = useAppKit();

  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const { isAuthenticated, authenticating, authenticate } = useAuthStore();
  const authTriggeredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const shouldAuthenticate =
      isConnected &&
      !isAuthenticated &&
      address &&
      walletProvider &&
      !authenticating &&
      !authTriggeredRef.current;

    if (shouldAuthenticate) {
      authTriggeredRef.current = true;
      const triggerAuth = async () => {
        try {
          toast.info("Please sign the message to authenticate...");
          const provider = new BrowserProvider(walletProvider);
          await authenticate(address, provider);
          navigate("/dashboard");
        } catch (error) {
          console.error("Authentication failed:", error);
          authTriggeredRef.current = false;
        }
      };
      const timer = setTimeout(triggerAuth, 300);
      return () => clearTimeout(timer);
    }

    if (!isConnected) {
      authTriggeredRef.current = false;
    }
  }, [isConnected, isAuthenticated, address, walletProvider, authenticating, authenticate, navigate]);

  const handleConnect = async () => {
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    }

    if (isConnected && !isAuthenticated && address && walletProvider && !authenticating) {
      try {
        toast.info("Please sign the message to authenticate...");
        const provider = new BrowserProvider(walletProvider);
        await authenticate(address, provider);
      } catch (error) {
        console.error("Authentication failed:", error);
      }
      return;
    }

    if (!isConnected) {
      open();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img
                src="/pb-logo.png"
                alt="ParaBuild"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              ParaBuild
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#architecture" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Architecture
            </a>
            <a href="#for-builders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              For Builders
            </a>
            <a href="#integration" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Integration
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={handleConnect}
              disabled={authenticating}
              className="gap-2"
            >
              {authenticating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Authenticating
                </>
              ) : isAuthenticated ? (
                <>
                  Dashboard
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : isConnected ? (
                <>
                  Sign Message
                  <Wallet className="h-4 w-4" />
                </>
              ) : (
                <>
                  Connect Wallet
                  <Wallet className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <BifrostVortex />
        </div>

        <div className="relative z-10 container text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-1.5">
              <Shield className="w-3 h-3 mr-2" />
              Onchain Reputation Infrastructure
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="block mb-2">The Reputation Layer</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                for Web3 Builders
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform verifiable contributions into portable, composable reputation.
              <span className="block mt-2 font-medium text-foreground">
                The primitive infrastructure for merit-based credibility.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                onClick={handleConnect}
                disabled={authenticating}
                className="gap-2 px-8 h-14 text-lg"
              >
                {authenticating ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Authenticating...
                  </>
                ) : isAuthenticated ? (
                  <>
                    Enter Dashboard
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Get Started
                    <Wallet className="h-5 w-5" />
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 h-14 text-lg"
                asChild
              >
                <a href="https://docs.parabuild.xyz" target="_blank" rel="noopener noreferrer">
                  Documentation
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>EAS Protocol Integration</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Ethereum Mainnet</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Open Source</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="py-32 border-t border-border/30">
        <div className="container">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              A New Primitive for <span className="text-primary">Developer Reputation</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ParaBuild creates verifiable, onchain attestations from developer contributions—
              building a composable reputation layer that travels with builders across the Web3 ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-2 border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Verifiable Attestations</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every contribution generates cryptographically signed attestations via Ethereum Attestation Service (EAS).
                  Immutable, portable, and universally verifiable.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Standards-compliant EAS schema implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">On-chain permanent storage with IPFS backup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Cross-platform credential portability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dynamic Reputation Scoring</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Sophisticated algorithms evaluate contribution quality, recency, and diversity—
                  creating a holistic reputation score that reflects genuine expertise.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Multi-dimensional quality assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Time-decay for sustained contribution incentives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Skill-specific reputation tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6">
                  <Boxes className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Composable Integration</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Built as infrastructure for the ecosystem. DAOs, protocols, and platforms
                  integrate reputation data through standardized APIs and smart contracts.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">GraphQL API for reputation queries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Smart contract integration patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Embeddable reputation widgets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-32 border-t border-border/30 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <Badge variant="outline" className="mb-4">
              System Architecture
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Built on <span className="text-primary">Production-Grade Infrastructure</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ParaBuild combines decentralized attestation protocols with scalable verification systems
              to create a robust reputation layer for Web3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="pt-8 pb-8">
                <Terminal className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Attestation Layer</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• EAS Protocol for attestation generation and storage</p>
                  <p>• Ethereum mainnet for immutable credential anchoring</p>
                  <p>• IPFS for decentralized metadata storage</p>
                  <p>• Multi-sig verification for high-value attestations</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8">
                <Globe className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">Verification Infrastructure</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Automated GitHub integration for PR verification</p>
                  <p>• ETHGlobal API for hackathon validation</p>
                  <p>• Smart contract interaction analysis</p>
                  <p>• Community-driven peer review system</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8">
                <Lock className="w-10 h-10 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Security & Privacy</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Zero-knowledge proof support for sensitive data</p>
                  <p>• Selective disclosure of reputation attributes</p>
                  <p>• Encrypted off-chain metadata with on-chain hashes</p>
                  <p>• Multi-chain credential verification</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8">
                <Code2 className="w-10 h-10 text-warning mb-4" />
                <h3 className="text-xl font-bold mb-3">Integration Layer</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• RESTful and GraphQL API endpoints</p>
                  <p>• Smart contract libraries for Solidity/Vyper</p>
                  <p>• React/Vue components for frontend integration</p>
                  <p>• Webhook support for real-time updates</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-8 pb-8 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Open Source & Audited</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                All core smart contracts are open source and have undergone comprehensive security audits.
                Community contributions welcome.
              </p>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://github.com/ParaBuild-Protocol" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Builders */}
      <section id="for-builders" className="py-32 border-t border-border/30">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <Badge variant="outline" className="mb-4">
              For Developers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Build Your <span className="text-primary">Professional Identity</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every contribution you make—from hackathon wins to open source commits—becomes part
              of your verifiable professional record.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Trophy className="w-10 h-10 text-warning mb-4" />
                <h3 className="text-xl font-bold mb-3">Hackathon Achievements</h3>
                <p className="text-muted-foreground text-sm">
                  Automatically verify and attest hackathon wins from ETHGlobal,
                  Devfolio, and other platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Code2 className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Open Source Contributions</h3>
                <p className="text-muted-foreground text-sm">
                  Merged PRs, code reviews, and issue resolutions tracked and
                  converted into reputation.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Coins className="w-10 h-10 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Bug Bounties</h3>
                <p className="text-muted-foreground text-sm">
                  Security vulnerability discoveries verified and added to your
                  credential portfolio.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardContent className="pt-8 pb-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Skill-Based NFT Badges</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    As you build reputation in specific domains, unlock tiered NFT badges
                    (Bronze, Silver, Gold, Platinum) that serve as visual proof of expertise.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-600" />
                      <span><span className="font-semibold">Bronze:</span> 10+ contributions, 70% quality</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      <span><span className="font-semibold">Silver:</span> 50+ contributions, 80% quality</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span><span className="font-semibold">Gold:</span> 100+ contributions, 90% quality</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span><span className="font-semibold">Platinum:</span> 200+ contributions, 95% quality</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Award className="w-64 h-64 text-primary/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration */}
      <section id="integration" className="py-32 border-t border-border/30 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Ecosystem Integration
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              For DAOs, Protocols & <span className="text-primary">Platforms</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Integrate verifiable reputation data into your decision-making processes,
              governance systems, and contributor programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Grant Allocation</h3>
                <p className="text-sm text-muted-foreground">
                  Use reputation scores to prioritize grant applications and
                  identify proven builders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Governance Weight</h3>
                <p className="text-sm text-muted-foreground">
                  Assign voting power proportional to contribution history and
                  domain expertise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Contributor Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically distribute rewards based on verified contribution
                  metrics.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
            <CardContent className="pt-10 pb-10">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Integrate?</h3>
                <p className="text-muted-foreground mb-8">
                  Access comprehensive documentation, API references, and integration
                  guides to start building with ParaBuild.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2" asChild>
                    <a href="https://docs.parabuild.xyz" target="_blank" rel="noopener noreferrer">
                      <FileCheck className="w-5 h-5" />
                      View Documentation
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="https://github.com/ParaBuild-Protocol" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                      GitHub Repository
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Builders", value: platformStats.totalContributors.toLocaleString(), icon: Users },
              { label: "Attestations Issued", value: "50,000+", icon: Shield },
              { label: "Protocols Integrated", value: platformStats.activeProjects.toString(), icon: Boxes },
              { label: "Total Reputation Score", value: "15M+", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary/50" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border/30">
        <div className="container">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
            <CardContent className="pt-16 pb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Building Your <span className="text-primary">Onchain Reputation</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join the professional infrastructure layer for Web3 developer credibility.
              </p>
              <Button
                size="lg"
                onClick={handleConnect}
                disabled={authenticating}
                className="gap-2 px-10 h-14 text-lg"
              >
                {authenticating ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Authenticating...
                  </>
                ) : isAuthenticated ? (
                  <>
                    Enter Dashboard
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Get Started
                    <Wallet className="h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8">
                  <img src="/pb-logo.png" alt="ParaBuild" className="w-full h-full object-contain" />
                </div>
                <span className="font-display text-xl font-bold">ParaBuild</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                The onchain reputation layer for Web3 builders. Verifiable contributions,
                portable credentials, composable infrastructure.
              </p>
              <p className="text-xs text-muted-foreground">Build Beyond. ParaBuild.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#platform" className="hover:text-foreground transition-colors">Platform</a></li>
                <li><a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a></li>
                <li><a href="#for-builders" className="hover:text-foreground transition-colors">For Builders</a></li>
                <li><a href="#integration" className="hover:text-foreground transition-colors">Integration</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://docs.parabuild.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://github.com/ParaBuild-Protocol" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/parabuildxyz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2026 ParaBuild Protocol. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}