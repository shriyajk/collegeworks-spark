import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  DollarSign,
  Calendar,
  Target,
  Plus
} from "lucide-react";

const ProjectSubmitted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    budget: "250",
    timeline: "1-2 weeks",
    teamSize: [3],
    difficulty: "beginner",
    skills: ["Frontend", "Design"],
    status: "under_review",
    total: 260
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 text-center">
          
          {/* Success Animation */}
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Project Submitted for Review!
            </h1>
            <p className="text-muted-foreground">
              2 peer reviewers are checking your project scope
            </p>
          </div>

          {/* Timeline Info */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Review Process</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Scope Review</p>
                    <p className="text-xs text-blue-700">Experienced students check project feasibility</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Approval & Go Live</p>
                    <p className="text-xs text-blue-700">Project becomes visible to student teams</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Team Applications</p>
                    <p className="text-xs text-blue-700">Students form teams and apply to your project</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200">
                <p className="text-sm font-medium text-blue-900">
                  ⏰ Typically approved within 24 hours
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  We'll notify you when it goes live
                </p>
              </div>
            </div>
          </Card>

          {/* Project Preview */}
          <Card className="p-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{project.title}</h3>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Under Review
                </Badge>
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
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.teamSize?.[0] || 3} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{project.difficulty}</span>
                </div>
              </div>
              
              {project.skills && project.skills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skills needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Confirmation */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Payment Processed</span>
              </div>
              <p className="text-xs text-green-700">
                Total charged: ${project.total} (includes $10 posting fee)
              </p>
              <p className="text-xs text-green-700">
                Funds held in escrow until project completion
              </p>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-3 text-left">
              <h4 className="font-medium text-sm">What happens next?</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• You'll receive an email when your project is approved</p>
                <p>• Student teams will start applying within hours of going live</p>
                <p>• You can review team applications and select the best fit</p>
                <p>• Work begins immediately after team selection</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/post-project")}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              size="lg"
            >
              <Plus className="h-4 w-4" />
              Post Another Project
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/business-dashboard")}
              className="w-full h-12 text-lg font-semibold border-2"
              size="lg"
            >
              View Dashboard
            </Button>
          </div>

          {/* Help Section */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-blue-900">Need Help?</h4>
              <p className="text-xs text-blue-800">
                Questions about the review process? Contact us at{" "}
                <a href="mailto:projects@campusbuild.com" className="underline hover:no-underline">
                  projects@campusbuild.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProjectSubmitted;
