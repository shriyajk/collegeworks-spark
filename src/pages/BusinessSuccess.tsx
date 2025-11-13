import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2,
  Star,
  Download,
  Repeat,
  Plus,
  BarChart3,
  Users,
  Share2,
  Linkedin,
  Twitter,
  Calendar,
  DollarSign
} from "lucide-react";

const BusinessSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    totalAmount: 250,
    duration: "2 weeks"
  };

  const team = location.state?.team || {
    name: "Alex + Sarah",
    members: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "Sarah Kim", avatar: "SK" }
    ]
  };

  const ratings = location.state?.ratings || [
    { label: "Quality of Work", rating: 5 },
    { label: "Communication", rating: 5 },
    { label: "Timeliness", rating: 5 }
  ];

  const reviewText = location.state?.reviewText || "";

  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animations
    setShowConfetti(true);
    setTimeout(() => setShowContent(true), 300);
    
    // Clean up confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const averageRating = ratings.reduce((sum, cat) => sum + cat.rating, 0) / ratings.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const shareText = "Just worked with talented students from CampusBuild on my business website. Highly recommend!";

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full opacity-70" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className={`w-full max-w-md space-y-8 text-center transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          
          {/* Top Animation */}
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Payment Released! ✅
            </h1>
          </div>

          {/* Confirmation Card */}
          <Card className="p-6 text-left">
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-success">Your project is complete</h2>
                <p className="text-muted-foreground mt-1">Team paid: ${project.totalAmount}</p>
              </div>
            </div>
          </Card>

          {/* Project Summary Card */}
          <Card className="p-6 text-left">
            <div className="space-y-4">
              <h3 className="font-semibold">Project Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project:</span>
                  <span className="font-medium">{project.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team:</span>
                  <span className="font-medium">{team.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">Completed in {project.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Your rating:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-sm">{averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Receipt Info */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Receipt sent to your email</p>
                <p className="text-sm text-muted-foreground">Invoice #CB-{Date.now().toString().slice(-6)}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>

          {/* Re-hire Section */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-900">Work with {team.name} again?</h3>
                <p className="text-sm text-green-700 mt-2">
                  Teams you've worked with deliver 30% faster on repeat projects
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  20% off your next project
                </Badge>
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                <Repeat className="h-4 w-4" />
                Book This Team Again
              </Button>
            </div>
          </Card>

          {/* Testimonial Confirmation */}
          {reviewText && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="space-y-3">
                <p className="text-sm font-medium text-blue-900">
                  Your review is now visible on the team's profile
                </p>
                <div className="p-3 bg-white rounded border text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm">Your Business</span>
                    <div className="flex gap-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">"{reviewText}"</p>
                </div>
              </div>
            </Card>
          )}

          {/* Next Actions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What's Next?</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Post New Project */}
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/post-project")}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Post New Project</p>
                    <p className="text-sm text-muted-foreground">Have another project idea?</p>
                  </div>
                </div>
              </Card>

              {/* View All Projects */}
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/my-projects")}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">View All Projects</p>
                    <p className="text-sm text-muted-foreground">See your project history</p>
                  </div>
                </div>
              </Card>

              {/* Hire Students Again */}
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/browse-teams")}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Hire Students Again</p>
                    <p className="text-sm text-muted-foreground">Browse available teams</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Social Sharing */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold">Share your success</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Let others know about your great experience
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => {
                    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(shareText)}`;
                    window.open(linkedinUrl, '_blank');
                  }}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => {
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                    window.open(twitterUrl, '_blank');
                  }}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </div>
          </Card>

          {/* Bottom Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/business-dashboard")}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Back to Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/post-project")}
              className="w-full h-12 text-lg font-semibold border-2"
              size="lg"
            >
              Post Another Project
            </Button>
          </div>

          {/* Success Stats */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-0">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>On-time delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span>Fair pricing</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Quality work</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Join 500+ businesses building with student talent
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BusinessSuccess;
