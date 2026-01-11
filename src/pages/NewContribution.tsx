// pages/NewContribution.tsx - Complete Smart Contract Integration
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { useContributionsStore } from "@/store/contributionStore";
import { ContributionType, CreateContributionDTO } from "@/types";
import { motion } from "framer-motion";
import {
  submitContributionToContract,
  mapContributionTypeToContract,
  DEFAULT_POINTS,
} from "@/lib/contracts/contributionTracker";
import { ContributionSubmitModal } from "@/components/contributions/ContributionSubmitModal";

const contributionTypes: {
  value: ContributionType;
  label: string;
  description: string;
}[] = [
  {
    value: ContributionType.HACKATHON_WIN,
    label: "🏆 Hackathon Win",
    description: "Won a prize at a hackathon",
  },
  {
    value: ContributionType.HACKATHON_PARTICIPATION,
    label: "🎯 Hackathon Participation",
    description: "Participated in a hackathon",
  },
  {
    value: ContributionType.BOUNTY,
    label: "💰 Bounty Completion",
    description: "Completed a bounty task",
  },
  {
    value: ContributionType.OPEN_SOURCE,
    label: "🔧 Open Source PR",
    description: "Merged pull request to open source project",
  },
  {
    value: ContributionType.TUTORIAL,
    label: "📝 Tutorial",
    description: "Created tutorial, article, or video",
  },
];

interface FormErrors {
  type?: string;
  name?: string;
  description?: string;
  proof_url?: string;
  github_url?: string;
}

type SubmissionStep = "generating" | "confirming" | "submitting" | "success" | "error" | "";

