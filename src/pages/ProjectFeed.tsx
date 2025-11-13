import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Home, Users, Briefcase, BarChart } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary">CampusBuild</h1>
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
            className="cursor-pointer whitespace-nowrap px-4 py-2"
            onClick={() => setActiveFilter("all")}
          >
            All
          </Badge>
          <Badge
            variant={activeFilter === "beginner" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 ${
              activeFilter === "beginner" ? "bg-success text-success-foreground hover:bg-success/90" : ""
            }`}
            onClick={() => setActiveFilter("beginner")}
          >
            🟢 Beginner
          </Badge>
          <Badge
            variant={activeFilter === "intermediate" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 ${
              activeFilter === "intermediate" ? "bg-warning text-warning-foreground hover:bg-warning/90" : ""
            }`}
            onClick={() => setActiveFilter("intermediate")}
          >
            🟡 Intermediate
          </Badge>
          <Badge
            variant={activeFilter === "advanced" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap px-4 py-2 ${
              activeFilter === "advanced" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""
            }`}
            onClick={() => setActiveFilter("advanced")}
          >
            🔴 Advanced
          </Badge>
        </div>
      </div>

      {/* Project Cards */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge className={getLevelColor(project.level)}>
                    {getLevelIcon(project.level)} {project.level.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{project.company}</span>
                    {project.rating && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          ⭐ {project.rating}
                        </span>
                      </>
                    )}
                    {project.isNew && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    💰 {project.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    📅 {project.duration}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Skills: </span>
                  <span>{project.skills.join(" • ")}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    👁 {project.viewingCount} students viewing
                  </span>
                  <Button variant="default" size="sm" className="gap-2">
                    View Details →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 border-t bg-background">
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
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/stats")}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Stats</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1 text-muted-foreground"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default ProjectFeed;
