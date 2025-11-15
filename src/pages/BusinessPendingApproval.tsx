import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBusinessProjects } from "@/contexts/BusinessProjectsContext";
import { CheckCircle2, Clock, Mail, Building2, AlertTriangle, Loader2 } from "lucide-react";

const BusinessPendingApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearBusinessProjects } = useBusinessProjects();
  const { email, businessName } = location.state || {
    email: "business@example.com",
    businessName: "Your Business"
  };

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [autoApproveCountdown, setAutoApproveCountdown] = useState(5);
  const [showAutoApprove, setShowAutoApprove] = useState(false);

  const simulationSteps = [
    "Admin reviewing documents...",
    "Verifying business license...", 
    "Checking location...",
    "Approved! ✓"
  ];

  // Removed auto-approval - now using prominent manual button

  // Auto-approve countdown (optional - can be enabled)
  useEffect(() => {
    if (showAutoApprove && autoApproveCountdown > 0) {
      const timer = setTimeout(() => {
        setAutoApproveCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showAutoApprove && autoApproveCountdown === 0) {
      handleSimulateApproval();
    }
  }, [autoApproveCountdown, showAutoApprove]);

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    setSimulationStep(0);

    const stepInterval = setInterval(() => {
      setSimulationStep(prev => {
        if (prev < simulationSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            // Store approval status
            localStorage.setItem("businessApprovalStatus", "approved");
            localStorage.setItem("businessApprovalData", JSON.stringify({
              email,
              businessName,
              approvedAt: new Date().toISOString()
            }));
            
            // Ensure projects are cleared for new business
            clearBusinessProjects();
            
            navigate("/business-dashboard", { 
              state: { 
                email, 
                businessName,
                isNewlyApproved: true 
              } 
            });
          }, 1000);
          return prev;
        }
      });
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Demo Mode Badge */}
      <div className="p-2 bg-muted border-b">
        <div className="max-w-md mx-auto">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            DEMO MODE
          </Badge>
        </div>
      </div>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 text-center">
          
          {/* PROMINENT Demo Controls - Moved to Top */}
          <Card className="p-4 border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-900">⚡ Demo Mode - Skip Waiting</h3>
              </div>
              
              <p className="text-sm text-green-800 font-medium">
                For evaluation: Simulate instant business approval
              </p>

              {/* Simulation Loading */}
              {isSimulating && (
                <Card className="p-3 bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <span className="text-base font-medium text-blue-900">
                      {simulationSteps[simulationStep]}
                    </span>
                  </div>
                </Card>
              )}

              {/* Prominent Demo Button */}
              {!isSimulating && (
                <Button
                  onClick={handleSimulateApproval}
                  className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  SIMULATE APPROVAL NOW
                </Button>
              )}
            </div>
          </Card>
          
          {/* Success Animation */}
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <Clock className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground">
              Normally reviewed in 24-48 hours
            </p>
          </div>

          {/* Business Info Card */}
          <Card className="p-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold">{businessName}</h2>
                  <p className="text-sm text-muted-foreground">Business Application</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Review Status</p>
                    <p className="text-xs text-muted-foreground">Under Review</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Notification Email</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Review Process Info */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="space-y-4 text-left">
              <h3 className="font-semibold text-blue-900">What happens next?</h3>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Document Verification</p>
                    <p className="text-xs text-blue-700">We'll verify your business license or tax ID</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Location Check</p>
                    <p className="text-xs text-blue-700">Confirm you're within 10 miles of a university</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Account Activation</p>
                    <p className="text-xs text-blue-700">You'll receive login credentials via email</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Review typically takes 24-48 hours</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              We're reviewing your business verification documents and will email you at{" "}
              <span className="font-medium text-foreground">{email}</span> when approved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Return to Home
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/business-signin")}
              className="w-full h-12 text-lg font-semibold border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
              size="lg"
            >
              Already Approved? Sign In
            </Button>
          </div>

          {/* Help Section */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Need Help?</h4>
              <p className="text-xs text-muted-foreground">
                If you have questions about your application, contact us at{" "}
                <a href="mailto:business@campusbuild.com" className="text-blue-600 hover:underline">
                  business@campusbuild.com
                </a>
              </p>
            </div>
          </Card>

          {/* Note about demo */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Demo controls are available at the top for easy evaluation
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessPendingApproval;
