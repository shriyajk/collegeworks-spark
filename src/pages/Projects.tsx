import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { useAppliedProjects } from "@/contexts/AppliedProjectsContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  User, 
  Home, 
  Users, 
  Briefcase, 
  BarChart,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  Star,
  MessageSquare,
  FileText,
  Search,
  X,
  Trash2,
  ArrowLeft,
} from "lucide-react";

interface ProjectApplication {
  id: string;
  title: string;
  company: string;
  status: "pending" | "accepted" | "rejected";
  appliedDate: string;
  budget: string;
  teamMembers?: string[];
}

interface ActiveProject {
  id: string;
  title: string;
  company: string;
  progress: number;
  deadline: string;
  budget: string;
  teamMembers: string[];
  nextMilestone: string;
  unreadMessages: number;
}

interface CompletedProject {
  id: string;
  title: string;
  company: string;
  completedDate: string;
  budget: string;
  rating: number;
  teamMembers: string[];
  earnings: string;
}

// Mock data for demonstration
const APPLIED_PROJECTS: ProjectApplication[] = [
  {
    id: "1",
    title: "Coffee Shop Website",
    company: "Bean There Cafe",
    status: "pending",
    appliedDate: "2024-01-15",
    budget: "$250",
    teamMembers: ["You", "Sarah (Designer)"]
  },
  {
    id: "2", 
    title: "Student Startup MVP",
    company: "TechLaunch",
    status: "accepted",
    appliedDate: "2024-01-10",
    budget: "$450",
    teamMembers: ["You", "Mike (Designer)", "Alex (Backend)"]
  },
  {
    id: "3",
    title: "E-commerce Platform",
    company: "ShopLocal",
    status: "rejected",
    appliedDate: "2024-01-05",
    budget: "$800",
    teamMembers: ["You", "Emma (Designer)"]
  }
];

const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: "2",
    title: "Student Startup MVP",
    company: "TechLaunch", 
    progress: 65,
    deadline: "2024-02-15",
    budget: "$450",
    teamMembers: ["You", "Mike", "Alex"],
    nextMilestone: "Frontend prototype review",
    unreadMessages: 3
  }
];

