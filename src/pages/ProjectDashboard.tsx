import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Star,
  MessageCircle,
  Timer,
  CheckCircle2,
  Loader2,
  Circle,
  FileText,
  Link2,
  Download,
  Upload,
  DollarSign,
  AlertTriangle,
  Eye,
  Calendar,
  Activity,
  Users,
  Phone
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  status: "completed" | "current" | "pending";
  date: string;
  deliverable?: string;
  description?: string;
  escrowAmount?: string;
  dueDate?: string;
}

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: "upload" | "message" | "approval" | "question";
}

interface Deliverable {
  id: string;
  name: string;
  type: "file" | "link";
  timestamp: string;
  url?: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "1",
    title: "Kickoff Meeting",
    status: "completed",
    date: "Nov 5",
    deliverable: "Project brief agreed",
    description: "Initial project scope and requirements discussion"
  },
  {
    id: "2",
    title: "Wireframes",
    status: "completed", 
    date: "Nov 8",
    deliverable: "Wireframe.fig",
    description: "Site structure and layout planning"
  },
  {
    id: "3",
    title: "Design Mockups",
    status: "current",
    dueDate: "Nov 12",
    deliverable: "design_v1.fig",
    escrowAmount: "$187.50",
    description: "Visual design and branding"
  },
  {
    id: "4",
    title: "Development",
    status: "pending",
    date: "Nov 18",
    description: "Frontend implementation"
  },
  {
    id: "5",
    title: "Final Review & Deploy",
    status: "pending",
    date: "Nov 22",
    description: "Testing, review, and launch"
  }
];

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    message: "Sarah uploaded design mockups",
    timestamp: "2 hours ago",
    type: "upload"
  },
  {
    id: "2",
    message: "Alex asked a question",
    timestamp: "5 hours ago", 
    type: "question"
  },
  {
    id: "3",
    message: "You approved wireframes",
    timestamp: "4 days ago",
    type: "approval"
  }
];

