import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useBusinessProjects } from "@/contexts/BusinessProjectsContext";
import { 
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle2
} from "lucide-react";

const BusinessSignIn = () => {
  const navigate = useNavigate();
  const { populateMockDataForSignIn } = useBusinessProjects();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    // Optional email format validation (only if email is provided)
    if (formData.email && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // No required fields - all validation is optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      const businessData = {
        email: formData.email || "demo@business.com",
        businessName: "Demo Business",
        isReturningUser: true
      };
      
      // Store login status
      localStorage.setItem("businessLoginStatus", "logged_in");
      localStorage.setItem("businessData", JSON.stringify(businessData));
      
      // Mark as existing user with data
      localStorage.setItem('userSignedUp', 'true');
      
      // Populate mock data for returning user
      populateMockDataForSignIn();
      
      // Navigate to dashboard
      navigate("/business-dashboard", { 
        state: businessData
      });
      
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-600">Business Sign In</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Welcome Card */}
          <Card className="p-8 text-center card-enhanced">
            <div className="space-y-4">
              <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to your business account
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Notice */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Demo Mode</p>
                <p className="text-xs text-blue-700 mt-1">
                  All fields are optional. Any email/password combination will work for testing.
                </p>
              </div>
            </div>
          </Card>

          {/* Sign In Form */}
          <Card className="p-8 card-enhanced">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email (optional)"
                    className="pl-10 focus-ring"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password (optional)"
                    className="pl-10 pr-10 focus-ring"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold btn-primary"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Demo Quick Login */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Quick demo login:</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ email: "demo@business.com", password: "demo123" });
                    setTimeout(() => {
                      handleSubmit(new Event('submit') as any);
                    }, 100);
                  }}
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  Use Demo Credentials
                </Button>
              </div>
            </form>
          </Card>

          {/* Footer Links */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/business-signup")}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
              >
                Sign up here
              </Button>
            </p>
            
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-700 p-0 h-auto text-sm"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessSignIn;