const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: "4",
    title: "Campus Club Website",
    company: "IEEE Club",
    completedDate: "2024-01-01",
    budget: "$200",
    rating: 5.0,
    teamMembers: ["You", "Lisa (Designer)"],
    earnings: "$100"
  },
  {
    id: "5",
    title: "Local Restaurant Menu",
    company: "Pasta Palace",
    completedDate: "2023-12-15",
    budget: "$150",
    rating: 4.8,
    teamMembers: ["You"],
    earnings: "$150"
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("applied");
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  const { appliedProjects: contextAppliedProjects, clearAppliedProjects } = useAppliedProjects();
  
  // Check if user signed in (not created account) - use localStorage to persist across navigations
  const fromSignIn = localStorage.getItem('userSignedUp') === 'true';
  
  // Clear applied projects only when a new account is created
  // We use a flag in localStorage to track if we've already cleared for this session
  useEffect(() => {
    const isSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const hasCampusBuildUser = localStorage.getItem('campusBuildUser');
    const hasClearedForNewAccount = sessionStorage.getItem('clearedAppliedProjectsForNewAccount');
    
    // Only clear if:
    // 1. User just signed up (has campusBuildUser but no userSignedUp)
    // 2. We haven't already cleared for this new account session
    // 3. Context has projects (from a previous session)
    if (!isSignedUp && hasCampusBuildUser && !hasClearedForNewAccount && contextAppliedProjects.length > 0) {
      clearAppliedProjects();
      sessionStorage.setItem('clearedAppliedProjectsForNewAccount', 'true');
    }
  }, []); // Only run once on mount
  
  // For sign-in users, use context directly (already populated with mock data)
  // For new accounts, use context applied projects (starts as empty array)
  // Convert context projects to ProjectApplication format
  const appliedProjects: ProjectApplication[] = contextAppliedProjects.map(ap => {
    // For sign-in users, use mock data team members for known projects
    let teamMembers: string[] | undefined = undefined;
    if (fromSignIn) {
      if (ap.id === "1") {
        teamMembers = ["You", "Sarah (Designer)"];
      } else if (ap.id === "2") {
        teamMembers = ["You", "Mike (Designer)", "Alex (Backend)"];
      } else if (ap.id === "3") {
        teamMembers = ["You", "Emma (Designer)"];
      }
    }
    
    return {
      id: ap.id,
      title: ap.title,
      company: ap.company || "Client",
      status: ap.status === "Applied" ? "pending" as const : "accepted" as const,
      appliedDate: fromSignIn && ["1", "2", "3"].includes(ap.id) 
        ? (ap.id === "1" ? "2024-01-15" : ap.id === "2" ? "2024-01-10" : "2024-01-05")
        : new Date().toISOString().split('T')[0],
      budget: ap.budget || "$0",
      teamMembers: teamMembers,
    };
  });
  
  // State for simulated projects (for new accounts)
  const [simulatedActiveProjects, setSimulatedActiveProjects] = useState<ActiveProject[]>([]);
  
  // For sign-in users, show mock data for active and completed projects
  // For new accounts, all projects start empty (no mock data)
  const activeProjects: ActiveProject[] = fromSignIn ? ACTIVE_PROJECTS : simulatedActiveProjects;
  const completedProjects: CompletedProject[] = fromSignIn ? COMPLETED_PROJECTS : [];
  
  // Function to simulate an active project
  const simulateActiveProject = () => {
    const mockActiveProject: ActiveProject = {
      id: `sim-active-${Date.now()}`,
      title: "Coffee Shop Website",
      company: "Bean There Cafe",
      progress: 45,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks from now
      budget: "$250",
      teamMembers: ["You", "Sarah (Designer)"],
      nextMilestone: "Complete homepage design",
      unreadMessages: 2
    };
    setSimulatedActiveProjects([mockActiveProject]);
  };
  
  // Function to remove simulated active project
  const removeSimulatedActiveProject = () => {
    setSimulatedActiveProjects([]);
  };
  
  // Calculate stats based on actual data - all start at 0 for new accounts
  // Each time user applies, contextAppliedProjects.length increases, so totalApplied increases
  const totalApplied = appliedProjects.length;
  const totalActive = activeProjects.length;
  const totalCompleted = completedProjects.length;
  const totalEarned = completedProjects.reduce((sum, p) => sum + parseFloat(p.earnings.replace('$', '')), 0);
  const successRate = totalApplied > 0 ? Math.round((totalActive + totalCompleted) / totalApplied * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "accepted":
        return "bg-success text-success-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle2 className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* For new account creation: back button to All Projects */}
            {!fromSignIn && (
              <Button
                variant="ghost"
                onClick={() => navigate("/feed")}
                className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Back
              </Button>
            )}
            {/* For signed-in users: back button to Sign In */}
            {fromSignIn && (
              <Button
                variant="ghost"
                onClick={() => navigate("/student-signin")}
                className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Back
              </Button>
            )}
            <h1 className="text-lg sm:text-2xl font-bold text-primary">CampusBuild</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={confirmGoHome}
              className="gap-1 sm:gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-sm sm:text-base px-2 sm:px-4"
            >
              <Home className="h-4 w-4" />
              <span className="hidden xs:inline">Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
          
          {/* Page Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">My Projects</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Track your applications, active work, and completed projects</p>
          </div>
          
          {/* Stats & Animation Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Quick Stats */}
            <Card className="p-4 sm:p-6 shadow-card hover-lift transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Your Progress</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalApplied}</div>
                  <div className="text-sm text-gray-600">Applied</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalActive}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Earned:</span>
                  <span className="font-semibold text-green-600">${totalEarned}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold text-purple-600">{successRate}%</span>
                </div>
              </div>
              
              {/* Simulate Options - Only show for new accounts */}
              {!fromSignIn && (
                <div className="mt-4 pt-4 border-t">
                  {totalActive === 0 ? (
                    <>
                      <p className="text-xs text-gray-500 mb-2 text-center">Demo Option:</p>
                      <Button
                        onClick={simulateActiveProject}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        + Simulate Active Project
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-gray-500 mb-2 text-center">Demo Project Active:</p>
                      <Button
                        onClick={removeSimulatedActiveProject}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove Simulated Project
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Card>

            {/* Professional Purple Animation */}
            <Card 
              className="p-4 sm:p-6 card-enhanced relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-50/50 to-purple-100/30 border-purple-200/50 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => navigate("/feed", { state: { fromMyProjects: true } })}
            >
              <div className="relative z-10 h-full flex flex-col justify-center items-center min-h-[200px]">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  {/* Animated gradient orb */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-20 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-purple-600 rounded-full opacity-55 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.2s' }}></div>
                  <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.8s' }}></div>
                  
                  {/* Central icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 text-purple-600 opacity-80 animate-float-briefcase" />
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-purple-700 font-medium text-center">
                  Ready to explore new opportunities?
                </p>
              </div>
              
              {/* Subtle animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-purple-300/20"></div>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="applied" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Applied ({totalApplied})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Active ({totalActive})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed ({totalCompleted})
              </TabsTrigger>
            </TabsList>

            {/* Applied Projects Tab */}
            <TabsContent value="applied" className="space-y-4">
              {appliedProjects.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You haven't applied to any projects yet.</h3>
                  <p className="text-muted-foreground">
                    Start applying to projects to build your portfolio
                  </p>
                </Card>
              ) : (
                appliedProjects.map((project) => {
                  // Get level from context if available
                  const contextProject = contextAppliedProjects.find(ap => ap.id === project.id);
                  const level = contextProject?.level;
                  
                  return (
                    <Card key={project.id} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <div className="flex items-center gap-2">
                              {level && (
                                <Badge variant="outline" className="text-xs">
                                  {level}
                                </Badge>
                              )}
                              <p className="text-muted-foreground">{project.company}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status}</span>
                          </Badge>
                        </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Applied: {new Date(project.appliedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{project.budget}</span>
                        </div>
                      </div>

                      {project.teamMembers && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Team Members:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.teamMembers.map((member, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.status === "accepted" && (
                        <div className="pt-2 border-t">
                          <Button 
                            onClick={() => navigate(`/project/${project.id}/workspace`)}
                            className="w-full"
                          >
                            Go to Workspace
                          </Button>
                        </div>
                      )}
                      </div>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            {/* Active Projects Tab */}
            <TabsContent value="active" className="space-y-4">
              {activeProjects.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Projects</h3>
                  <p className="text-muted-foreground mb-4">
                    Your accepted projects will appear here
                  </p>
                  <Button onClick={() => navigate("/feed")} className="w-full sm:w-auto">
                    Find Projects
                  </Button>
                </Card>
              ) : (
                activeProjects.map((project) => {
                  const isSimulated = project.id.startsWith('sim-active');
                  return (
                  <Card key={project.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            {isSimulated && (
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                                Demo
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{project.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {isSimulated && !fromSignIn && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={removeSimulatedActiveProject}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Remove simulated project"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <Badge variant="secondary">{project.unreadMessages} new</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{project.budget}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Next Milestone:</p>
                        <p className="text-sm text-muted-foreground">{project.nextMilestone}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Team:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.teamMembers.map((member, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t flex gap-2">
                        <Button 
                          onClick={() => navigate(`/project/${project.id}/workspace`)}
                          className="flex-1"
                        >
                          Open Workspace
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate("/messages", { state: { projectId: project.id } })}
                          className="flex-1"
                        >
                          Messages ({project.unreadMessages})
                        </Button>
                      </div>
                    </div>
                  </Card>
                  );
                })
              )}
            </TabsContent>

            {/* Completed Projects Tab */}
            <TabsContent value="completed" className="space-y-4">
              {completedProjects.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Projects</h3>
                  <p className="text-muted-foreground mb-4">
                    Your finished projects will appear here
                  </p>
                  <Button onClick={() => navigate("/feed")}>
                    Start Your First Project
                  </Button>
                </Card>
              ) : (
                completedProjects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-muted-foreground">{project.company}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{project.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-success" />
                          <span className="text-success font-medium">Earned: {project.earnings}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Team:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.teamMembers.map((member, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => navigate(`/project/${project.id}/portfolio`)}
                          className="flex-1"
                        >
                          View in Portfolio
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate(`/project/${project.id}/review`)}
                          className="flex-1"
                        >
                          Client Review
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 border-t bg-background">
        <div className="flex h-16 items-center justify-around px-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/feed")}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Browse</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/find-teams")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">Teams</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-primary"
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Projects</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={confirmGoHome}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
        </div>
      </nav>
      
      <ConfirmationDialog />
    </div>
  );
};

export default Projects;
