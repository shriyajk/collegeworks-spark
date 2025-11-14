import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type BusinessProject = {
  id: string;
  title: string;
  status: "active" | "review" | "completed" | "draft";
  budget: number;
  timeline: string;
  team?: {
    name: string;
    members: number;
    rating: number;
  };
  progress?: number;
  applications?: number;
  postedDate: string;
  dueDate?: string;
  description: string;
};

interface BusinessProjectsContextType {
  businessProjects: BusinessProject[];
  addBusinessProject: (project: BusinessProject) => void;
  clearBusinessProjects: () => void;
  populateMockDataForSignIn: () => void;
}

const BusinessProjectsContext = createContext<BusinessProjectsContextType | undefined>(undefined);

export const BusinessProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [businessProjects, setBusinessProjects] = useState<BusinessProject[]>([]);

  // Clear projects for new businesses - check on mount only
  // Only clear if projects contain mock data IDs (from previous sign-in session)
  useEffect(() => {
    const isSignedInUser = localStorage.getItem('userSignedUp') === 'true';
    const hasCampusBuildBusiness = localStorage.getItem('campusBuildBusiness');
    
    // If it's a new business signup (has campusBuildBusiness but not signed in)
    // Only clear if projects have mock data IDs (stale from previous session)
    if (!isSignedInUser && hasCampusBuildBusiness && businessProjects.length > 0) {
      const hasMockData = businessProjects.some(p => ["1", "2", "3", "4"].includes(p.id));
      if (hasMockData) {
        setBusinessProjects([]);
      }
    }
  }, []); // Only run once on mount

  const addBusinessProject = useCallback((project: BusinessProject) => {
    setBusinessProjects((prev) => [...prev, project]);
  }, []);

  const clearBusinessProjects = useCallback(() => {
    setBusinessProjects([]);
  }, []);

  const populateMockDataForSignIn = useCallback(() => {
    const mockProjects: BusinessProject[] = [
      {
        id: "1",
        title: "Coffee Shop Website",
        status: "active",
        budget: 250,
        timeline: "2 weeks",
        team: {
          name: "Alex + Sarah",
          members: 2,
          rating: 4.9
        },
        progress: 65,
        postedDate: "2024-11-10",
        dueDate: "2024-11-24",
        description: "Modern responsive website for local coffee shop with online ordering"
      },
      {
        id: "2", 
        title: "Restaurant Mobile App",
        status: "review",
        budget: 450,
        timeline: "3 weeks",
        applications: 12,
        postedDate: "2024-11-08",
        description: "iOS/Android app for restaurant reservations and menu browsing"
      },
      {
        id: "3",
        title: "E-commerce Store",
        status: "completed",
        budget: 380,
        timeline: "4 weeks",
        team: {
          name: "Mike + Emma + Chen",
          members: 3,
          rating: 4.8
        },
        progress: 100,
        postedDate: "2024-10-15",
        dueDate: "2024-11-12",
        description: "Full e-commerce platform with payment integration and admin dashboard"
      },
      {
        id: "4",
        title: "Portfolio Website",
        status: "draft",
        budget: 180,
        timeline: "1 week",
        postedDate: "2024-11-12",
        description: "Personal portfolio website for creative professional"
      }
    ];
    setBusinessProjects(mockProjects);
  }, []);

  return (
    <BusinessProjectsContext.Provider
      value={{
        businessProjects,
        addBusinessProject,
        clearBusinessProjects,
        populateMockDataForSignIn,
      }}
    >
      {children}
    </BusinessProjectsContext.Provider>
  );
};

export const useBusinessProjects = () => {
  const context = useContext(BusinessProjectsContext);
  if (context === undefined) {
    throw new Error("useBusinessProjects must be used within a BusinessProjectsProvider");
  }
  return context;
};

