import { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Timer,
  CheckCircle2,
  Loader2,
  Circle,
  Send,
  Paperclip,
  Link,
  FileText,
  Image,
  ThumbsUp,
  Clock,
  DollarSign
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isYou: boolean;
  hasImage?: boolean;
  emoji?: string;
}

interface Milestone {
  id: string;
  title: string;
  status: "completed" | "current" | "pending";
  percentage: number;
  amount: string;
  description?: string;
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
    title: "Kickoff meeting",
    status: "completed",
    percentage: 25,
    amount: "$62.50",
    description: "Concept - Completed"
  },
  {
    id: "2", 
    title: "Wireframes",
    status: "completed",
    percentage: 25,
    amount: "$62.50",
    description: "Planning - Completed"
  },
  {
    id: "3",
    title: "Design mockups",
    status: "current",
    percentage: 75,
    amount: "$187.50",
    description: "Working MVP - Current"
  },
  {
    id: "4",
    title: "Development",
    status: "pending",
    percentage: 100,
    amount: "$250",
    description: "Implementation"
  },
  {
    id: "5",
    title: "Review & deploy",
    status: "pending",
    percentage: 100,
    amount: "$250",
    description: "Final delivery"
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    content: "Mockups done!",
    timestamp: "2:30 PM",
    isYou: false,
    hasImage: true
  },
  {
    id: "2",
    sender: "You",
    content: "Looks great!",
    timestamp: "2:45 PM", 
    isYou: true,
    emoji: "👍"
  }
];

const DELIVERABLES: Deliverable[] = [
  {
    id: "1",
    name: "design_mockups.fig",
    type: "file",
    timestamp: "2:30 PM"
  }
];

const ProjectWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [deliverables, setDeliverables] = useState<Deliverable[]>(DELIVERABLES);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Project data (could come from location state or API)
  const project = location.state?.project || {
    id: params.id || "1",
    title: "Coffee Shop Website",
    company: "Bean There Cafe",
    progress: 40,
    daysLeft: 9
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isYou: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const deliverable: Deliverable = {
        id: Date.now().toString(),
        name: file.name,
        type: "file",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setDeliverables(prev => [...prev, deliverable]);
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "current":
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case "pending":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getMilestoneTextColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "current":
        return "text-primary font-medium";
      case "pending":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  const canSubmitForReview = true; // No mandatory requirements

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{project.title}</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          
          {/* Progress Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Progress</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span>{project.daysLeft} days left</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </div>
          </Card>

          {/* Milestones Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Milestones:</h2>
              
              <div className="space-y-3">
                {MILESTONES.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3">
                    {getMilestoneIcon(milestone.status)}
                    <span className={`flex-1 ${getMilestoneTextColor(milestone.status)}`}>
                      {milestone.title}
                      {milestone.status === "current" && " (current)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Escrow Info */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Milestone Payments
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Milestone 1 (25%): Concept</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Completed - $62.50 earned
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Milestone 2 (75%): Working MVP</span>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    Current - $187.50 pending
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Final delivery (100%)</span>
                  <span className="text-blue-700 font-medium">$250 total</span>
                </div>
              </div>
              
              <p className="text-xs text-blue-700">
                48-hour revision window per milestone
              </p>
            </div>
          </Card>

          {/* Team Chat Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Team Chat:</h2>
              
              {/* Messages */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isYou ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs ${message.isYou ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.isYou
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.emoji && (
                          <span className="text-lg ml-2">{message.emoji}</span>
                        )}
                        {message.hasImage && !message.isYou && (
                          <div className="mt-2 p-2 bg-muted-foreground/10 rounded text-xs text-center">
                            <Image className="h-4 w-4 mx-auto mb-1" />
                            Image preview
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${message.isYou ? 'justify-end' : 'justify-start'}`}>
                        {!message.isYou && <span>{message.sender}</span>}
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Deliverables Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Deliverables:</h2>
              
              {/* Upload Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleFileUpload}
                  className="flex items-center gap-2"
                >
                  <Paperclip className="h-4 w-4" />
                  Upload Files
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link className="h-4 w-4" />
                  Add Link
                </Button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="*/*"
              />

              {/* Uploaded Items */}
              {deliverables.length > 0 && (
                <div className="space-y-2">
                  <Separator />
                  <h3 className="font-medium text-sm">Uploaded:</h3>
                  {deliverables.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Work Agreement (First-time modal simulation) */}
          {!agreedToTerms && (
            <Card className="p-6 border-warning bg-warning/5">
              <div className="space-y-4">
                <h3 className="font-semibold text-warning-foreground">Work Agreement</h3>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <div className="space-y-2">
                    <label htmlFor="agreement" className="text-sm cursor-pointer">
                      I agree to standard Work-for-Hire terms
                    </label>
                    <div className="space-y-1">
                      <Button variant="link" className="h-auto p-0 text-xs text-primary">
                        View Full Agreement
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Client owns deliverables, you keep portfolio rights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <Button
            onClick={() => navigate("/project-completion", { state: { project } })}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
