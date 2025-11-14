import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppliedProjects } from "@/contexts/AppliedProjectsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload, FileText, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

// Local universities list
const UNIVERSITIES = [
  "Stanford University",
  "University of California, Berkeley",
  "University of California, Los Angeles",
  "University of Southern California",
  "California Institute of Technology",
  "San Jose State University",
  "Santa Clara University",
  "University of San Francisco",
  "San Francisco State University",
  "California State University, East Bay",
  "Mills College",
  "Dominican University of California",
  "Golden Gate University",
  "Academy of Art University",
  "University of California, San Francisco"
];

// Major fields list
const MAJORS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Data Science",
  "Cybersecurity",
  "Business Administration",
  "Marketing",
  "Finance",
  "Economics",
  "Psychology",
  "Psychology Masters",
  "Graphic Design",
  "Digital Media",
  "Communications",
  "English Literature",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Architecture",
  "Art History",
  "Political Science",
  "Sociology",
  "Philosophy",
  "History",
  "Education"
];

// Batch years (current year + past 6 years + future 2 years)
const BATCH_YEARS = Array.from({ length: 9 }, (_, i) => {
  const year = new Date().getFullYear() - 4 + i;
  return year.toString();
});

const StudentSignup = () => {
  const navigate = useNavigate();
  const { clearAppliedProjects } = useAppliedProjects();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    major: "",
    batchYear: "",
  });
  const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
  
  const totalSteps = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a JPG, PNG, or PDF file");
        return;
      }
      
      setStudentIdFile(file);
      toast.success("Student ID uploaded successfully!");
    }
  };

  const handleNext = () => {
    // Optional validation before moving to next step
    if (currentStep === 1) {
      // Validate email format if provided
      if (formData.email && !formData.email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }
      // Validate password match if provided
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Optional validations for testing - only validate if fields are filled
    if (formData.email && !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Store user data in localStorage for demo purposes
    localStorage.setItem("campusBuildUser", JSON.stringify({
      firstName: formData.firstName || "Test User",
      lastName: formData.lastName || "Student",
      email: formData.email || "test@university.edu",
      university: formData.university,
      major: formData.major,
      batchYear: formData.batchYear,
      hasStudentId: !!studentIdFile,
    }));

    // Clear any existing applied projects for new account
    clearAppliedProjects();
    // Mark that we've cleared for this new account (will be used when Projects page loads)
    sessionStorage.setItem('clearedAppliedProjectsForNewAccount', 'true');
    
    // New user - don't set userSignedUp so they see empty projects
    toast.success("Account created successfully!");
    navigate("/skills-setup");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50 focus:ring-2 focus:ring-primary/20"
          aria-label="Go back to landing page"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back to Home
        </Button>
      </div>

      <div className="flex flex-1 items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              Join CampusBuild
            </h1>
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">
                Create your student account
              </p>
              <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg inline-block">
                All fields are optional for testing purposes
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step < currentStep 
                    ? "bg-primary border-primary text-white" 
                    : step === currentStep 
                    ? "bg-primary border-primary text-white ring-4 ring-primary/20" 
                    : "bg-background border-muted-foreground/30 text-muted-foreground"
                }`}>
                  {step < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step}</span>
                  )}
                </div>
                {step < totalSteps && (
                  <div className={`w-12 h-0.5 mx-2 transition-all ${
                    step < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <h2 className="text-lg font-semibold mb-6 text-foreground">
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name
                        <span className="text-muted-foreground ml-1">(Optional)</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-describedby="firstName-help"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name
                        <span className="text-muted-foreground ml-1">(Optional)</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-describedby="lastName-help"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@university.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      aria-describedby="email-help"
                      autoComplete="email"
                    />
                    <p id="email-help" className="text-sm text-muted-foreground mt-2">
                      .edu email preferred but not required for testing
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      aria-describedby="password-help"
                      autoComplete="new-password"
                    />
                    <p id="password-help" className="text-sm text-muted-foreground">
                      Choose a strong password with at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm Password
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      aria-describedby="confirmPassword-help"
                      autoComplete="new-password"
                    />
                    <p id="confirmPassword-help" className="text-sm text-muted-foreground">
                      Re-enter your password to confirm
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <h2 className="text-lg font-semibold mb-6 text-foreground">
                  Academic Information
                </h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="university" className="text-sm font-medium text-foreground">
                      University
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Select 
                      value={formData.university} 
                      onValueChange={(value) => setFormData({ ...formData, university: value })}
                    >
                      <SelectTrigger 
                        className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-describedby="university-help"
                      >
                        <SelectValue placeholder="Choose your university" />
                      </SelectTrigger>
                      <SelectContent>
                        {UNIVERSITIES.map((university) => (
                          <SelectItem key={university} value={university} className="text-base py-3">
                            {university}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p id="university-help" className="text-sm text-muted-foreground">
                      Select your current or most recent university
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="major" className="text-sm font-medium text-foreground">
                      Major/Field of Study
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Select 
                      value={formData.major} 
                      onValueChange={(value) => setFormData({ ...formData, major: value })}
                    >
                      <SelectTrigger 
                        className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-describedby="major-help"
                      >
                        <SelectValue placeholder="Choose your major" />
                      </SelectTrigger>
                      <SelectContent>
                        {MAJORS.map((major) => (
                          <SelectItem key={major} value={major} className="text-base py-3">
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p id="major-help" className="text-sm text-muted-foreground">
                      Your primary field of study or degree program
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="batchYear" className="text-sm font-medium text-foreground">
                      Graduation Year
                      <span className="text-muted-foreground ml-1">(Optional)</span>
                    </Label>
                    <Select 
                      value={formData.batchYear} 
                      onValueChange={(value) => setFormData({ ...formData, batchYear: value })}
                    >
                      <SelectTrigger 
                        className="h-12 text-base border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-describedby="batchYear-help"
                      >
                        <SelectValue placeholder="Select graduation year" />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCH_YEARS.map((year) => (
                          <SelectItem key={year} value={year} className="text-base py-3">
                            Class of {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p id="batchYear-help" className="text-sm text-muted-foreground">
                      Your expected or actual graduation year
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Student Verification */}
            {currentStep === 3 && (
              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <h2 className="text-lg font-semibold mb-6 text-foreground">
                  Student Verification
                </h2>
                <div className="space-y-4">
                  <Label htmlFor="studentId" className="text-sm font-medium text-foreground">
                    Student ID Card
                    <span className="text-muted-foreground ml-1">(Optional)</span>
                  </Label>
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('studentId')?.click();
                      }
                    }}
                  >
                    <input
                      id="studentId"
                      name="studentId"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                      aria-describedby="studentId-help"
                    />
                    <label htmlFor="studentId" className="cursor-pointer block">
                      <div className="space-y-3">
                        {studentIdFile ? (
                          <>
                            <FileText className="h-12 w-12 mx-auto text-success" aria-hidden="true" />
                            <div>
                              <p className="text-base font-medium text-success">
                                {studentIdFile.name}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                File uploaded successfully. Click to change.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground" aria-hidden="true" />
                            <div>
                              <p className="text-base font-medium text-foreground">
                                Upload Student ID Card
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Click to browse or drag and drop
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  <p id="studentId-help" className="text-sm text-muted-foreground">
                    Accepted formats: JPG, PNG, or PDF • Maximum size: 5MB
                  </p>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 text-base font-medium"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  Create Account
                </Button>
              )}
            </div>

            {/* Terms and Sign In - Only show on final step */}
            {currentStep === totalSteps && (
              <>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline focus:underline focus:outline-none">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline focus:underline focus:outline-none">
                    Privacy Policy
                  </a>
                </p>
                
                {/* Sign In Option */}
                <div className="text-center mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    Already have an account?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/student-signin")}
                    className="w-full h-12 text-lg font-semibold border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                    size="lg"
                  >
                    Sign In to Your Account
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
