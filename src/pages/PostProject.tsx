import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useBusinessProjects } from "@/contexts/BusinessProjectsContext";
import { 
  ArrowLeft,
  DollarSign,
  Info,
  Plus,
  X,
  Lock,
  Lightbulb,
  Clock,
  Users,
  Target
} from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  budget: string;
  timeline: string;
  skills: string[];
  teamSize: number[];
  difficulty: string;
}

const COMMON_SKILLS = [
  "Frontend", "Backend", "Design", "React", "Python", "Figma", 
  "JavaScript", "CSS", "Node.js", "UI/UX", "WordPress", "Shopify"
];

const TIMELINE_OPTIONS = [
  { value: "1-2 weeks", label: "1-2 weeks" },
  { value: "2-4 weeks", label: "2-4 weeks" },
  { value: "4-8 weeks", label: "4-8 weeks" }
];

const DIFFICULTY_OPTIONS = [
  {
    value: "beginner",
    label: "Beginner (Recommended)",
    description: "Simple websites, basic features, 1-2 weeks",
    budgetRange: "$100-300"
  },
  {
    value: "intermediate", 
    label: "Intermediate",
    description: "Interactive apps, backend integration, 2-4 weeks",
    budgetRange: "$300-600"
  }
];

const PostProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addBusinessProject } = useBusinessProjects();
  
  const projectToEdit = location.state?.project;
  const isEditing = location.state?.isEditing || false;
  
  const [formData, setFormData] = useState<ProjectData>({
    title: "",
    description: "",
    budget: "",
    timeline: "1-2 weeks",
    skills: [],
    teamSize: [3],
    difficulty: "beginner"
  });
  
  const [customSkill, setCustomSkill] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedDifficulty, setSuggestedDifficulty] = useState<string | null>(null);

  // Load project data when editing
  useEffect(() => {
    if (isEditing && projectToEdit) {
      // Handle budget - it might be a string or number
      let budgetValue = "";
      if (projectToEdit.budget) {
        budgetValue = typeof projectToEdit.budget === 'string' 
          ? projectToEdit.budget 
          : projectToEdit.budget.toString();
      }
      
      setFormData({
        title: projectToEdit.title || "",
        description: projectToEdit.description || "",
        budget: budgetValue,
        timeline: projectToEdit.timeline || "1-2 weeks",
        skills: Array.isArray(projectToEdit.skills) ? projectToEdit.skills : [],
        teamSize: Array.isArray(projectToEdit.teamSize) ? projectToEdit.teamSize : [3],
        difficulty: projectToEdit.difficulty || "beginner"
      });
    }
  }, [isEditing, projectToEdit]);

  // Auto-suggest difficulty based on description keywords
  useEffect(() => {
    if (formData.description.length > 20) {
      const description = formData.description.toLowerCase();
      const intermediateKeywords = ['api', 'database', 'backend', 'authentication', 'payment', 'complex', 'integration', 'dashboard', 'admin'];
      const beginnerKeywords = ['simple', 'basic', 'static', 'landing', 'portfolio', 'brochure'];
      
      const hasIntermediate = intermediateKeywords.some(keyword => description.includes(keyword));
      const hasBeginner = beginnerKeywords.some(keyword => description.includes(keyword));
      
      if (hasIntermediate && !hasBeginner) {
        setSuggestedDifficulty("intermediate");
      } else if (hasBeginner && !hasIntermediate) {
        setSuggestedDifficulty("beginner");
      } else {
        setSuggestedDifficulty(null);
      }
    } else {
      setSuggestedDifficulty(null);
    }
  }, [formData.description]);

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      handleInputChange("skills", [...formData.skills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange("skills", formData.skills.filter(skill => skill !== skillToRemove));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      addSkill(customSkill.trim());
      setCustomSkill("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Optional validation - only validate format if fields are provided
    if (formData.budget && formData.budget.trim() && parseFloat(formData.budget) < 0) {
      newErrors.budget = "Budget cannot be negative";
    }

    // No required fields - all validation is optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const budget = parseFloat(formData.budget) || 0;
    const postingFee = 10;
    return budget + postingFee;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const projectId = Date.now().toString();
      const postedDate = new Date().toISOString().split('T')[0];
      
      // Store project data
      const projectData = {
        ...formData,
        id: projectId,
        status: "under_review",
        submittedAt: new Date().toISOString(),
        postingFee: 10,
        total: calculateTotal()
      };
      
      localStorage.setItem("postedProject", JSON.stringify(projectData));
      
      // Add to business projects context
      const businessProject = {
        id: projectId,
        title: formData.title,
        status: "review" as const, // "under_review" maps to "review"
        budget: parseFloat(formData.budget) || 0,
        timeline: formData.timeline,
        postedDate: postedDate,
        description: formData.description,
        applications: 0, // Will be updated when applications come in
      };
      
      addBusinessProject(businessProject);
      
      navigate("/waiting-for-applications", { state: { project: projectData } });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    // No required fields - form is always valid
    return Object.keys(errors).length === 0;
  };

  const getRecommendedBudget = () => {
    const difficulty = DIFFICULTY_OPTIONS.find(d => d.value === formData.difficulty);
    return difficulty?.budgetRange || "$100-300";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          onClick={() => navigate("/business-dashboard")}
          className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? "Edit Project" : "Post a Project"}
            </h1>
            <p className="text-muted-foreground">
              Connect with talented student teams
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Project Details */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Project Details
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Project Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Coffee shop website"
                      className={`h-12 ${errors.title ? "border-destructive" : ""}`}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what you need built, key features, design preferences..."
                      className={`min-h-24 resize-y ${errors.description ? "border-destructive" : ""}`}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        {errors.description && (
                          <p className="text-sm text-destructive">{errors.description}</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formData.description.length}/500
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Budget Section */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Budget
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Budget Amount
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        placeholder="250"
                        className={`h-12 pl-10 ${errors.budget ? "border-destructive" : ""}`}
                        min="50"
                      />
                    </div>
                    {errors.budget && (
                      <p className="text-sm text-destructive">{errors.budget}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Recommended: {getRecommendedBudget()} for {formData.difficulty}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Amount will be held in escrow until project completion
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline Section */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Timeline
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    {TIMELINE_OPTIONS.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={option.value}
                          checked={formData.timeline === option.value}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Be realistic - longer timelines have higher completion rates
                  </p>
                </div>
              </div>
            </Card>

            {/* Skills Needed */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Skills Needed
                </h2>
                
                <div className="space-y-4">
                  {/* Common Skills */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select from common skills:</Label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_SKILLS.map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant={formData.skills.includes(skill) ? "default" : "outline"}
                          size="sm"
                          onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                          className="h-8"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Skill Input */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Add custom skill:</Label>
                    <div className="flex gap-2">
                      <Input
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        placeholder="e.g., Shopify, WordPress"
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                      />
                      <Button
                        type="button"
                        onClick={addCustomSkill}
                        size="icon"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Selected Skills */}
                  {formData.skills.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Selected skills:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.skills && (
                    <p className="text-sm text-destructive">{errors.skills}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Team Size */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Team Size
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Number of students:</Label>
                      <span className="text-lg font-semibold text-blue-600">
                        {formData.teamSize[0]} student{formData.teamSize[0] !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <Slider
                      value={formData.teamSize}
                      onValueChange={(value) => handleInputChange("teamSize", value)}
                      min={2}
                      max={4}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    2-3 students recommended for most projects
                  </p>
                </div>
              </div>
            </Card>

            {/* Difficulty Level */}
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  Difficulty Level
                </h2>
                
                <div className="space-y-4">
                  {/* AI Suggestion */}
                  {suggestedDifficulty && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Based on your description, we suggest: {DIFFICULTY_OPTIONS.find(d => d.value === suggestedDifficulty)?.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <label key={option.value} className="block cursor-pointer">
                        <div className={`p-4 border-2 rounded-lg transition-colors ${
                          formData.difficulty === option.value 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-muted hover:border-blue-300"
                        }`}>
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="difficulty"
                              value={option.value}
                              checked={formData.difficulty === option.value}
                              onChange={(e) => handleInputChange("difficulty", e.target.value)}
                              className="w-4 h-4 text-blue-600 mt-1"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{option.label}</p>
                              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                              <p className="text-sm text-blue-600 mt-1">Budget range: {option.budgetRange}</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Cost Breakdown */}
            <Card className="p-6 bg-muted/50 border-2">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Cost Breakdown
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Posting fee:</span>
                    <span className="text-sm font-medium">$10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Project escrow:</span>
                    <span className="text-sm font-medium">${formData.budget || "0"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">${calculateTotal()}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Escrow is refunded if project is cancelled
                </p>
              </div>
            </Card>

            {/* Peer Review Notice */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    Your project will be reviewed by experienced students within 24 hours 
                    to ensure scope is appropriate for student teams
                  </p>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {isEditing ? "Update Project" : "Pay & Post Project"}
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProject;
