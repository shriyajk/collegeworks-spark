import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Star, 
  Zap,
  Users,
  Check
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  year: string;
  role: string;
  skills: string[];
  availability: string;
  rating: number;
  projectCount: number;
  avatar?: string;
  invited?: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'confirmed' | 'invited';
}

const AVAILABLE_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Mike Chen",
    year: "Junior",
    role: "UX Designer",
    skills: ["Figma", "UI/UX", "Prototyping"],
    availability: "12 hrs/week",
    rating: 4.9,
    projectCount: 2,
    avatar: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Alex Park",
    year: "Sophomore",
    role: "Designer",
    skills: ["Figma", "Illustration", "CSS"],
    availability: "10 hrs/week",
    rating: 5.0,
    projectCount: 1,
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Emma Liu", 
    year: "Senior",
    role: "Product Designer",
    skills: ["Figma", "Sketch", "Branding"],
    availability: "8 hrs/week",
    rating: 4.8,
    projectCount: 4,
    avatar: "/placeholder.svg"
  }
];

// Default project for when accessing Teams directly
const DEFAULT_PROJECT = {
  id: "1",
  level: "beginner" as const,
  title: "Coffee Shop Website",
  company: "Bean There Cafe",
  rating: 4.8,
  budget: "$250",
  duration: "2 weeks",
  skills: ["Frontend", "Design"],
  viewingCount: 12,
};

const TeamFormation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Use project from location state or default project for direct navigation
  const project = location.state?.project || DEFAULT_PROJECT;
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "you", name: "You", role: "Frontend Developer", status: "confirmed" },
    { id: "sarah", name: "Sarah", role: "Designer", status: "invited" }
  ]);
  
  const [students, setStudents] = useState<Student[]>(AVAILABLE_STUDENTS);
  const [showAutoAssemble, setShowAutoAssemble] = useState(false);

  const handleInviteStudent = (studentId: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, invited: true }
          : student
      )
    );
    
    const student = students.find(s => s.id === studentId);
    if (student) {
      setTeamMembers(prev => [
        ...prev,
        { 
          id: studentId, 
          name: student.name, 
          role: student.role, 
          status: "invited" 
        }
      ]);
    }
  };

  const handleAutoAssemble = () => {
    setShowAutoAssemble(true);
    // Simple modal/alert for now
    setTimeout(() => {
      alert("Auto-assemble feature coming soon! We'll match you with the perfect teammates within 24 hours.");
      setShowAutoAssemble(false);
    }, 500);
  };

  const isTeamComplete = teamMembers.length >= 2 && 
    teamMembers.some(member => member.role.toLowerCase().includes("designer"));

  const handleApplyAsTeam = () => {
    if (isTeamComplete) {
      navigate("/application-sent", { state: { project, teamMembers } });
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
            onClick={() => {
              // If we have project state from navigation, go back to project detail
              // Otherwise, go back to feed
              if (location.state?.project) {
                navigate(`/project/${project.id}`, { state: { project } });
              } else {
                navigate("/feed");
              }
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Team for: {project.title}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          
          {/* Demo Notice for direct navigation */}
          {!location.state?.project && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Demo Mode</p>
                  <p className="text-sm text-blue-800 mt-1">
                    You're viewing team formation for a sample project. To form a team for a real project, 
                    go to <button 
                      onClick={() => navigate("/feed")} 
                      className="underline hover:no-underline font-medium"
                    >
                      Project Feed
                    </button> and select a project.
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {/* Your Forming Team Section */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your Team ({teamMembers.length}/3):</h2>
                {isTeamComplete && (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Team complete!</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    {member.status === "confirmed" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">
                        {member.name} ({member.role})
                      </p>
                      {member.status === "invited" && (
                        <p className="text-sm text-muted-foreground">Invited</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {teamMembers.length < 3 && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Plus className="h-5 w-5" />
                    <p>Add {3 - teamMembers.length} more (optional)</p>
                  </div>
                )}
              </div>
              
              {isTeamComplete && (
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success font-medium">
                    Team complete! Ready to apply
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Auto-Assemble Option */}
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <h2 className="text-lg font-bold text-orange-900">Can't find teammates?</h2>
              </div>
              
              <p className="text-orange-800">
                Let us auto-assemble a team from your campus in &lt;24hrs
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-orange-900">We'll match:</p>
                <ul className="text-sm text-orange-800 space-y-1 ml-4">
                  <li>• Complementary skills</li>
                  <li>• Similar availability</li>
                  <li>• Proven collaborators</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleAutoAssemble}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={showAutoAssemble}
              >
                {showAutoAssemble ? "Processing..." : "Auto-Assemble Team"}
              </Button>
            </div>
          </Card>

          {/* Role Checklist */}
          <Card className="p-4">
            <h2 className="text-lg font-bold mb-3">Need for this project:</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm">1 Frontend Developer (You)</span>
              </div>
              <div className="flex items-center gap-2">
                {teamMembers.some(m => m.role.toLowerCase().includes("designer")) ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <div className="h-4 w-4 border border-muted-foreground rounded" />
                )}
                <span className="text-sm">
                  1 Designer {teamMembers.some(m => m.role.toLowerCase().includes("designer")) ? "" : "(Searching...)"}
                </span>
              </div>
            </div>
          </Card>

          {/* Available Students */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Browse Students:</h2>
            
            {students.map((student) => (
              <Card key={student.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {student.year} • {student.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Skills: </span>
                      <span className="text-sm text-muted-foreground">
                        {student.skills.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Availability: </span>
                      <span className="text-sm text-muted-foreground">
                        {student.availability}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rating: </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(student.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {student.rating} ({student.projectCount} project{student.projectCount !== 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleInviteStudent(student.id)}
                    disabled={student.invited}
                    className={`w-full ${
                      student.invited 
                        ? "bg-muted text-muted-foreground cursor-not-allowed" 
                        : ""
                    }`}
                    variant={student.invited ? "secondary" : "default"}
                  >
                    {student.invited ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Invited
                      </div>
                    ) : (
                      "Invite to Team"
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <Button
            onClick={handleApplyAsTeam}
            disabled={!isTeamComplete}
            className={`w-full h-14 text-lg font-semibold ${
              isTeamComplete 
                ? "bg-primary hover:bg-primary/90" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Apply as Team
          </Button>
          {!isTeamComplete && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Complete your team to apply
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamFormation;
