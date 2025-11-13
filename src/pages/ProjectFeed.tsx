import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Home, Users, Briefcase, BarChart, FolderOpen } from "lucide-react";
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
];

const ProjectFeed = () => {
  const navigate = useNavigate();
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

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
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/projects")}
              className="gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <FolderOpen className="h-4 w-4" />
              My Projects
            </Button>
            <h1 className="text-2xl font-bold text-gradient">CampusBuild</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
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

      {/* Filter Bar */}
      <div className="border-b bg-background px-4 py-3 space-y-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects (24 projects)</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <Badge
            variant={activeFilter === "all" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all-smooth hover-scale ${
              activeFilter === "all" ? "gradient-purple text-white shadow-lg" : "hover:border-purple-300"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Projects
          </Badge>
          <Badge
            variant={activeFilter === "beginner" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all-smooth hover-scale ${
              activeFilter === "beginner" ? "gradient-success text-white shadow-lg" : "hover:border-emerald-300"
            }`}
            onClick={() => setActiveFilter("beginner")}
          >
            🟢 Beginner
          </Badge>
          <Badge
            variant={activeFilter === "intermediate" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all-smooth hover-scale ${
              activeFilter === "intermediate" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg" : "hover:border-amber-300"
            }`}
            onClick={() => setActiveFilter("intermediate")}
          >
            🟡 Intermediate
          </Badge>
          <Badge
            variant={activeFilter === "advanced" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all-smooth hover-scale ${
              activeFilter === "advanced" ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg" : "hover:border-rose-300"
            }`}
            onClick={() => setActiveFilter("advanced")}
          >
            🔴 Advanced
          </Badge>
        </div>
      </div>

      {/* Project Cards */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-2xl space-y-4 stagger-children">
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
                className={`cursor-pointer rounded-xl border-l-4 ${getBorderColor(project.level)} bg-white p-6 shadow-md hover:shadow-xl transition-all-smooth hover-lift card-enhanced`}
                onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
              >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge className={`${
                    project.level === "beginner" ? "badge-beginner" :
                    project.level === "intermediate" ? "badge-intermediate" :
                    "badge-advanced"
                  } font-semibold`}>
                    {getLevelIcon(project.level)} {project.level.toUpperCase()}
                  </Badge>
                  {project.isNew && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse-glow">
                      ✨ NEW
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{project.company}</span>
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

                <div className="flex items-center gap-6 text-sm font-medium">
                  <span className="flex items-center gap-2 text-emerald-600">
                    💰 {project.budget}
                  </span>
                  <span className="flex items-center gap-2 text-blue-600">
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
      
      <ConfirmationDialog />
    </div>
  );
};

export default ProjectFeed;
