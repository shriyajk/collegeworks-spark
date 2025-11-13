import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Star,
  Target,
  Quote,
  Users,
  Clock,
  CheckCircle2,
  MessageCircle,
  Eye,
  Calendar,
  DollarSign,
  Share2,
  Briefcase,
  FileText
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  projects: number;
  skills: string[];
}

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
}

interface TeamApplication {
  id: string;
  teamName: string;
  members: TeamMember[];
  averageRating: number;
  skillMatch: number;
  pastProjects: number;
  totalEarned: number;
  completionRate: number;
  teamGPA: number;
  introMessage: string;
  availability: {
    startTime: string;
    hoursPerWeek: number;
  };
  skills: string[];
  portfolioItems: PortfolioItem[];
}

const TEAM_APPLICATIONS: TeamApplication[] = [
  {
    id: "1",
    teamName: "Alex + Sarah",
    members: [
      { 
        name: "Alex Chen", 
        role: "Frontend Developer", 
        avatar: "AC", 
        rating: 4.9, 
        projects: 2,
        skills: ["React", "JavaScript", "CSS"]
      },
      { 
        name: "Sarah Kim", 
        role: "UI/UX Designer", 
        avatar: "SK", 
        rating: 4.8, 
        projects: 1,
        skills: ["Figma", "UI/UX", "Prototyping"]
      }
    ],
    averageRating: 4.9,
    skillMatch: 100,
    pastProjects: 3,
    totalEarned: 800,
    completionRate: 100,
    teamGPA: 92,
    introMessage: "We're excited to work with you because we specialize in modern, responsive websites for local businesses. Our recent coffee shop project increased online orders by 40% and we understand the unique needs of food service establishments...",
    availability: {
      startTime: "Immediately",
      hoursPerWeek: 12
    },
    skills: ["React", "Figma", "CSS"],
    portfolioItems: [
      {
        title: "Local Bakery Website",
        description: "Modern e-commerce site with online ordering system",
        image: "/api/placeholder/300/200"
      },
      {
        title: "Restaurant Landing Page", 
        description: "Responsive design with reservation booking system",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    id: "2",
    teamName: "Mike + Emma + Chen",
    members: [
      { 
        name: "Mike Johnson", 
        role: "Full Stack Developer", 
        avatar: "MJ", 
        rating: 4.7, 
        projects: 3,
        skills: ["React", "Node.js", "MongoDB"]
      },
      { 
        name: "Emma Davis", 
        role: "Designer", 
        avatar: "ED", 
        rating: 4.6, 
        projects: 2,
        skills: ["Figma", "Adobe XD", "Branding"]
      },
      { 
        name: "Chen Liu", 
        role: "Frontend Developer", 
        avatar: "CL", 
        rating: 4.8, 
        projects: 2,
        skills: ["Vue.js", "CSS", "Animation"]
      }
    ],
    averageRating: 4.7,
    skillMatch: 95,
    pastProjects: 5,
    totalEarned: 1200,
    completionRate: 100,
    teamGPA: 88,
    introMessage: "Our team has extensive experience with small business websites and we understand the unique needs of coffee shops. We can deliver a beautiful, functional site that drives customers to your location and increases online engagement...",
    availability: {
      startTime: "Next week",
      hoursPerWeek: 15
    },
    skills: ["React", "Node.js", "Figma", "CSS"],
    portfolioItems: [
      {
        title: "Cafe Chain Website",
        description: "Multi-location site with online ordering and loyalty program",
        image: "/api/placeholder/300/200"
      },
      {
        title: "Food Truck App",
        description: "Mobile-first ordering platform with real-time tracking",
        image: "/api/placeholder/300/200"
      },
      {
        title: "Restaurant Dashboard",
        description: "Admin panel for menu management and order tracking",
        image: "/api/placeholder/300/200"
      }
    ]
  },
  {
    id: "3",
    teamName: "Jordan + Pat",
    members: [
      { 
        name: "Jordan Smith", 
        role: "Frontend Developer", 
        avatar: "JS", 
        rating: 5.0, 
        projects: 1,
        skills: ["React", "TypeScript", "Tailwind"]
      },
      { 
        name: "Pat Wilson", 
        role: "Designer", 
        avatar: "PW", 
        rating: 5.0, 
        projects: 1,
        skills: ["Figma", "Illustration", "Branding"]
      }
    ],
    averageRating: 5.0,
    skillMatch: 90,
    pastProjects: 1,
    totalEarned: 300,
    completionRate: 100,
    teamGPA: 95,
    introMessage: "As a newer team, we're eager to prove ourselves and deliver exceptional work. We bring fresh perspectives and are committed to exceeding your expectations. Our first project received a 5-star review and we're ready to bring that same energy to your coffee shop website...",
    availability: {
      startTime: "Immediately",
      hoursPerWeek: 20
    },
    skills: ["React", "Figma", "Tailwind"],
    portfolioItems: [
      {
        title: "Portfolio Website",
        description: "Clean, modern design with smooth animations and responsive layout",
        image: "/api/placeholder/300/200"
      }
    ]
  }
];

const ReviewApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    budget: "250"
  };

  const [sortBy, setSortBy] = useState("rating");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedTeamForPortfolio, setSelectedTeamForPortfolio] = useState<TeamApplication | null>(null);
  const [selectedTeamForConfirmation, setSelectedTeamForConfirmation] = useState<TeamApplication | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamApplication | null>(null);
  const [startDate, setStartDate] = useState("");
  const [reviewedPortfolio, setReviewedPortfolio] = useState(false);
  const [hasApplications] = useState(true); // Toggle this to test empty state

  const getSortedApplications = () => {
    let sorted = [...TEAM_APPLICATIONS];
    
    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "experience":
        sorted.sort((a, b) => b.pastProjects - a.pastProjects);
        break;
      case "recent":
        // Keep original order for "recent"
        break;
    }
    
    return sorted;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const handleSelectTeam = (team: TeamApplication) => {
    setSelectedTeamForConfirmation(team);
    setStartDate("");
    setReviewedPortfolio(false);
  };

  const confirmTeamSelection = () => {
    if (selectedTeamForConfirmation && startDate && reviewedPortfolio) {
      setSelectedTeam(selectedTeamForConfirmation);
      setSelectedTeamForConfirmation(null);
      
      // Store selection for demo
      localStorage.setItem("selectedTeam", JSON.stringify({
        team: selectedTeamForConfirmation,
        project,
        startDate,
        selectedAt: new Date().toISOString()
      }));
    }
  };

  // Post-selection success screen
  if (selectedTeam) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8 text-center">
            
            {/* Success Animation */}
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="h-12 w-12 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Team Selected!</h1>
              <p className="text-muted-foreground">
                {selectedTeam.teamName} have been notified
              </p>
            </div>

            {/* Next Steps Card */}
            <Card className="p-6 text-left">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Next Steps
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <span className="text-sm">Schedule kickoff meeting</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                    <span className="text-sm">Share project assets</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">3</span>
                    </div>
                    <span className="text-sm">Set milestone deadlines</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/project-dashboard", { state: { project, team: selectedTeam } })}
                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Go to Project Workspace
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate("/my-projects")}
                className="w-full h-12 text-lg font-semibold border-2"
                size="lg"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Empty state
  if (!hasApplications) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/my-projects")}
              className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{project.title}</h1>
              <p className="text-sm text-muted-foreground">Review Applications</p>
            </div>
          </div>
        </div>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No applications yet</h2>
              <p className="text-muted-foreground">
                Projects typically receive 5-10 applications within 48 hours
              </p>
            </div>
            <Button
              onClick={() => {/* Share project logic */}}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              size="lg"
            >
              <Share2 className="h-4 w-4" />
              Share Project Link
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/my-projects")}
            className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted-foreground">Review Applications</p>
          </div>
        </div>
      </div>

      {/* Applications Summary Bar */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold">8 Teams Applied</span>
            
            {/* Filter Tabs */}
            <div className="flex gap-1">
              {["All", "Interviewed", "Shortlisted"].map((filter) => (
                <Button
                  key={filter}
                  variant={filterBy === filter.toLowerCase() ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterBy(filter.toLowerCase())}
                  className="h-8 px-3"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content - Team Cards */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          
          {getSortedApplications().map((team) => (
            <Card key={team.id} className="p-6 space-y-6 shadow-lg">
              
              {/* Team Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Team: {team.teamName}</h3>
                  <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {team.members.length} members
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(team.averageRating)}</div>
                  <span className="text-sm font-medium">{team.averageRating} average rating</span>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {team.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {team.skillMatch}% skill match
                  </span>
                </div>
              </div>

              {/* Experience Section */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Past Work:</span>
                    <span className="font-medium">{team.pastProjects} completed projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earned:</span>
                    <span className="font-medium">${team.totalEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate:</span>
                    <span className="font-medium text-green-600">
                      {team.completionRate}% ({team.pastProjects}/{team.pastProjects} delivered)
                    </span>
                  </div>
                </div>
              </div>

              {/* Team GPA Badge */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Target className="h-4 w-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-blue-900">
                    Team GPA: {team.teamGPA}%
                  </span>
                  <p className="text-xs text-blue-700">
                    (Reliability score based on on-time delivery and quality)
                  </p>
                </div>
              </div>

              {/* Intro Message Preview */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Quote className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {team.introMessage.substring(0, 100)}...
                    </p>
                    <button className="text-xs text-blue-600 hover:underline mt-1">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Can start:</span>
                    <span className="font-medium">{team.availability.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commitment:</span>
                    <span className="font-medium">{team.availability.hoursPerWeek} hours/week combined</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTeamForPortfolio(team)}
                  className="flex-1 gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View Portfolio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message Team
                </Button>
              </div>
              
              <Button
                onClick={() => handleSelectTeam(team)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Select This Team
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Portfolio Modal */}
      <Dialog open={!!selectedTeamForPortfolio} onOpenChange={() => setSelectedTeamForPortfolio(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Team: {selectedTeamForPortfolio?.teamName}</DialogTitle>
          </DialogHeader>
          
          {selectedTeamForPortfolio && (
            <div className="space-y-6">
              {/* Team Members */}
              <div className="space-y-3">
                <h4 className="font-medium">Team Members</h4>
                {selectedTeamForPortfolio.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{member.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Portfolio Items */}
              <div className="space-y-3">
                <h4 className="font-medium">Portfolio ({selectedTeamForPortfolio.portfolioItems.length} projects)</h4>
                {selectedTeamForPortfolio.portfolioItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Project Screenshot</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Selection Confirmation Modal */}
      <Dialog open={!!selectedTeamForConfirmation} onOpenChange={() => setSelectedTeamForConfirmation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Team: {selectedTeamForConfirmation?.teamName}?</DialogTitle>
          </DialogHeader>
          
          {selectedTeamForConfirmation && (
            <div className="space-y-6">
              {/* Project Summary */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium">{project.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    ${project.budget}
                  </span>
                </div>
              </div>

              {/* Escrow Reminder */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  ${project.budget} will be released to team upon completion
                </p>
              </div>

              {/* Start Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Project Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="portfolio-review"
                  checked={reviewedPortfolio}
                  onCheckedChange={(checked) => setReviewedPortfolio(checked as boolean)}
                />
                <label htmlFor="portfolio-review" className="text-sm">
                  I've reviewed their portfolio and proposal
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTeamForConfirmation(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmTeamSelection}
                  disabled={!startDate || !reviewedPortfolio}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewApplications;