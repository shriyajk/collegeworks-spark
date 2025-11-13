import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  CheckCircle2,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Eye,
  Edit,
  BarChart3
} from "lucide-react";

const WaitingForApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    budget: "250",
    timeline: "1-2 weeks",
    difficulty: "beginner",
    skills: ["Frontend", "Design"],
    postedAt: new Date().toISOString()
  };

  const [applicationCount, setApplicationCount] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Auto-increment applications for demo (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      if (applicationCount < 3) {
        setApplicationCount(prev => prev + 1);
      }
    }, 10000); // Add 1 application every 10 seconds for demo

    return () => clearInterval(timer);
  }, [applicationCount]);

  const handleSimulateApplications = () => {
    setIsSimulating(true);
    
    // Animate application count increase
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setApplicationCount(count);
      
      if (count >= 8) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/review-applications", { 
            state: { 
              project: {
                ...project,
                applicationCount: 8
              }
            } 
          });
        }, 1000);
      }
    }, 300);
  };

  const getTimeAgo = () => {
    const now = new Date();
    const posted = new Date(project.postedAt);
    const diffMinutes = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/business-dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold">{project.title}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Live - Accepting Applications
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          
          {/* Project Posted Success */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  Project Posted Successfully!
                </h2>
                <p className="text-green-800">
                  Students can now apply to work on your project
                </p>
              </div>
            </div>
          </Card>

          {/* What's Happening */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">What's Happening</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm">Your project is live and visible to 500+ students</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-sm">Expect 5-10 applications within 24-48 hours</p>
              </div>
            </div>
          </Card>

          {/* Your Project Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Project</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{project.title}</h4>
                <span className="text-sm text-muted-foreground">Posted {getTimeAgo()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{project.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.skills?.join(", ")}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Application Counter */}
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  {applicationCount} Application{applicationCount !== 1 ? 's' : ''} Received
                </h3>
                <p className="text-muted-foreground">
                  {applicationCount === 0 
                    ? "We'll notify you when teams apply" 
                    : applicationCount < 5 
                    ? "More applications coming in..."
                    : "Great response! Review applications now"
                  }
                </p>
              </div>
              
              {applicationCount >= 5 && (
                <Button
                  onClick={() => navigate("/review-applications", { state: { project } })}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Review {applicationCount} Applications
                </Button>
              )}
            </div>
          </Card>

          {/* Demo Simulation Section */}
          <Card className="p-4 border-2 border-dashed border-gray-300 bg-gray-50">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-sm text-gray-700">Demo Controls (for prototype only)</h4>
              </div>
              
              <div className="space-y-2 text-xs text-gray-600">
                <p>Normally teams apply within 24 hours</p>
                <p>For this demo, simulate instant applications:</p>
              </div>

              {isSimulating && (
                <Card className="p-3 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-blue-900">
                      Simulating applications... {applicationCount}/8
                    </p>
                  </div>
                </Card>
              )}

              {!isSimulating && applicationCount < 8 && (
                <Button
                  onClick={handleSimulateApplications}
                  disabled={isSimulating}
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  variant="outline"
                >
                  Simulate 8 Applications
                </Button>
              )}

              <div className="pt-2 border-t border-gray-300">
                <p className="text-xs text-gray-500 text-center">
                  These controls are only visible in demo mode
                </p>
              </div>
            </div>
          </Card>

          {/* Bottom Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/project-detail", { state: { project } })}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View Project Details
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/post-project", { state: { project, isEditing: true } })}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Project
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/business-dashboard")}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WaitingForApplications;
