import Messages from "@/pages/Messages";
import StudentMessages from "@/pages/StudentMessages";

const MessagesRouter = () => {
  // Check if user is a student or business
  const isStudent = localStorage.getItem("userSignedUp") === "true" && 
                    !localStorage.getItem("campusBuildBusiness");
  const isBusiness = localStorage.getItem("campusBuildBusiness") === "true";

  // Default to student messages if neither is clearly set
  // This handles the case where students navigate from Projects page
  if (isStudent || (!isBusiness && !isStudent)) {
    return <StudentMessages />;
  }

  return <Messages />;
};

export default MessagesRouter;