const DELIVERABLES: Deliverable[] = [
  {
    id: "1",
    name: "design_mockups.fig",
    type: "file",
    timestamp: "Uploaded 2 hours ago"
  },
  {
    id: "2",
    name: "Prototype link",
    type: "link",
    timestamp: "Shared 3 hours ago",
    url: "https://figma.com/proto/..."
  }
];

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const project = location.state?.project || {
    title: "Coffee Shop Website",
    progress: 40,
    daysRemaining: 9,
    status: "on_track"
  };

  const team = location.state?.team || {
    name: "Alex + Sarah",
    members: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "Sarah Kim", avatar: "SK" }
    ],
    rating: 4.9
  };

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [changeRequest, setChangeRequest] = useState("");
  const [approvalChecked, setApprovalChecked] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [milestones, setMilestones] = useState(MILESTONES);
  const [chatMessages, setChatMessages] = useState([
    { id: "1", sender: "Alex", message: "Can you review the color scheme?", timestamp: "1 hour ago", isUser: false },
    { id: "2", sender: "Sarah", message: "Mockups are ready for review!", timestamp: "2 hours ago", isUser: false },
    { id: "3", sender: "You", message: "Looking great so far!", timestamp: "3 hours ago", isUser: true }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleApproveMilestone = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setShowApprovalModal(true);
    setApprovalChecked(false);
    setChangeRequest("");
  };

  const confirmApproval = () => {
    if (selectedMilestone) {
      // Update milestone status to completed and move to next
      const updatedMilestones = milestones.map(m => {
        if (m.id === selectedMilestone.id) {
          return { ...m, status: "completed" as const };
        }
        // Move next milestone to current if this one is completed
        if (parseInt(m.id) === parseInt(selectedMilestone.id) + 1) {
          return { ...m, status: "current" as const };
        }
        return m;
      });
      
      setMilestones(updatedMilestones);
      setShowApprovalModal(false);
      setSelectedMilestone(null);
      setApprovalChecked(false);
      setChangeRequest("");
    }
  };

  const handleNextMilestone = () => {
    // Find current milestone and move it to completed, next to current
    const currentMilestone = milestones.find(m => m.status === "current");
    if (currentMilestone) {
      const updatedMilestones = milestones.map(m => {
        if (m.id === currentMilestone.id) {
          return { ...m, status: "completed" as const };
        }
        if (parseInt(m.id) === parseInt(currentMilestone.id) + 1) {
          return { ...m, status: "current" as const };
        }
        return m;
      });
      setMilestones(updatedMilestones);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage,
        timestamp: "Just now",
        isUser: true
      };
      setChatMessages([message, ...chatMessages]);
      setNewMessage("");
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case "current":
        return <Loader2 className="h-6 w-6 text-primary animate-spin" />;
      case "pending":
        return <Circle className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4 text-blue-600" />;
      case "message":
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      case "approval":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "question":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/my-projects")}
            className="gap-2 h-12 px-4 text-base font-medium hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted-foreground">Project Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          
          {/* Team Info Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
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
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(team.rating)}</div>
                    <span className="text-sm text-muted-foreground">{team.rating}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowChatModal(true)}
              >
                <MessageCircle className="h-4 w-4" />
                Message Team
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Progress Section */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Project Progress</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span>{project.daysRemaining} days remaining</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{project.progress}% Complete</span>
                      <span className={`font-medium ${
                        project.status === "on_track" ? "text-success" : "text-warning"
                      }`}>
                        {project.status === "on_track" ? "On track" : "Behind schedule"}
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                </div>
              </Card>

              {/* Milestones Tracker */}
              <Card className="p-6">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Project Milestones</h2>
                  
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex gap-4">
                        
                        {/* Timeline Icon */}
                        <div className="flex flex-col items-center">
                          {getMilestoneIcon(milestone.status)}
                          {index < MILESTONES.length - 1 && (
                            <div className="w-px h-12 bg-muted mt-2" />
                          )}
                        </div>

                        {/* Milestone Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{milestone.title}</h3>
                            <span className="text-sm text-muted-foreground">
                              {milestone.status === "current" ? `Due ${milestone.dueDate}` : milestone.date}
                            </span>
                          </div>
                          
                          {milestone.description && (
                            <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                          )}

                          {milestone.deliverable && (
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{milestone.deliverable}</span>
                              {milestone.status !== "pending" && (
                                <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View File
                                </Button>
                              )}
                            </div>
                          )}

                          {milestone.status === "current" && milestone.escrowAmount && (
                            <div className="space-y-3">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-900">
                                  {milestone.escrowAmount} will be released upon approval
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Request Changes
                                </Button>
                                <Button 
                                  onClick={() => handleApproveMilestone(milestone)}
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Approve Milestone
                                </Button>
                              </div>
                            </div>
                          )}

                          {milestone.status === "completed" && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Approved
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Updates</h2>
                    <Button variant="link" className="text-sm">
                      View All Activity
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {RECENT_ACTIVITY.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Deliverables Section */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Project Deliverables</h2>
                  
                  <div className="space-y-3">
                    {DELIVERABLES.map((deliverable) => (
                      <div key={deliverable.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {deliverable.type === "file" ? (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{deliverable.name}</p>
                            <p className="text-xs text-muted-foreground">{deliverable.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          {deliverable.type === "file" ? (
                            <>
                              <Download className="h-3 w-3" />
                              Download
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3" />
                              View
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Upload Area for Business */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Share files with team</h3>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload project assets, brand guidelines, or reference materials
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              
              {/* Escrow Summary Card */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    Payment Status
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total project:</span>
                      <span className="font-medium">$250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Released so far:</span>
                      <span className="font-medium text-success">$62.50 (25%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending approval:</span>
                      <span className="font-medium text-warning">$187.50 (75%)</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-medium">$250 (100% at completion)</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Demo Controls */}
              <Card className="p-4 border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-gray-600" />
                    <h4 className="font-medium text-sm text-gray-700">Demo Controls</h4>
                  </div>
                  <p className="text-xs text-gray-600">Skip to different project stages:</p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => navigate("/final-review", { state: { project, team } })}
                      variant="outline"
                      size="sm"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Simulate Project Complete
                    </Button>
                    <Button
                      onClick={handleNextMilestone}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Skip to Next Milestone
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Bottom Action Buttons */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Request Changes
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMilestone?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedMilestone && (
            <div className="space-y-6">
              {/* Deliverables Preview */}
              <div className="space-y-3">
                <h4 className="font-medium">Deliverables</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Design mockups</p>
                      <p className="text-xs text-muted-foreground">Figma file</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                      <Link2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Prototype link</p>
                      <p className="text-xs text-muted-foreground">Interactive preview</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>Review the work carefully.</strong> Approving releases payment to the team.
                </p>
                <p className="text-sm text-blue-800">
                  {selectedMilestone.escrowAmount} will be released (75% milestone)
                </p>
              </div>

              {/* Revision Option */}
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-900 mb-2">
                    <strong>Need changes?</strong> You have a 48-hour revision window
                  </p>
                </div>
                <Textarea
                  placeholder="Request specific changes (optional)"
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  className="min-h-20"
                />
              </div>

              {/* Confirmation */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="approval-check"
                  checked={approvalChecked}
                  onCheckedChange={(checked) => setApprovalChecked(checked as boolean)}
                />
                <label htmlFor="approval-check" className="text-sm">
                  Work meets requirements
                </label>
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
                  onClick={confirmApproval}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Approve & Release Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Team Chat
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[400px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-muted/20 rounded-lg">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">
                        {msg.sender}
                      </span>
                      <span className="text-xs opacity-70">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2 mt-4">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] max-h-[80px]"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDashboard;
