import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SKILL_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Design",
  "UI/UX",
  "Mobile Dev",
  "Database",
  "DevOps",
  "Marketing",
  "Content Writing",
  "Video Editing",
  "SEO",
];

const AVAILABILITY_OPTIONS = [
  "< 5 hours/week",
  "5-10 hours/week",
  "10-15 hours/week",
  "15-20 hours/week",
  "20+ hours/week",
];

const SkillsSetup = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    if (!selectedAvailability) {
      toast.error("Please select your availability");
      return;
    }

    // Store skills and availability
    const userData = JSON.parse(localStorage.getItem("campusBuildUser") || "{}");
    localStorage.setItem("campusBuildUser", JSON.stringify({
      ...userData,
      skills: selectedSkills,
      availability: selectedAvailability,
    }));

    toast.success("Profile setup complete!");
    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-primary">Set Up Your Profile</h1>
          <p className="text-muted-foreground">
            Tell us about your skills and availability
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Your Skills</Label>
            <p className="text-sm text-muted-foreground">
              Select all that apply (you can add more later)
            </p>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Weekly Availability</Label>
            <p className="text-sm text-muted-foreground">
              How much time can you commit per week?
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AVAILABILITY_OPTIONS.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={selectedAvailability === option ? "default" : "outline"}
                  onClick={() => setSelectedAvailability(option)}
                  className="justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Complete Setup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SkillsSetup;
