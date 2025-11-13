import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
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
  const [activeTab, setActiveTab] = useState("applied");
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  
  // Check if user is signed up (in a real app, this would come from auth context)
  // For now, we'll check localStorage or default to empty for new users
  const isSignedUp = localStorage.getItem('userSignedUp') === 'true';
  
  // Use empty arrays for new users, mock data for signed up users
  const appliedProjects = isSignedUp ? APPLIED_PROJECTS : [];
  const activeProjects = isSignedUp ? ACTIVE_PROJECTS : [];
  const completedProjects = isSignedUp ? COMPLETED_PROJECTS : [];
  
  // Calculate stats based on actual data
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
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">My Projects</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={confirmGoHome}
              className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          
          {/* Stats & Browse Projects Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Stats */}
            <Card className="p-6 card-enhanced">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
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
            </Card>

            {/* Browse Projects CTA */}
            <Card className="p-6 card-enhanced gradient-purple text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2">Find New Projects</h3>
                <p className="text-white/90 text-sm mb-4">
                  Discover exciting projects from local businesses
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
                  <span>• 12 new projects this week</span>
                </div>
                <Button
                  onClick={() => navigate("/feed")}
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  size="lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Available Projects
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
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
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start applying to projects to build your portfolio
                  </p>
                  <Button onClick={() => navigate("/feed")}>
                    Browse Projects
                  </Button>
                </Card>
              ) : (
                appliedProjects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-muted-foreground">{project.company}</p>
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
                ))
              )}
            </TabsContent>

            {/* Active Projects Tab */}
            <TabsContent value="active" className="space-y-4">
              {activeProjects.length === 0 ? (
                <Card className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Projects</h3>
                  <p className="text-muted-foreground mb-4">
                    Your accepted projects will appear here
                  </p>
                  <Button onClick={() => navigate("/feed")}>
                    Find Projects
                  </Button>
                </Card>
              ) : (
                activeProjects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-muted-foreground">{project.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
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
                          onClick={() => navigate(`/project/${project.id}/messages`)}
                          className="flex-1"
                        >
                          Messages ({project.unreadMessages})
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Completed Projects Tab */}
            <TabsContent value="completed" className="space-y-4">
              {completedProjects.length === 0 ? (
                <Card className="p-8 text-center">
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
            onClick={() => navigate("/teams")}
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
