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
    <div className="flex min-h-screen flex-col bg-background pb-32 animate-fade-in-up-page">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/feed")}
            className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Title and Level */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
              <Badge className={`${getLevelColor(project.level)} text-sm px-4 py-1.5 font-semibold shadow-sm`}>
                {getLevelIcon(project.level)} {project.level.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Client Info Card */}
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 p-5 border-2 shadow-card hover-lift transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background border-2 border-primary/20 shadow-sm">
                <Coffee className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{project.company}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(project.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{project.rating}</span>
                  <span>(3 past projects)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 border-2 shadow-card hover-lift transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget</span>
                </div>
                <p className="text-xl font-bold text-foreground">{project.budget}</p>
              </div>
            </Card>
            <Card className="p-5 border-2 shadow-card hover-lift transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Timeline</span>
                </div>
                <p className="text-xl font-bold text-foreground">{project.duration}</p>
              </div>
            </Card>
            <Card className="p-5 border-2 shadow-card hover-lift transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Team Needs</span>
                </div>
                <p className="text-base font-bold text-foreground">1 Frontend +<br />1 Designer</p>
              </div>
            </Card>
            <Card className="p-5 border-2 border-green-200 bg-green-50/50 shadow-card hover-lift transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                  <Shield className="h-4 w-4" />
                  <span>Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <p className="text-base font-bold text-green-700">Escrow Protected</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Description */}
          <Card className="p-6 border-2 shadow-card hover-lift transition-shadow">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Need a simple, mobile-responsive menu website with 5 pages. Should display our coffee menu, location, hours, and about us. Modern design that matches our brand.
              </p>
            </div>
          </Card>

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
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Skills Required</h2>
            <div className="flex flex-wrap gap-3">
              {["React", "Figma", "CSS"].map((skill, index) => {
                const colors = [
                  "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
                  "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
                  "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200",
                  "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200",
                  "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200",
                ];
                return (
                  <Badge 
                    key={skill} 
                    className={`px-4 py-2 text-sm font-semibold border-2 transition-colors ${colors[index % colors.length]}`}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* What You'll Learn */}
          <Card className="p-6 border-2 bg-gradient-to-br from-primary/5 to-primary/10 shadow-card hover-lift transition-shadow">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">What You'll Learn</h2>
              <ul className="space-y-3">
                {[
                  "Client communication skills",
                  "Responsive design principles",
                  "Real deployment process",
                  "Professional portfolio piece",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </main>

      {/* Fixed Bottom Action Section */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
        <div className="mx-auto max-w-2xl space-y-3">
          <Button
            className="w-full h-14 text-lg font-semibold bg-gradient-primary text-white shadow-glow-primary button-interactive"
            size="lg"
            onClick={() => navigate("/teams", { state: { project } })}
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
