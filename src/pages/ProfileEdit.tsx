// pages/ProfileEdit.tsx - Professional Profile Edit Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Loader2,
  Camera,
  Github,
  Twitter,
  Globe,
  Mail,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { currentUser } from "@/data/mockData";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FormErrors {
  username?: string;
  bio?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuthStore();
  const user = authUser || currentUser;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    github: user?.github_url || "",
    twitter: user?.twitter_url || "",
    website: user?.website_url || "",
    email: user?.email || "",
  });

  // Validation functions
  const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 30) return "Username must be less than 30 characters";
    if (!/^[a-zA-Z0-9_-]+$/.test(username))
      return "Username can only contain letters, numbers, hyphens, and underscores";
    return undefined;
  };

  const validateBio = (bio: string): string | undefined => {
    if (bio.length > 160) return "Bio must be less than 160 characters";
    return undefined;
  };

  const validateUrl = (url: string, fieldName: string): string | undefined => {
    if (!url) return undefined; // Optional field
    try {
      new URL(url);
      return undefined;
    } catch {
      return `Please enter a valid ${fieldName} URL`;
    }
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  // Handle field changes
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);

    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.username = validateUsername(formData.username);
    newErrors.bio = validateBio(formData.bio);
    newErrors.github_url = validateUrl(formData.github, "GitHub");
    newErrors.twitter_url = validateUrl(formData.twitter, "Twitter");
    newErrors.website_url = validateUrl(formData.website, "website");
    newErrors.email = validateEmail(formData.email);

    // Filter out undefined errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== undefined)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update would happen here
      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      });

      setIsDirty(false);
      navigate(`/profile/${formData.username}`);
    } catch (error) {
      toast.error("Failed to update profile", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (isDirty) {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirm) return;
    }
    navigate(-1);
  };

  // Character count helper
  const getCharCount = (text: string, max: number) => {
    const remaining = max - text.length;
    const isOverLimit = remaining < 0;
    return (
      <span
        className={`text-xs ${
          isOverLimit ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {remaining} characters remaining
      </span>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your profile information and social links
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Upload a profile picture or use your wallet address as an avatar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-3xl font-bold bg-linear-to-br from-primary to-accent text-primary-foreground">
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-medium">Recommended specs:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Square image, at least 400x400px</li>
                    <li>• JPG, PNG, or GIF format</li>
                    <li>• Maximum file size: 5MB</li>
                  </ul>
                  <Button type="button" variant="outline" size="sm" className="mt-4">
                    Upload New Picture
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your public profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base">
                  Username <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleFieldChange("username", e.target.value)}
                  className={`bg-background ${
                    errors.username ? "border-destructive" : ""
                  }`}
                  placeholder="your_username"
                />
                {errors.username ? (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.username}</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    This will be your public display name
                  </p>
                )}
              </div>

              <Separator />

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-base">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                  className={`bg-background min-h-30 ${
                    errors.bio ? "border-destructive" : ""
                  }`}
                  placeholder="Tell us about yourself..."
                />
                <div className="flex justify-between items-center">
                  {errors.bio ? (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.bio}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Brief description for your profile
                    </p>
                  )}
                  {getCharCount(formData.bio, 160)}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social profiles to build credibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GitHub */}
              <div className="space-y-2">
                <Label htmlFor="github" className="text-base flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => handleFieldChange("github", e.target.value)}
                  className={`bg-background ${
                    errors.github_url ? "border-destructive" : ""
                  }`}
                  placeholder="https://github.com/username"
                />
                {errors.github_url && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.github_url}</span>
                  </div>
                )}
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-base flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => handleFieldChange("twitter", e.target.value)}
                  className={`bg-background ${
                    errors.twitter_url ? "border-destructive" : ""
                  }`}
                  placeholder="https://twitter.com/handle"
                />
                {errors.twitter_url && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.twitter_url}</span>
                  </div>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleFieldChange("website", e.target.value)}
                  className={`bg-background ${
                    errors.website_url ? "border-destructive" : ""
                  }`}
                  placeholder="https://yourwebsite.com"
                />
                {errors.website_url && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.website_url}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={`bg-background ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50 bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Wallet Address
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </CardTitle>
              <CardDescription>Your connected wallet address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-background border border-border font-mono text-sm break-all">
                {user.wallet_address}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Wallet address cannot be changed. To use a different wallet, please
                disconnect and connect with the new wallet.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1 gap-2"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            className="flex-1 gap-2"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default ProfileEdit;