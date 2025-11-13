import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Button onClick={() => navigate("/feed")}>Back to Feed</Button>
        </div>
      </div>
    );
  }

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
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Project Details</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-4">
            <Badge className={getLevelColor(project.level)}>
              {getLevelIcon(project.level)} {project.level.toUpperCase()}
            </Badge>

            <div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <span>{project.company}</span>
                {project.rating && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      ⭐ {project.rating}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Budget:</span>
                <span>{project.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Duration:</span>
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Viewing:</span>
                <span>{project.viewingCount} students</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Project Description</h3>
              <p className="text-muted-foreground">
                This is a {project.level}-level project requiring {project.skills.join(", ")} skills. 
                The estimated timeline is {project.duration} with a budget of {project.budget}.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What You'll Do</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Collaborate with team members</li>
                <li>Build and deliver the project on time</li>
                <li>Communicate with the client</li>
                <li>Gain real-world experience</li>
              </ul>
            </div>
          </div>

          <div className="sticky bottom-4 pt-4">
            <Button className="w-full" size="lg">
              Apply to Project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
