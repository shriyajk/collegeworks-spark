import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BusinessSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-3xl font-bold text-primary">Business Sign Up</h1>
          <p className="text-muted-foreground">
            Coming soon! Business registration will be available shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
