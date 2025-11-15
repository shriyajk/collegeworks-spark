import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppliedProjectsProvider } from "@/contexts/AppliedProjectsContext";
import { BusinessProjectsProvider } from "@/contexts/BusinessProjectsContext";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import StudentSignup from "./pages/StudentSignup";
import StudentSignIn from "./pages/StudentSignIn";
import BusinessSignup from "./pages/BusinessSignup";
import BusinessSignIn from "./pages/BusinessSignIn";
import BusinessPendingApproval from "./pages/BusinessPendingApproval";
import BusinessDashboard from "./pages/BusinessDashboard";
import PostProject from "./pages/PostProject";
import ProjectSubmitted from "./pages/ProjectSubmitted";
import WaitingForApplications from "./pages/WaitingForApplications";
import MyProjects from "./pages/MyProjects";
import Messages from "./pages/Messages";
import MessagesRouter from "./components/MessagesRouter";
import Settings from "./pages/Settings";
import ReviewApplications from "./pages/ReviewApplications";
import ProjectDashboard from "./pages/ProjectDashboard";
import FinalReview from "./pages/FinalReview";
import BusinessSuccess from "./pages/BusinessSuccess";
import SkillsSetup from "./pages/SkillsSetup";
import ProjectFeed from "./pages/ProjectFeed";
import ProjectDetail from "./pages/ProjectDetail";
import TeamFormation from "./pages/TeamFormation";
import FindTeams from "./pages/FindTeams";
import ApplicationSent from "./pages/ApplicationSent";
import Projects from "./pages/Projects";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import ProjectCompletion from "./pages/ProjectCompletion";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppliedProjectsProvider>
        <BusinessProjectsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/student-signin" element={<StudentSignIn />} />
            <Route path="/business-signup" element={<BusinessSignup />} />
            <Route path="/business-signin" element={<BusinessSignIn />} />
            <Route path="/business-pending-approval" element={<BusinessPendingApproval />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/post-project" element={<PostProject />} />
            <Route path="/project-submitted" element={<ProjectSubmitted />} />
            <Route path="/waiting-for-applications" element={<WaitingForApplications />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/messages" element={<MessagesRouter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/review-applications" element={<ReviewApplications />} />
            <Route path="/project-dashboard" element={<ProjectDashboard />} />
            <Route path="/final-review" element={<FinalReview />} />
            <Route path="/business-success" element={<BusinessSuccess />} />
            <Route path="/skills-setup" element={<SkillsSetup />} />
            <Route path="/feed" element={<ProjectFeed />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/teams" element={<TeamFormation />} />
            <Route path="/find-teams" element={<FindTeams />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id/workspace" element={<ProjectWorkspace />} />
            <Route path="/project-completion" element={<ProjectCompletion />} />
            <Route path="/application-sent" element={<ApplicationSent />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </BusinessProjectsProvider>
      </AppliedProjectsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
