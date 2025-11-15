import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bell, User, Home, Users, Briefcase, BarChart, FolderOpen, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  company: string;
  rating?: number;
  isNew?: boolean;
  budget: string;
  duration: string;
  skills: string[];
  viewingCount: number;
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

const ProjectFeed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Check if user came from My Projects
  const fromMyProjects = location.state?.fromMyProjects === true;
  // Check if user signed in (not created account)
  const isSignedInUser = localStorage.getItem('userSignedUp') === 'true';
  
  // Determine back navigation:
  // - If signed in user → always go to Sign In page (sign in flow: All Projects → Sign In)
  // - If in create account flow → go to skills setup
  // - Otherwise → go to skills setup (default for new accounts)
  const getBackNavigation = () => {
    if (isSignedInUser) {
      // Sign in flow: All Projects → Sign In (always, regardless of where they came from)
      return "/student-signin";
    }
    // Create account flow: All Projects → Set up your profile
    return "/skills-setup";
  };

  const filteredProjects = PROJECTS.filter((project) =>
    activeFilter === "all" ? true : project.level === activeFilter
  );

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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b glass backdrop-blur-md border-white/20">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-3 overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(getBackNavigation())}
              className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-base sm:text-2xl font-bold text-gradient truncate">CampusBuild</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
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

      {/* Filter Bar */}
      <div className="border-b bg-background px-3 sm:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-full h-9 sm:h-10 text-sm sm:text-base">
            <SelectValue placeholder="Filter projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects (24 projects)</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Badge
            variant={activeFilter === "all" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all-smooth hover-scale ${
              activeFilter === "all" ? "gradient-purple text-white shadow-lg" : "hover:border-purple-300"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Projects
          </Badge>
          <Badge
            variant={activeFilter === "beginner" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all-smooth hover-scale ${
              activeFilter === "beginner" ? "gradient-success text-white shadow-lg" : "hover:border-emerald-300"
            }`}
            onClick={() => setActiveFilter("beginner")}
          >
            🟢 Beginner
          </Badge>
          <Badge
            variant={activeFilter === "intermediate" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all-smooth hover-scale ${
              activeFilter === "intermediate" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg" : "hover:border-amber-300"
            }`}
            onClick={() => setActiveFilter("intermediate")}
          >
            🟡 Intermediate
          </Badge>
          <Badge
            variant={activeFilter === "advanced" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all-smooth hover-scale ${
              activeFilter === "advanced" ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg" : "hover:border-rose-300"
            }`}
            onClick={() => setActiveFilter("advanced")}
          >
            🔴 Advanced
          </Badge>
        </div>
      </div>

      {/* Project Cards */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4 stagger-children">
          
          {/* Compact My Projects Info Bar */}
          <Card 
            onClick={() => navigate("/projects")}
            role="button"
            className="border-l-4 border-l-primary bg-purple-50/30 hover:bg-purple-50/50 transition-colors cursor-pointer"
          >
            <div className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Left side: Icon + Text */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-primary mb-0.5">
                      My Projects
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Quick access to your applications and active work.
                    </p>
                  </div>
                </div>
                
                {/* Right side: Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/projects");
                  }}
                  variant="default"
                  size="sm"
                  className="bg-gradient-primary hover:bg-gradient-primary-hover text-white shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
                >
                  View →
                </Button>
              </div>
            </div>
          </Card>
          
          {filteredProjects.map((project) => {
            const getBorderColor = (level: string) => {
              switch (level) {
                case "beginner": return "border-l-emerald-500";
                case "intermediate": return "border-l-amber-500";
                case "advanced": return "border-l-rose-500";
                default: return "border-l-gray-300";
              }
            };

            return (
              <div
                key={project.id}
                className={`cursor-pointer rounded-xl border-l-4 ${getBorderColor(project.level)} bg-white p-4 sm:p-6 shadow-md hover:shadow-xl transition-all-smooth hover-lift card-enhanced`}
                onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
              >
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge className={`${
                    project.level === "beginner" ? "badge-beginner" :
                    project.level === "intermediate" ? "badge-intermediate" :
                    "badge-advanced"
                  } font-semibold text-xs sm:text-sm`}>
                    {getLevelIcon(project.level)} {project.level.toUpperCase()}
                  </Badge>
                  {project.isNew && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow text-xs">
                      ✨ NEW
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <span className="font-medium truncate">{project.company}</span>
                    {project.rating && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-600 font-medium">
                          ⭐ {project.rating}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-1 sm:gap-2 text-emerald-600">
                    💰 {project.budget}
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 text-blue-600">
                    📅 {project.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`text-xs font-medium ${
                        skill === "React" ? "bg-blue-100 text-blue-700" :
                        skill === "Figma" ? "bg-purple-100 text-purple-700" :
                        skill === "CSS" ? "bg-orange-100 text-orange-700" :
                        skill === "Frontend" ? "bg-cyan-100 text-cyan-700" :
                        skill === "Design" ? "bg-pink-100 text-pink-700" :
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    👁 {project.viewingCount} students viewing
                  </span>
                  <Button className="btn-primary text-sm font-semibold px-6">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 border-t glass backdrop-blur-md border-white/20">
        <div className="flex h-16 items-center justify-around px-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
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
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/projects")}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Projects</span>
          </Button>
        </div>
      </nav>
      
      <ConfirmationDialog />
    </div>
  );
};

export default ProjectFeed;
