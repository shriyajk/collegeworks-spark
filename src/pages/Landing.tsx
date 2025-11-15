import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppliedProjects } from "@/contexts/AppliedProjectsContext";
import { useBusinessProjects } from "@/contexts/BusinessProjectsContext";
import { GraduationCap, Briefcase, Building2, Route, ShieldCheck, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { clearAppliedProjects } = useAppliedProjects();
  const { clearBusinessProjects } = useBusinessProjects();

  // Clear user signed up status when returning to landing page
  // This simulates a "new user" experience
  const handleStudentSignup = () => {
    localStorage.removeItem("userSignedUp");
    // Clear applied projects when starting a new signup
    clearAppliedProjects();
    sessionStorage.removeItem('clearedAppliedProjectsForNewAccount');
    navigate("/student-signup");
  };

  const handleBusinessSignup = () => {
    localStorage.removeItem("userSignedUp");
    // Clear business projects when starting a new signup
    clearBusinessProjects();
    navigate("/business-signup");
  };

  const handleStudentSignIn = () => {
    navigate("/student-signin");
  };

  const handleBusinessSignIn = () => {
    navigate("/business-signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-purple-50/30 animate-fade-in-up-page relative overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left gradient glow behind logo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 hidden md:block" />
        {/* Soft purple blob behind hero content */}
        <div className="absolute top-32 left-0 w-[600px] h-[500px] bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl opacity-50 -translate-x-1/4 -translate-y-1/4 hidden md:block" />
      </div>
      
      {/* Header with CampusBuild branding */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <h1 className="text-lg sm:text-2xl font-bold text-primary">CampusBuild</h1>
        </div>
      </header>
      
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-4 py-1 sm:py-2 md:px-6 relative">
        {/* Hero Section */}
        <div className="mb-16 md:mb-20">
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8 lg:gap-10">
            {/* Left Column: Content */}
            <div className="relative z-10 pt-2 md:pt-0 space-y-4 md:space-y-5">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary p-3 md:h-16 md:w-16 md:rounded-2xl md:p-4">
                <Building2 className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  Connect students with real-world projects
                </h1>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  CampusBuild links ambitious student teams with organisations that
                  need fresh talent. Launch projects faster with vetted, guided
                  teams that deliver measurable outcomes.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-1">
                <Button
                  onClick={handleStudentSignup}
                  className="h-12 w-full px-6 text-sm font-semibold bg-gradient-primary text-white shadow-glow-primary button-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-14 sm:px-8 sm:text-base sm:w-auto"
                  size="lg"
                >
                  <GraduationCap className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5" />
                  I'm a Student
                </Button>

                <Button
                  onClick={handleBusinessSignup}
                  variant="outline"
                  className="h-12 w-full border-2 border-primary/30 bg-white px-6 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-14 sm:px-8 sm:text-base sm:w-auto"
                  size="lg"
                >
                  <Briefcase className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5" />
                  I'm a Business
                </Button>
              </div>

              {/* Sign In Options */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-center text-sm text-slate-600 mb-2.5">
                  Already have an account?
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
                  <Button
                    onClick={handleStudentSignIn}
                    variant="ghost"
                    className="h-10 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5"
                  >
                    Sign in as Student
                  </Button>
                  <Button
                    onClick={handleBusinessSignIn}
                    variant="ghost"
                    className="h-10 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5"
                  >
                    Sign in as Business
                  </Button>
                </div>
              </div>

              {/* Feature Points */}
              <div className="grid gap-3 pt-4 sm:grid-cols-3">
                {[
                  {
                    title: "Guided delivery",
                    description: "Structured milestones keep projects on track.",
                    icon: Route,
                  },
                  {
                    title: "Vetted teams",
                    description: "Students are curated for skills and reliability.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Real outcomes",
                    description: "Every project maps to measurable deliverables.",
                    icon: TrendingUp,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-card hover-lift transition-shadow">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-xs leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </div>
                      <Icon className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Preview Card (Desktop Only) */}
            <div className="hidden md:flex md:items-center md:justify-center">
              <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-card hover-lift transition-shadow relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    How Projects Work
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    In progress
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Collaborators
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      Small focused team
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Timeline
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      Milestone-based schedule
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Deliverables
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      Clear outcomes
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs font-medium text-slate-500">
                  A structured workspace that keeps everyone aligned.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mb-12 border-t border-slate-200 pt-8 md:mb-16 md:pt-10">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
            Trusted by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600 sm:gap-10 md:gap-12">
            <span>BITS Pilani</span>
            <span>IIT Bombay</span>
            <span>EdTechCo</span>
            <span>StartupHub</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl font-semibold text-slate-900">500+</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Students
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl font-semibold text-slate-900">100+</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Businesses
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl font-semibold text-slate-900">$50k+</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Earned
              </div>
            </div>
          </div>
          <p className="text-center text-sm font-medium text-slate-500">
            Build your portfolio. Earn real money. Make an impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
