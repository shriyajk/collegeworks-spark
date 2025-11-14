import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBusinessProjects } from "@/contexts/BusinessProjectsContext";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Upload, 
  FileText, 
  AlertTriangle,
  Info,
  Building2,
  Shield
} from "lucide-react";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

interface FormData {
  businessName: string;
  yourName: string;
  email: string;
  password: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormErrors {
  [key: string]: string;
}

const BusinessSignup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { clearBusinessProjects } = useBusinessProjects();
  
  // Clear projects immediately when component mounts (new signup flow)
  useEffect(() => {
    clearBusinessProjects();
  }, [clearBusinessProjects]);
  
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    yourName: "",
    email: "",
    password: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Optional email format validation (only if email is provided)
    if (formData.email && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Optional password strength validation (only if password is provided)
    if (formData.password && formData.password.length > 0 && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Optional ZIP code format validation (only if ZIP is provided)
    if (formData.zipCode && formData.zipCode.trim() && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    // No required fields - all validation is optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, document: "Please upload a PDF, JPG, or PNG file" }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, document: "File size must be less than 10MB" }));
        return;
      }

      setUploadedFile(file);
      setErrors(prev => ({ ...prev, document: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store business data for demo
      localStorage.setItem("campusBuildBusiness", JSON.stringify({
        ...formData,
        hasDocument: !!uploadedFile,
        documentName: uploadedFile?.name,
        submittedAt: new Date().toISOString()
      }));

      // New user - clear projects context and don't set userSignedUp so they see empty stats
      clearBusinessProjects();
      
      navigate("/business-pending-approval", { 
        state: { 
          email: formData.email,
          businessName: formData.businessName 
        } 
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0; // Only check for validation errors, no required fields
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Join as a Business</h1>
            <p className="text-muted-foreground">
              Connect with talented student teams for your projects
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Information */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="Enter your business name"
                      className={`h-12 ${errors.businessName ? "border-destructive" : ""}`}
                    />
                    {errors.businessName && (
                      <p className="text-sm text-destructive">{errors.businessName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yourName" className="text-sm font-medium">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="yourName"
                      value={formData.yourName}
                      onChange={(e) => handleInputChange("yourName", e.target.value)}
                      placeholder="Enter your full name"
                      className={`h-12 ${errors.yourName ? "border-destructive" : ""}`}
                    />
                    {errors.yourName && (
                      <p className="text-sm text-destructive">{errors.yourName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="business@company.com"
                      className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a secure password"
                        className={`h-12 pr-12 ${errors.password ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Verification */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Business Verification
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Business License or Tax ID <span className="text-destructive">*</span>
                    </Label>
                    
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-blue-300 ${
                        errors.document ? "border-destructive" : "border-muted-foreground/25"
                      }`}
                      onClick={handleFileUpload}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <FileText className="h-8 w-8 mx-auto text-success" />
                          <p className="text-sm font-medium text-success">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">Click to change file</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm font-medium">Upload Document</p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, or PNG (max 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {errors.document && (
                      <p className="text-sm text-destructive">{errors.document}</p>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Required for account approval
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location Information */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Location Information
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress" className="text-sm font-medium">
                      Street Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                      placeholder="123 Business St"
                      className={`h-12 ${errors.streetAddress ? "border-destructive" : ""}`}
                    />
                    {errors.streetAddress && (
                      <p className="text-sm text-destructive">{errors.streetAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="San Francisco"
                        className={`h-12 ${errors.city ? "border-destructive" : ""}`}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-sm font-medium">
                        ZIP Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="94102"
                        className={`h-12 ${errors.zipCode ? "border-destructive" : ""}`}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className={`h-12 ${errors.state ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Location Warning */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Must be within 10 miles of a university
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This ensures local project collaboration
                  </p>
                </div>
              </div>
            </Card>

            {/* Escrow Information */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    About Escrow Protection
                  </h3>
                  <p className="text-sm text-blue-800">
                    All project payments are held securely until work is completed. 
                    This protects both you and student teams.
                  </p>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit for Review"
              )}
            </Button>
          </form>

          {/* Bottom Info */}
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <p>Review typically takes 24-48 hours</p>
            <p>
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/business-signin")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
