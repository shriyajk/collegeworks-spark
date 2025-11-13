import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-primary">CampusBuild</h1>
          <p className="text-lg text-muted-foreground">
            Connect students with real-world projects
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button
            onClick={() => navigate("/student-signup")}
            size="lg"
            className="w-full h-16 text-lg font-semibold"
          >
            <GraduationCap className="mr-2 h-6 w-6" />
            I'M A STUDENT
          </Button>

          <Button
            onClick={() => navigate("/business-signup")}
            variant="outline"
            size="lg"
            className="w-full h-16 text-lg font-semibold border-2"
          >
            <Briefcase className="mr-2 h-6 w-6" />
            I'M A BUSINESS
          </Button>
        </div>

        <p className="pt-8 text-sm text-muted-foreground">
          Build your portfolio. Earn real money. Make an impact.
        </p>
      </div>
    </div>
  );
};

export default Landing;
