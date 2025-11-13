import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Building2, Users, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  
  // Clear user signed up status when returning to landing page
  // This simulates a "new user" experience
  const handleStudentSignup = () => {
    localStorage.removeItem('userSignedUp');
    navigate("/student-signup");
  };
  
  const handleBusinessSignup = () => {
    localStorage.removeItem('userSignedUp');
    navigate("/business-signup");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-xl animate-bounce-subtle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white rounded-full blur-lg animate-bounce-subtle" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 text-center relative z-10 animate-fade-in-up">
        
        {/* Logo/Brand */}
        <div className="space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 glass backdrop-blur-sm border border-white/30 shadow-2xl">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              CampusBuild
            </h1>
            <p className="text-white/90 text-lg font-medium">
              Connect students with real-world projects
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4 stagger-children">
          <Button
            onClick={handleStudentSignup}
            className="w-full h-16 text-lg font-semibold btn-coral shadow-2xl border-0 hover:shadow-glow-coral transform hover:scale-105 active:scale-95 transition-all duration-200"
            size="lg"
          >
            <GraduationCap className="mr-3 h-6 w-6" />
            I'M A STUDENT
          </Button>
          
          <Button
            onClick={handleBusinessSignup}
            className="w-full h-16 text-lg font-semibold gradient-blue text-white shadow-2xl border-0 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
            size="lg"
          >
            <Briefcase className="mr-3 h-6 w-6" />
            I'M A BUSINESS
          </Button>
        </div>

        {/* Stats */}
        <div className="pt-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="glass rounded-xl p-3 border border-white/20 hover-lift">
              <div className="text-2xl font-bold text-white animate-count-up">500+</div>
              <div className="text-xs text-white/80">Students</div>
            </div>
            <div className="glass rounded-xl p-3 border border-white/20 hover-lift">
              <div className="text-2xl font-bold text-white animate-count-up">100+</div>
              <div className="text-xs text-white/80">Businesses</div>
            </div>
            <div className="glass rounded-xl p-3 border border-white/20 hover-lift">
              <div className="text-2xl font-bold text-white animate-count-up">$50k+</div>
              <div className="text-xs text-white/80">Earned</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Build your portfolio. Earn real money. Make an impact.</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
