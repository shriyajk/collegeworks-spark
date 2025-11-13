import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2,
  Star,
  Target,
  DollarSign,
  Wallet,
  Home,
  Users,
  Briefcase,
  BarChart,
  User,
  Share2,
  Image,
  Check
} from "lucide-react";

interface Skill {
  name: string;
  previousLevel: number;
  newLevel: number;
  progress: number;
}

interface LearningItem {
  id: string;
  title: string;
  checked: boolean;
}

const ProjectCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    company: "Bean There Cafe",
    totalAmount: 250,
    yourShare: 125
  };

  // Animation states
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [showSkillAnimation, setShowSkillAnimation] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [portfolioVisible, setPortfolioVisible] = useState(true);
  const [skillProgress, setSkillProgress] = useState(0);

  const [skills] = useState<Skill[]>([
    { name: "React", previousLevel: 2, newLevel: 3, progress: 0 },
    { name: "CSS", previousLevel: 1, newLevel: 2, progress: 0 }
  ]);

  const [learningItems, setLearningItems] = useState<LearningItem[]>([
    { id: "1", title: "Client communication", checked: true },
    { id: "2", title: "React components", checked: true },
    { id: "3", title: "Responsive design", checked: true },
    { id: "4", title: "Project management", checked: false }
  ]);

  // Celebration animations on mount
  useEffect(() => {
    const timers = [
      // Show confetti immediately
      setTimeout(() => setShowConfetti(true), 100),
      
      // Animate money count-up
      setTimeout(() => {
        let current = 0;
        const target = project.yourShare;
        const increment = target / 30; // 30 steps
        const countUp = setInterval(() => {
          current += increment;
          if (current >= target) {
            setAnimatedAmount(target);
            clearInterval(countUp);
          } else {
            setAnimatedAmount(Math.floor(current));
          }
        }, 50);
      }, 500),
      
      // Start skill level-up animation
      setTimeout(() => {
        setShowSkillAnimation(true);
        let progress = 0;
        const skillAnimation = setInterval(() => {
          progress += 2;
          if (progress >= 100) {
            setSkillProgress(100);
            clearInterval(skillAnimation);
          } else {
            setSkillProgress(progress);
          }
        }, 30);
      }, 1500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [project.yourShare]);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleLearningToggle = (id: string) => {
    setLearningItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddToPortfolio = () => {
    // Save to portfolio logic here
    navigate("/feed", { 
      state: { 
        message: "Project added to portfolio! 🎉" 
      }
    });
  };

  const handleShareAchievement = () => {
    // Share to LinkedIn or social media
    const shareText = `Just completed my first project on CampusBuild! Built a ${project.title} for ${project.company} and earned $${project.yourShare}. Leveled up my React skills! 🚀`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Project Completed!',
        text: shareText,
        url: window.location.origin
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Achievement copied to clipboard!');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/20 to-transparent animate-pulse" />
          {/* Simple confetti effect with CSS */}
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-primary rounded animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-8 pb-24">
        <div className="mx-auto max-w-sm space-y-6">
          
          {/* Top Animation & Heading */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Project Complete! 🎉
            </h1>
          </div>

          {/* Payment Card */}
          <Card className="p-6 bg-gradient-to-r from-success/10 to-success/5 border-success/20">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Wallet className="h-5 w-5 text-success" />
                <h2 className="text-lg font-semibold text-success">Payment Released</h2>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">
                  ${animatedAmount}
                </div>
                <p className="text-sm text-muted-foreground">
                  (Your share: ${project.totalAmount} ÷ 2)
                </p>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Available in wallet
                </Badge>
              </div>
            </div>
          </Card>

          {/* Rating Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Rate Your Experience:</h2>
              <p className="text-sm text-muted-foreground">How was {project.company}?</p>
              
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStarClick(i)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <Textarea
                placeholder="Share your experience (optional)"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-20"
              />
            </div>
          </Card>

          {/* Learning Checkboxes */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">What did you learn?</h2>
              
              <div className="space-y-3">
                {learningItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <button
                      onClick={() => handleLearningToggle(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.checked
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {item.checked && <Check className="h-3 w-3" />}
                    </button>
                    <span className={item.checked ? "text-foreground" : "text-muted-foreground"}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Skill Progression */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Skill Progress</h2>
              </div>
              
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Level {skill.previousLevel} → Level {skill.newLevel}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress 
                      value={showSkillAnimation ? skillProgress : 0} 
                      className="h-2"
                    />
                    {showSkillAnimation && skillProgress === 100 && (
                      <p className="text-xs text-primary font-medium animate-pulse">
                        🎯 Level up! +50 XP
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Add this project to your portfolio</h2>
              
              <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">Client: {project.company}</p>
                  <p className="text-sm text-muted-foreground">Your role: Frontend Developer</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Make visible in portfolio</span>
                <Switch
                  checked={portfolioVisible}
                  onCheckedChange={setPortfolioVisible}
                />
              </div>
            </div>
          </Card>

          {/* Testimonial Preview */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  B
                </div>
                <div>
                  <p className="font-medium text-blue-900">{project.company}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-blue-800 italic">
                "Great communication, clean code, met deadlines"
              </p>
              
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Would hire again
              </Badge>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToPortfolio}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
              size="lg"
            >
              Add to Portfolio
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/feed")}
              className="w-full h-12 text-lg font-semibold border-2"
              size="lg"
            >
              Find Next Project
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleShareAchievement}
              className="w-full h-12 text-lg font-semibold flex items-center gap-2"
              size="lg"
            >
              <Share2 className="h-4 w-4" />
              Share Achievement
            </Button>
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
            className="flex flex-col gap-1 text-primary"
            onClick={() => navigate("/projects")}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs">Projects</span>
          </Button>
        </div>
      </nav>

      <style jsx>{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectCompletion;
