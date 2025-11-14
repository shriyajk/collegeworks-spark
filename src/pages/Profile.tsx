import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeConfirmation } from "@/hooks/use-home-confirmation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Code,
  Clock,
  Home
} from "lucide-react";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  university?: string;
  major?: string;
  batchYear?: string;
  skills?: string[];
  customSkills?: string[];
  availability?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { confirmGoHome, ConfirmationDialog } = useHomeConfirmation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const campusBuildUser = localStorage.getItem("campusBuildUser");
    const studentData = localStorage.getItem("studentData");

    let userProfile: UserProfile = {};

    if (campusBuildUser) {
      try {
        const parsed = JSON.parse(campusBuildUser);
        userProfile = { ...parsed };
      } catch (e) {
        console.error("Error parsing campusBuildUser:", e);
      }
    }

    // Merge with studentData if available
    if (studentData) {
      try {
        const parsed = JSON.parse(studentData);
        if (parsed.email && !userProfile.email) {
          userProfile.email = parsed.email;
        }
        if (parsed.name && !userProfile.firstName && !userProfile.lastName) {
          const nameParts = parsed.name.split(" ");
          userProfile.firstName = nameParts[0] || "";
          userProfile.lastName = nameParts.slice(1).join(" ") || "";
        }
      } catch (e) {
        console.error("Error parsing studentData:", e);
      }
    }

    // Check if we have any meaningful data
    const hasData = 
      userProfile.firstName || 
      userProfile.lastName || 
      userProfile.email || 
      userProfile.university || 
      userProfile.major || 
      (userProfile.skills && userProfile.skills.length > 0);

    if (hasData) {
      setProfile(userProfile);
      setIsAnonymous(false);
    } else {
      setIsAnonymous(true);
      setProfile({
        firstName: "Anonymous",
        lastName: "User",
        email: "anonymous@example.com",
      });
    }
  }, []);

  const getInitials = () => {
    if (isAnonymous) return "AU";
    const first = profile?.firstName?.charAt(0) || "";
    const last = profile?.lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const getFullName = () => {
    if (isAnonymous) return "Anonymous User";
    const first = profile?.firstName || "";
    const last = profile?.lastName || "";
    return `${first} ${last}`.trim() || "User";
  };

  const allSkills = [
    ...(profile?.skills || []),
    ...(profile?.customSkills || [])
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-lg sm:text-xl font-bold text-primary">Profile</h1>
          <Button
            variant="ghost"
            onClick={confirmGoHome}
            className="gap-1 sm:gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
          >
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Profile Header Card */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarFallback className="text-2xl sm:text-3xl bg-primary/10 text-primary">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {getFullName()}
                  </h2>
                  {isAnonymous && (
                    <Badge variant="outline" className="mt-2">
                      Anonymous Profile
                    </Badge>
                  )}
                </div>
                {profile?.email && (
                  <div className="flex items-center gap-2 text-muted-foreground justify-center sm:justify-start">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{profile.email}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          {(profile?.university || profile?.major || profile?.batchYear) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Information
              </h3>
              <div className="space-y-4">
                {profile.university && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="text-base font-medium">{profile.university}</p>
                    </div>
                  </div>
                )}
                {profile.major && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Major</p>
                      <p className="text-base font-medium">{profile.major}</p>
                    </div>
                  </div>
                )}
                {profile.batchYear && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Graduation Year</p>
                      <p className="text-base font-medium">Class of {profile.batchYear}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Skills */}
          {allSkills.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Availability */}
          {profile?.availability && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Availability
              </h3>
              <p className="text-base">{profile.availability}</p>
            </Card>
          )}

          {/* Empty State for Anonymous Users */}
          {isAnonymous && (
            <Card className="p-8 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-muted-foreground mb-4">
                Add your information to personalize your profile and connect with better opportunities.
              </p>
              <Button onClick={() => navigate("/student-signup")}>
                Set Up Profile
              </Button>
            </Card>
          )}
        </div>
      </main>

      <ConfirmationDialog />
    </div>
  );
};

export default Profile;

