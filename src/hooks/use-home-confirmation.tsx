import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Home } from "lucide-react";

export const useHomeConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const confirmGoHome = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const ConfirmationDialog = () => (
    <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <AlertDialogTitle className="text-lg">Return to Home?</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to return to the home page? You'll lose your current progress and need to navigate back to continue your work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="flex-1"
          >
            Stay Here
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Yes, Go Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {
    confirmGoHome,
    ConfirmationDialog,
  };
};
