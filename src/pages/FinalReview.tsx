import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Star,
  Globe,
  Github,
  FileText,
  ExternalLink,
  Info,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Repeat,
  Eye
} from "lucide-react";

interface ReviewChecklist {
  id: string;
  label: string;
  checked: boolean;
}

interface RatingCategory {
  id: string;
  label: string;
  rating: number;
}

const INITIAL_CHECKLIST: ReviewChecklist[] = [
  { id: "desktop", label: "Website works on desktop", checked: false },
  { id: "mobile", label: "Website works on mobile", checked: false },
  { id: "pages", label: "All 5 pages are complete", checked: false },
  { id: "design", label: "Design matches requirements", checked: false },
  { id: "docs", label: "Documentation provided", checked: false }
];

const INITIAL_RATINGS: RatingCategory[] = [
  { id: "quality", label: "Quality of Work", rating: 5 },
  { id: "communication", label: "Communication", rating: 5 },
  { id: "timeliness", label: "Timeliness", rating: 5 }
];

const FinalReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    totalAmount: 250,
    paidAmount: 187.50,
    finalAmount: 62.50
  };

  const team = location.state?.team || {
    name: "Alex + Sarah",
    members: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "Sarah Kim", avatar: "SK" }
    ]
  };

  const [checklist, setChecklist] = useState<ReviewChecklist[]>(INITIAL_CHECKLIST);
  const [ratings, setRatings] = useState<RatingCategory[]>(INITIAL_RATINGS);
  const [reviewText, setReviewText] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [changeRequest, setChangeRequest] = useState("");
  const [approvalChecks, setApprovalChecks] = useState({
    reviewed: false,
    meetsRequirements: false,
    agreePayment: false
  });

  const handleChecklistChange = (id: string, checked: boolean) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  const handleRatingChange = (categoryId: string, rating: number) => {
    setRatings(prev => prev.map(category =>
      category.id === categoryId ? { ...category, rating } : category
    ));
  };

  const renderStars = (rating: number, categoryId: string, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={interactive ? () => handleRatingChange(categoryId, i + 1) : undefined}
      />
    ));
  };

  const handleApproval = () => {
    if (approvalChecks.reviewed && approvalChecks.meetsRequirements && approvalChecks.agreePayment) {
      // Store approval data
      localStorage.setItem("projectApproval", JSON.stringify({
        project,
        team,
        checklist,
        ratings,
        reviewText,
        approvedAt: new Date().toISOString()
      }));
      
      navigate("/business-success", { 
        state: { 
          project, 
          team, 
          ratings,
          reviewText 
        } 
      });
    }
  };

  const allChecklistComplete = checklist.every(item => item.checked);
  const averageRating = ratings.reduce((sum, cat) => sum + cat.rating, 0) / ratings.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-dashboard")}
            className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">Final Review - {project.title}</h1>
            <p className="text-sm text-muted-foreground">Review and approve final deliverables</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          
          {/* Project Status Banner */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Final deliverables submitted by {team.name}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Submitted 2 hours ago
                </p>
              </div>
            </div>
          </Card>

          {/* Team Info */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {team.members.map((member, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-background"
                  >
                    <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">{team.name}</h3>
                <p className="text-sm text-muted-foreground">Awaiting your approval</p>
              </div>
            </div>
          </Card>

          {/* Final Deliverables Section */}
          <Card className="p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Final Project Deliverables</h2>
              
              <div className="space-y-4">
                {/* Live Website */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Live Website</p>
                      <p className="text-sm text-muted-foreground">coffeeshop-demo.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Site
                  </Button>
                </div>

                {/* Source Code */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Github className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Source Code</p>
                      <p className="text-sm text-muted-foreground">github.com/team/coffee-shop</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Repository
                  </Button>
                </div>

                {/* Documentation */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Documentation</p>
                      <p className="text-sm text-muted-foreground">README.md + Setup Guide</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Docs
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Review Checklist */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Review Checklist</h2>
              
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                    />
                    <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>

              {allChecklistComplete && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    All items reviewed!
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Rating Section */}
          <Card className="p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Rate the Team</h2>
              
              <div className="space-y-4">
                {ratings.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <span className="font-medium">{category.label}</span>
                    <div className="flex gap-1">
                      {renderStars(category.rating, category.id, true)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Average Rating:</span>
                <div className="flex gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span>{averageRating.toFixed(1)}</span>
              </div>
            </div>
          </Card>

          {/* Written Review */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Write a Review (Optional)</h2>
              
              <Textarea
                placeholder="Share your experience working with this team..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-24"
                maxLength={300}
              />
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{reviewText.length}/300</span>
              </div>

              {/* Testimonial Preview */}
              {reviewText && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Your Business</span>
                      <div className="flex gap-1">
                        {renderStars(Math.round(averageRating))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"{reviewText}"</p>
                    <p className="text-xs text-muted-foreground">
                      This will be visible on the team's profile
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Info Card */}
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="space-y-4">
              <h3 className="font-semibold text-yellow-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Final Payment Release
              </h3>
              
              <p className="text-sm text-yellow-800">
                Approving will release ${project.totalAmount} to {team.name}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Already paid:</span>
                  <span className="font-medium">${project.paidAmount} (75%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Final payment:</span>
                  <span className="font-medium">${project.finalAmount} (25%)</span>
                </div>
                <Separator className="bg-yellow-300" />
                <div className="flex justify-between font-medium">
                  <span className="text-yellow-900">Total:</span>
                  <span>${project.totalAmount}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Re-hire Incentive Box */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-900">Loved working with this team?</p>
                  <p className="text-sm text-green-700 mt-1">
                    Re-hiring the same team saves time and builds better results
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 gap-2">
                  <Repeat className="h-4 w-4" />
                  Book Again
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                    20% off
                  </Badge>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
        <div className="mx-auto max-w-2xl flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowChangesModal(true)}
            className="flex-1 h-12"
          >
            Request Final Changes
          </Button>
          <Button
            onClick={() => setShowApprovalModal(true)}
            disabled={!allChecklistComplete}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
          >
            Approve & Release Payment
          </Button>
        </div>
      </div>

      {/* Changes Request Modal */}
      <Dialog open={showChangesModal} onOpenChange={setShowChangesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Final Changes</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-900">
                Teams have 48 hours to make revisions
              </p>
            </div>
            
            <Textarea
              placeholder="What changes are needed?"
              value={changeRequest}
              onChange={(e) => setChangeRequest(e.target.value)}
              className="min-h-24"
            />
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowChangesModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle change request
                  setShowChangesModal(false);
                  setChangeRequest("");
                }}
                disabled={!changeRequest.trim()}
                className="flex-1"
              >
                Send Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Confirmation Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Final Work?</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Summary */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project:</span>
                <span className="font-medium">{project.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team:</span>
                <span className="font-medium">{team.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-medium">${project.totalAmount}</span>
              </div>
            </div>

            {/* Confirmation Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="reviewed"
                  checked={approvalChecks.reviewed}
                  onCheckedChange={(checked) => 
                    setApprovalChecks(prev => ({ ...prev, reviewed: checked as boolean }))
                  }
                />
                <label htmlFor="reviewed" className="text-sm">
                  I have reviewed all deliverables
                </label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox
                  id="meets-requirements"
                  checked={approvalChecks.meetsRequirements}
                  onCheckedChange={(checked) => 
                    setApprovalChecks(prev => ({ ...prev, meetsRequirements: checked as boolean }))
                  }
                />
                <label htmlFor="meets-requirements" className="text-sm">
                  I confirm work meets requirements
                </label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agree-payment"
                  checked={approvalChecks.agreePayment}
                  onCheckedChange={(checked) => 
                    setApprovalChecks(prev => ({ ...prev, agreePayment: checked as boolean }))
                  }
                />
                <label htmlFor="agree-payment" className="text-sm">
                  I agree to release final payment
                </label>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <p className="text-sm text-red-900">
                This action cannot be undone
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowApprovalModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApproval}
                disabled={!Object.values(approvalChecks).every(Boolean)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Approve & Pay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom spacing for fixed buttons */}
      <div className="h-20" />
    </div>
  );
};

export default FinalReview;
