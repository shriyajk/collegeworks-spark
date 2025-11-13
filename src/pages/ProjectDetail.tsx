import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Star, Lock, Coffee, DollarSign, Calendar, Users, Shield, CheckCircle2, Info } from "lucide-react";

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Project not found</p>
          <Button onClick={() => navigate("/feed")}>Back to Feed</Button>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-success text-success-foreground hover:bg-success/90";
      case "intermediate":
        return "bg-warning text-warning-foreground hover:bg-warning/90";
      case "advanced":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
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
    <div className="flex min-h-screen flex-col bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Title and Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <Badge className={getLevelColor(project.level)}>
                {getLevelIcon(project.level)} {project.level.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Client Info Card */}
          <Card className="bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{project.company}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(project.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{project.rating}</span>
                  <span>(3 past projects)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget</span>
                </div>
                <p className="text-lg font-semibold">{project.budget}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Timeline</span>
                </div>
                <p className="text-lg font-semibold">{project.duration}</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Team Needs</span>
                </div>
                <p className="text-sm font-semibold">1 Frontend +<br />1 Designer</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Payment</span>
                </div>
                <p className="text-sm font-semibold">Escrow<br />Protected</p>
              </div>
            </Card>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Need a simple, mobile-responsive menu website with 5 pages. Should display our coffee menu, location, hours, and about us. Modern design that matches our brand.
            </p>
          </div>

          {/* Expandable Why Beginner Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="why-beginner" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Why This Is Beginner</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Stack: HTML/CSS/Basic JS</p>
                      <p className="text-sm text-muted-foreground">(No complex frameworks needed)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Scope: 5 static pages only</p>
                      <p className="text-sm text-muted-foreground">(Home, Menu, About, Location, Contact)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Timeline: 2 weeks</p>
                      <p className="text-sm text-muted-foreground">(Proven achievable for beginners)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Support: Client available</p>
                      <p className="text-sm text-muted-foreground">(2 check-ins per week)</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Skills Required */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {["React", "Figma", "CSS"].map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">What You'll Learn</h2>
            <ul className="space-y-2">
              {[
                "Client communication skills",
                "Responsive design principles",
                "Real deployment process",
                "Professional portfolio piece",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Section */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
        <div className="mx-auto max-w-2xl space-y-3">
          <Button
            className="w-full h-14 text-lg font-semibold"
            size="lg"
            onClick={() => navigate("/teams")}
          >
            Find Teammates
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-12 font-semibold"
                    disabled
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Apply Solo
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Teams required for this project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
