import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useBusinessProjects, type BusinessProject } from "@/contexts/BusinessProjectsContext";
import { 
  ArrowLeft,
  Plus,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Settings
} from "lucide-react";

const MyProjects = () => {
  const navigate = useNavigate();
  const { businessProjects, clearBusinessProjects } = useBusinessProjects();
  
  // Ensure new businesses (not signed in) have empty projects initially
  const isSignedInUser = localStorage.getItem('userSignedUp') === 'true';
  const hasCampusBuildBusiness = localStorage.getItem('campusBuildBusiness');
  
  // Clear projects on mount ONLY if it's a new business AND projects contain mock data IDs
  // (This prevents clearing newly posted projects)
  useEffect(() => {
    if (!isSignedInUser && hasCampusBuildBusiness && businessProjects.length > 0) {
      // Only clear if projects have mock data IDs (from previous sign-in session)
      // Mock data IDs are "1", "2", "3", "4"
      const hasMockData = businessProjects.some(p => ["1", "2", "3", "4"].includes(p.id));
      if (hasMockData) {
        clearBusinessProjects();
      }
    }
  }, []); // Only run once on mount
  
  // Use projects directly from context - they should be empty for new businesses initially
  // and populated when they post projects
  const projects: BusinessProject[] = businessProjects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <BarChart3 className="h-4 w-4" />;
      case "review": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "draft": return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filterProjects = (status: string) => {
    switch (status) {
      case "active": return projects.filter(p => p.status === "active");
      case "review": return projects.filter(p => p.status === "review");
      case "completed": return projects.filter(p => p.status === "completed");
      case "draft": return projects.filter(p => p.status === "draft");
      default: return projects;
    }
  };

  const ProjectCard = ({ project }: { project: BusinessProject }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold truncate">{project.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Badge className={`${getStatusColor(project.status)} flex-shrink-0`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(project.status)}
              <span className="capitalize text-xs sm:text-sm">{project.status}</span>
            </div>
          </Badge>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">${project.budget}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{project.timeline}</span>
          </div>
          {project.team && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{project.team.name}</span>
            </div>
          )}
          {project.applications && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{project.applications} applications</span>
            </div>
          )}
        </div>

        {/* Progress Bar (for active projects) */}
        {project.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {project.status === "active" && (
            <Button
              onClick={() => navigate("/project-dashboard", { state: { project } })}
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10"
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Manage</span>
            </Button>
          )}
          
          {project.status === "review" && (
            <Button
              onClick={() => navigate("/review-applications", { state: { project } })}
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Review</span>
            </Button>
          )}
          
          {project.status === "completed" && (
            <Button
              onClick={() => navigate("/business-success", { state: { project } })}
              variant="outline"
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10"
            >
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Results</span>
            </Button>
          )}
          
          {project.status === "draft" && (
            <Button
              onClick={() => navigate("/post-project", { state: { project, isEditing: true } })}
              className="flex-1 gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Edit</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/messages", { state: { projectId: project.id } })}
            className="h-9 w-9 sm:h-10 sm:w-10"
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-3 overflow-hidden flex-1">
            <Button
              variant="ghost"
              onClick={() => navigate("/business-dashboard")}
              className="gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Button>
            <h1 className="text-lg sm:text-2xl font-bold text-primary">CampusBuild</h1>
          </div>
          <Button
            onClick={() => navigate("/post-project")}
            className="gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">New Project</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-3 sm:px-4 py-4 sm:py-6">
        <div className="mx-auto max-w-6xl">
          {/* Page Title */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">My Projects</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage all your posted projects</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{filterProjects("active").length}</p>
                </div>
              </div>
            </Card> */}
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">In Review</p>
                  <p className="text-xl sm:text-2xl font-bold">{filterProjects("review").length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Completed</p>
                  <p className="text-xl sm:text-2xl font-bold">{filterProjects("completed").length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Spent</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    ${filterProjects("completed").reduce((sum, p) => sum + p.budget, 0)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Projects Tabs */}
          {projects.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto">
                  <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">No projects yet</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Start by posting your first project to connect with talented student teams
                </p>
                <Button 
                  onClick={() => navigate("/post-project")}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Project
                </Button>
              </div>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-5 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm px-1 sm:px-3 py-2">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Active</TabsTrigger>
                <TabsTrigger value="review" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Review</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Done</TabsTrigger>
                <TabsTrigger value="draft" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Drafts</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 sm:space-y-4">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-3 sm:space-y-4">
                {filterProjects("active").map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>

              <TabsContent value="review" className="space-y-3 sm:space-y-4">
                {filterProjects("review").map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-3 sm:space-y-4">
                {filterProjects("completed").map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>

              <TabsContent value="draft" className="space-y-3 sm:space-y-4">
                {filterProjects("draft").map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyProjects;
