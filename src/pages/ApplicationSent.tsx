import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock,
  Home,
  Users,
  Briefcase,
  BarChart,
  User,
  MessageSquare,
  FolderOpen,
  Search
} from "lucide-react";

const ApplicationSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project, teamMembers } = location.state || {};
  
  // Animation states
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showMainText, setShowMainText] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  // Default data for demo purposes
  const defaultProject = {
    id: "1",
    title: "Coffee Shop Website",
    company: "Bean There Cafe"
  };
  
  const defaultTeamMembers = [
    { id: "you", name: "You", role: "Frontend Developer" },
    { id: "sarah", name: "Sarah Chen", role: "Designer" }
  ];

  const currentProject = project || defaultProject;
  const currentTeamMembers = teamMembers || defaultTeamMembers;

  // Progressive reveal animations
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowCheckmark(true), 300),
      setTimeout(() => setShowMainText(true), 500),
      setTimeout(() => setShowCard(true), 700),
      setTimeout(() => setShowButtons(true), 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Main Content - Centered Layout */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm space-y-8 text-center">
          
          {/* Success Checkmark with Animation */}
          <div className={`transition-all duration-500 ${showCheckmark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-12 w-12 text-success animate-pulse" />
            </div>
          </div>

          {/* Main Heading with Animation */}
          <div className={`transition-all duration-500 delay-200 ${showMainText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">Your team has applied for:</p>
              <p className="text-xl font-bold text-primary">
                {currentProject.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentProject.company} typically responds in 24-48 hours
              </p>
            </div>
          </div>

          {/* Team Summary Card with Animation */}
          <div className={`transition-all duration-500 delay-500 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-6 border-2 shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-left">Team Members:</h3>
                
                <div className="space-y-3 text-left">
                  {currentTeamMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">
                        {member.name} ({member.role})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t space-y-2 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applied:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-warning" />
                      <span className="font-medium text-warning">Under Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Meanwhile Section */}
          <div className={`transition-all duration-500 delay-700 ${showCard ? 'opacity-100' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Meanwhile, you can:</h3>
              <div className="space-y-2 text-sm text-muted-foreground text-left">
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4" />
                  <span>Browse more projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat with your team</span>
                </div>
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4" />
                  <span>Update your portfolio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons with Animation */}
          <div className={`transition-all duration-500 delay-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} space-y-3`}>
            <Button
              onClick={() => navigate("/feed")}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
              size="lg"
            >
              Browse Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/projects")}
              className="w-full h-12 text-lg font-semibold border-2"
              size="lg"
            >
              View Application Status
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 border-t bg-background">
        <div className="flex h-16 items-center justify-around px-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-primary"
            onClick={() => navigate("/feed")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/teams")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">Teams</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/projects")}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Projects</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default ApplicationSent;
