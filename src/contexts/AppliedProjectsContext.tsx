import { createContext, useContext, useState, ReactNode } from "react";

export type AppliedProject = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "Applied" | "In review";
  company?: string;
  budget?: string;
};

interface AppliedProjectsContextType {
  appliedProjects: AppliedProject[];
  addAppliedProject: (project: AppliedProject) => void;
  hasAppliedToProject: (projectId: string) => boolean;
  clearAppliedProjects: () => void;
  populateMockDataForSignIn: () => void;
}

const AppliedProjectsContext = createContext<AppliedProjectsContextType | undefined>(undefined);

export const AppliedProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [appliedProjects, setAppliedProjects] = useState<AppliedProject[]>([]);

  const addAppliedProject = (project: AppliedProject) => {
    setAppliedProjects((prev) => {
      // Check if project already exists
      if (prev.some((p) => p.id === project.id)) {
        return prev;
      }
      return [...prev, project];
    });
  };

  const hasAppliedToProject = (projectId: string) => {
    return appliedProjects.some((p) => p.id === projectId);
  };

  const clearAppliedProjects = () => {
    setAppliedProjects([]);
  };

  const populateMockDataForSignIn = () => {
    // Populate with mock applied projects for returning users
    const mockAppliedProjects: AppliedProject[] = [
      {
        id: "1",
        title: "Coffee Shop Website",
        level: "Beginner",
        status: "Applied",
        company: "Bean There Cafe",
        budget: "$250",
      },
      {
        id: "2",
        title: "Student Startup MVP",
        level: "Intermediate",
        status: "In review",
        company: "TechLaunch",
        budget: "$450",
      },
      {
        id: "3",
        title: "E-commerce Platform",
        level: "Advanced",
        status: "Applied",
        company: "ShopLocal",
        budget: "$800",
      },
    ];
    setAppliedProjects(mockAppliedProjects);
  };

  return (
    <AppliedProjectsContext.Provider
      value={{
        appliedProjects,
        addAppliedProject,
        hasAppliedToProject,
        clearAppliedProjects,
        populateMockDataForSignIn,
      }}
    >
      {children}
    </AppliedProjectsContext.Provider>
  );
};

export const useAppliedProjects = () => {
  const context = useContext(AppliedProjectsContext);
  if (context === undefined) {
    throw new Error("useAppliedProjects must be used within an AppliedProjectsProvider");
  }
  return context;
};