const NewContribution = () => {
  const navigate = useNavigate();
  const { walletProvider } = useAppKitProvider("eip155");
  const { generateBackendId, submitContribution } = useContributionsStore();

  const [formData, setFormData] = useState<CreateContributionDTO>({
    type: "" as any,
    name: "",
    description: "",
    proof_url: "",
    github_url: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [backendId, setBackendId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>("");
  const [step, setStep] = useState<SubmissionStep>("");
  const [submissionError, setSubmissionError] = useState<string>("");

  const selectedType = contributionTypes.find((t) => t.value === formData.type);
  
  // Get estimated points based on contribution type
  const estimatedPoints = formData.type 
    ? DEFAULT_POINTS[mapContributionTypeToContract(formData.type)] || 0
    : 0;

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.type) {
      newErrors.type = "Please select a contribution type";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Project name must be at least 3 characters";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formData.proof_url.trim()) {
      newErrors.proof_url = "Proof URL is required";
    } else {
      try {
        new URL(formData.proof_url);
      } catch {
        newErrors.proof_url = "Please enter a valid URL";
      }
    }
    if (formData.github_url && formData.github_url.trim()) {
      try {
        new URL(formData.github_url);
      } catch {
        newErrors.github_url = "Please enter a valid GitHub URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (
    field: keyof CreateContributionDTO,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Step 1: Validate and open modal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    if (!walletProvider) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Open modal and start process
    setModalOpen(true);
    setStep("generating");
    
    try {
      // Generate backend ID
      const generatedId = await generateBackendId();
      setBackendId(generatedId);
      setStep("confirming");
    } catch (error: any) {
      console.error("Backend ID generation error:", error);
      setSubmissionError(error.message || "Failed to generate backend ID");
      setStep("error");
    }
  };

  // Step 2: Confirm and submit to smart contract
  const handleConfirm = async () => {
    if (!backendId || !walletProvider) {
      toast.error("Missing required data");
      return;
    }

    setStep("submitting");

    try {
      // Create ethers provider
      const provider = new BrowserProvider(walletProvider);

      // Map frontend type to contract enum
      const contractType = mapContributionTypeToContract(formData.type);
      
      // Get points for this type
      const points = DEFAULT_POINTS[contractType] || 0;

      // Submit to smart contract
      const { txHash: transactionHash } = 
        await submitContributionToContract(
          provider,
          contractType,
          points,
          formData.proof_url,
          backendId
        );

      setTxHash(transactionHash);

      // Submit to backend with backend_id and tx_hash
      await submitContribution({
        ...formData,
        backend_id: backendId
        // These fields would be added by the API client
        // backend_id: backendId,
        // tx_hash: transactionHash,
        // contribution_id: contributionId,
      } as any);

      setStep("success");

      // Navigate after delay
      setTimeout(() => {
        setModalOpen(false);
        navigate("/contributions");
      }, 3000);

    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmissionError(error.message || "Submission failed");
      setStep("error");
    }
  };

  const handleCancel = () => {
    if (
      formData.name ||
      formData.description ||
      formData.proof_url ||
      formData.github_url
    ) {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirm) return;
    }
    navigate(-1);
  };

  const handleCloseModal = () => {
    if (step === "submitting") {
      toast.error("Please wait for the transaction to complete");
      return;
    }
    setModalOpen(false);
    setStep("");
    setBackendId(null);
    setTxHash("");
    setSubmissionError("");
  };

  const isFormDisabled = modalOpen && step !== "";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display">Submit Contribution</h1>
          <p className="text-muted-foreground">
            Share your Web3 work and earn $PBUILD tokens
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Contribution Details</CardTitle>
            <CardDescription>
              Provide details about your contribution. Your submission will be recorded on the blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Contribution Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    handleFieldChange("type", value as ContributionType)
                  }
                  disabled={isFormDisabled}
                >
                  <SelectTrigger
                    className={`bg-background border-border ${
                      errors.type ? "border-destructive" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select contribution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contributionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div>{type.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.type}</span>
                  </div>
                )}
                {selectedType && !errors.type && estimatedPoints > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {selectedType.description} • Estimated: {estimatedPoints.toLocaleString()} points
                  </p>
                )}
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Project Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., ETH Global Istanbul - DeFi Protocol"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className={`bg-background border-border ${
                    errors.name ? "border-destructive" : ""
                  }`}
                  disabled={isFormDisabled}
                />
                {errors.name && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you built, the technologies used, and the impact..."
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  className={`bg-background border-border min-h-30 ${
                    errors.description ? "border-destructive" : ""
                  }`}
                  disabled={isFormDisabled}
                />
                {errors.description && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.description}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.description.length} characters
                </p>
              </div>

              {/* Proof URL */}
              <div className="space-y-2">
                <Label htmlFor="proof_url">
                  Proof URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="proof_url"
                  type="url"
                  placeholder="https://devfolio.co/projects/..."
                  value={formData.proof_url}
                  onChange={(e) => handleFieldChange("proof_url", e.target.value)}
                  className={`bg-background border-border ${
                    errors.proof_url ? "border-destructive" : ""
                  }`}
                  disabled={isFormDisabled}
                />
                {errors.proof_url ? (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.proof_url}</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Link to hackathon submission, bounty platform, or proof of work
                  </p>
                )}
              </div>

              {/* GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub Repository (Optional)</Label>
                <Input
                  id="github_url"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={formData.github_url}
                  onChange={(e) =>
                    handleFieldChange("github_url", e.target.value)
                  }
                  className={`bg-background border-border ${
                    errors.github_url ? "border-destructive" : ""
                  }`}
                  disabled={isFormDisabled}
                />
                {errors.github_url && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.github_url}</span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={isFormDisabled}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={isFormDisabled}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Contribution
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Submission Process
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">1.</span>
                <span>Your contribution will be recorded on the blockchain</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">2.</span>
                <span>You'll need to confirm the transaction in your wallet</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">3.</span>
                <span>Verifiers will review your submission (24-48 hours)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">4.</span>
                <span>Once approved, $PBUILD tokens will be minted to your wallet</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submission Modal */}
      <ContributionSubmitModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        formData={formData}
        backendId={backendId}
        loading={step === "generating" || step === "submitting"}
        step={step}
        error={submissionError}
        txHash={txHash}
        estimatedPoints={estimatedPoints}
      />
    </div>
  );
};

export default NewContribution;