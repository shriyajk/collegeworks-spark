import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

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
  const [customSkill, setCustomSkill] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    const trimmedSkill = customSkill.trim();
    
    if (!trimmedSkill) {
      toast.error("Please enter a skill name");
      return;
    }

    if (trimmedSkill.length < 2) {
      toast.error("Skill name must be at least 2 characters");
      return;
    }

    if (trimmedSkill.length > 30) {
      toast.error("Skill name must be less than 30 characters");
      return;
    }

    // Check if skill already exists (case insensitive)
    const allSkills = [...SKILL_OPTIONS, ...customSkills];
    const skillExists = allSkills.some(
      skill => skill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (skillExists) {
      toast.error("This skill already exists");
      return;
    }

    // Add to custom skills and select it
    setCustomSkills(prev => [...prev, trimmedSkill]);
    setSelectedSkills(prev => [...prev, trimmedSkill]);
    setCustomSkill("");
    toast.success(`Added "${trimmedSkill}" to your skills`);
  };

  const removeCustomSkill = (skillToRemove: string) => {
    setCustomSkills(prev => prev.filter(skill => skill !== skillToRemove));
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomSkill();
    }
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

    // Store skills, custom skills, and availability
    const userData = JSON.parse(localStorage.getItem("campusBuildUser") || "{}");
    localStorage.setItem("campusBuildUser", JSON.stringify({
      ...userData,
      skills: selectedSkills,
      customSkills: customSkills,
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
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">Your Skills</Label>
              <p className="text-sm text-muted-foreground">
                Select from popular skills or add your own
              </p>
            </div>

            {/* Popular Skills */}
            <Card className="p-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">Popular Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Add Custom Skill */}
            <Card className="p-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">Add Your Own Skill</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Python, Photoshop, Data Analysis..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    maxLength={30}
                  />
                  <Button
                    type="button"
                    onClick={addCustomSkill}
                    disabled={!customSkill.trim()}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Enter or click + to add a skill
                </p>
              </div>
            </Card>

            {/* Custom Skills */}
            {customSkills.length > 0 && (
              <Card className="p-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-muted-foreground">Your Custom Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {customSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10 transition-colors group"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomSkill(skill);
                          }}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click skills to select/deselect • Hover and click × to remove
                  </p>
                </div>
              </Card>
            )}

            {/* Selected Skills Summary */}
            {selectedSkills.length > 0 && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-primary">
                    Selected Skills ({selectedSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )}
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
