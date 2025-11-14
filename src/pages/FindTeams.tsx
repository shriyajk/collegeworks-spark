import { useNavigate } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Home,
  Users,
  Briefcase,
  Search,
  Clock,
  Eye,
  Star,
} from "lucide-react";

interface Project {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  company: string;
  rating?: number;
  budget: string;
  duration: string;
  skills: string[];
  viewingCount: number;
  isNew?: boolean;
}

const PROJECTS: Project[] = [
  // Beginner Projects
  {
    id: "1",
    level: "beginner",
    title: "Coffee Shop Website",
    company: "Bean There Cafe",
    rating: 4.8,
    budget: "$250",
    duration: "2 weeks",
    skills: ["Frontend", "Design"],
    viewingCount: 12,
  },
  {
    id: "3",
    level: "beginner",
    title: "Campus Club Website",
    company: "IEEE Club",
    rating: 5.0,
    budget: "$200",
    duration: "2 weeks",
    skills: ["Frontend", "CSS"],
    viewingCount: 15,
  },
  {
    id: "4",
    level: "beginner",
    title: "Local Bakery Landing Page",
    company: "Sweet Treats Bakery",
    rating: 4.6,
    budget: "$180",
    duration: "1.5 weeks",
    skills: ["Frontend", "Design"],
    viewingCount: 9,
  },
  {
    id: "5",
    level: "beginner",
    title: "Portfolio Website",
    company: "Freelance Photographer",
    rating: 4.9,
    budget: "$150",
    duration: "1 week",
    skills: ["Frontend", "HTML"],
    viewingCount: 22,
  },
  {
    id: "6",
    level: "beginner",
    title: "Event Registration Form",
    company: "Community Center",
    rating: 4.7,
    budget: "$120",
    duration: "1 week",
    skills: ["Frontend", "Forms"],
    viewingCount: 18,
  },
  // Intermediate Projects
  {
    id: "2",
    level: "intermediate",
    title: "Student Startup MVP",
    company: "TechLaunch",
    isNew: true,
    budget: "$450",
    duration: "3 weeks",
    skills: ["Full Stack", "Design"],
    viewingCount: 8,
  },
  {
    id: "7",
    level: "intermediate",
    title: "E-commerce Product Catalog",
    company: "Local Retail Store",
    rating: 4.8,
    budget: "$600",
    duration: "4 weeks",
    skills: ["Full Stack", "Database"],
    viewingCount: 14,
  },
  {
    id: "8",
    level: "intermediate",
    title: "Task Management App",
    company: "Small Business Solutions",
    rating: 4.9,
    budget: "$550",
    duration: "3.5 weeks",
    skills: ["Full Stack", "API"],
    viewingCount: 11,
  },
  {
    id: "9",
    level: "intermediate",
    title: "Restaurant Ordering System",
    company: "DineIn Restaurant",
    rating: 4.7,
    budget: "$500",
    duration: "3 weeks",
    skills: ["Backend", "Frontend"],
    viewingCount: 16,
  },
  {
    id: "10",
    level: "intermediate",
    title: "Social Media Dashboard",
    company: "Marketing Agency",
    rating: 4.6,
    budget: "$650",
    duration: "4 weeks",
    skills: ["Full Stack", "API Integration"],
    viewingCount: 13,
  },
  {
    id: "11",
    level: "intermediate",
    title: "Learning Management System",
    company: "Online Education Platform",
    rating: 4.8,
    budget: "$700",
    duration: "5 weeks",
    skills: ["Full Stack", "Database"],
    viewingCount: 10,
  },
  // Advanced Projects
  {
    id: "12",
    level: "advanced",
    title: "Real-time Chat Application",
    company: "Tech Startup",
    rating: 4.9,
    budget: "$1200",
    duration: "6 weeks",
    skills: ["Full Stack", "WebSockets", "Real-time"],
    viewingCount: 7,
  },
  {
    id: "13",
    level: "advanced",
    title: "AI-Powered Analytics Platform",
    company: "Data Solutions Inc",
    rating: 5.0,
    budget: "$1500",
    duration: "8 weeks",
    skills: ["Full Stack", "AI/ML", "Data Visualization"],
    viewingCount: 5,
  },
  {
    id: "14",
    level: "advanced",
    title: "Blockchain Voting System",
    company: "SecureVote Technologies",
    rating: 4.8,
    budget: "$1800",
    duration: "10 weeks",
    skills: ["Blockchain", "Full Stack", "Security"],
    viewingCount: 4,
  },
  {
    id: "15",
    level: "advanced",
    title: "Microservices E-commerce Platform",
    company: "Enterprise Retail",
    rating: 4.9,
    budget: "$2000",
    duration: "12 weeks",
    skills: ["Microservices", "Cloud", "Full Stack"],
    viewingCount: 6,
  },
];

const FindTeams = () => {
  const navigate = useNavigate();
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-success text-success-foreground";
      case "intermediate":
        return "bg-warning text-warning-foreground";
      case "advanced":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return "🟢";
      case "intermediate":
        return "🟡";
      case "advanced":
        return "🔴";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-2xl font-bold text-primary">Find Teams</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={confirmGoHome}
              className="gap-1 sm:gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Available Projects
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Find teammates for these projects and start collaborating
            </p>
          </div>

          <div className="grid gap-4">
            {PROJECTS.map((project) => (
              <Card key={project.id} className="p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                            {project.title}
                          </h3>
                          {project.isNew && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {project.company}
                        </p>
                      </div>
                      <Badge className={getLevelColor(project.level)}>
                        <span className="mr-1">{getLevelIcon(project.level)}</span>
                        {project.level.charAt(0).toUpperCase() + project.level.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">${project.budget.replace('$', '')}</span>
                        <span>budget</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      {project.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{project.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.viewingCount} viewing</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 sm:w-auto w-full">
                    <Button
                      onClick={() => navigate("/teams", { state: { project, fromFindTeams: true } })}
                      className="flex-1 sm:flex-none sm:w-full"
                      size="lg"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Find Team
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="flex-1 sm:flex-none sm:w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
            className="flex flex-col gap-1 text-primary"
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

export default FindTeams;

