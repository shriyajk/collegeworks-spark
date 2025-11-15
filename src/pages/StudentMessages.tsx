import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Search,
  MessageCircle,
  Send,
  MoreVertical,
  Star,
  Archive,
  Users,
  Clock,
  Briefcase,
  Building2
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isUser: boolean;
}

interface Conversation {
  id: string;
  projectId: string;
  projectTitle: string;
  clientName: string;
  clientCompany: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "completed" | "archived";
  messages: Message[];
}

const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    projectId: "1",
    projectTitle: "Coffee Shop Website",
    clientName: "John Smith",
    clientCompany: "Bean There Cafe",
    lastMessage: "The mockups look great! Let's proceed with the development phase.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    status: "active",
    messages: [
      {
        id: "1",
        sender: "John Smith",
        content: "Hi! Thanks for applying to our project. We're excited to work with you.",
        timestamp: "3 days ago",
        isUser: false
      },
      {
        id: "2", 
        sender: "You",
        content: "Thank you for selecting me! I'm looking forward to building this website.",
        timestamp: "3 days ago",
        isUser: true
      },
      {
        id: "3",
        sender: "John Smith",
        content: "Great! We've reviewed your portfolio and we're impressed. When can you start?",
        timestamp: "2 days ago",
        isUser: false
      },
      {
        id: "4",
        sender: "You",
        content: "I can start immediately. I'll begin with the wireframes and share them by tomorrow.",
        timestamp: "2 days ago",
        isUser: true
      },
      {
        id: "5",
        sender: "John Smith",
        content: "The mockups look great! Let's proceed with the development phase.",
        timestamp: "2 hours ago",
        isUser: false
      },
      {
        id: "6",
        sender: "You",
        content: "Perfect! I'll start working on the homepage first and share progress updates.",
        timestamp: "1 hour ago",
        isUser: true
      }
    ]
  },
  {
    id: "2",
    projectId: "2",
    projectTitle: "Restaurant Mobile App",
    clientName: "Sarah Johnson",
    clientCompany: "FoodieHub",
    lastMessage: "We have some questions about the reservation system implementation",
    lastMessageTime: "5 hours ago",
    unreadCount: 1,
    status: "active",
    messages: [
      {
        id: "1",
        sender: "Sarah Johnson",
        content: "Welcome to the team! We're excited to have you on board.",
        timestamp: "4 days ago",
        isUser: false
      },
      {
        id: "2",
        sender: "You",
        content: "Thank you! I'm looking forward to working on this project.",
        timestamp: "4 days ago",
        isUser: true
      },
      {
        id: "3",
        sender: "Sarah Johnson",
        content: "We have some questions about the reservation system implementation",
        timestamp: "5 hours ago",
        isUser: false
      }
    ]
  },
  {
    id: "3",
    projectId: "3",
    projectTitle: "E-commerce Store",
    clientName: "Mike Chen",
    clientCompany: "TechStore",
    lastMessage: "Project completed successfully! Thank you for the excellent work.",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    status: "completed",
    messages: [
      {
        id: "1",
        sender: "Mike Chen",
        content: "Project completed successfully! Thank you for the excellent work.",
        timestamp: "1 week ago",
        isUser: false
      },
      {
        id: "2",
        sender: "You",
        content: "Thank you! It was a pleasure working with you. I hope we can collaborate again in the future.",
        timestamp: "1 week ago",
        isUser: true
      }
    ]
  }
];

const StudentMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectIdFromState = location.state?.projectId;
  
  const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select conversation if projectId is provided
  useEffect(() => {
    if (projectIdFromState) {
      const conversation = conversations.find(conv => conv.projectId === projectIdFromState);
      if (conversation) {
        setSelectedConversation(conversation);
      }
    } else if (conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [projectIdFromState, conversations]);

  // Update selected conversation when conversations change
  useEffect(() => {
    if (selectedConversation) {
      const updated = conversations.find(c => c.id === selectedConversation.id);
      if (updated) {
        setSelectedConversation(updated);
      }
    }
  }, [conversations]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const filteredConversations = conversations.filter(conv =>
    conv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.clientCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageText = newMessage.trim();
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeAgo = "Just now";

    const newMessageObj: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: messageText,
      timestamp: timestamp,
      isUser: true
    };

    // Update conversations state
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMessageObj],
            lastMessage: messageText,
            lastMessageTime: timeAgo
          };
        }
        return conv;
      })
    );

    setNewMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getBackNavigation = () => {
    // Check if user came from a specific project
    if (projectIdFromState) {
      return "/projects";
    }
    // Default back to projects page
    return "/projects";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(getBackNavigation())}
              className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="border-l pl-3 ml-3">
              <h1 className="text-xl font-bold">Messages</h1>
              <p className="text-sm text-muted-foreground">
                Communicate with project clients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 border-r bg-muted/20">
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Conversation List */}
            <div className="space-y-2">
              {filteredConversations.length === 0 ? (
                <Card className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No conversations found</p>
                </Card>
              ) : (
                filteredConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 shadow-card hover-lift ${
                      selectedConversation?.id === conversation.id ? 'bg-muted border-primary/20' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{conversation.projectTitle}</h3>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">
                              {conversation.clientCompany}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground truncate">
                              {conversation.clientName}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <Badge className={`${getStatusColor(conversation.status)} text-xs`}>
                            {conversation.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Last Message */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{conversation.lastMessageTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <h2 className="font-semibold truncate">{selectedConversation.projectTitle}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="truncate">{selectedConversation.clientCompany}</span>
                      <span>•</span>
                      <span className="truncate">{selectedConversation.clientName}</span>
                      <Badge className={getStatusColor(selectedConversation.status)}>
                        {selectedConversation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-3 max-w-[70%]">
                      {!message.isUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-gradient-primary text-white shadow-card'
                            : 'bg-white border shadow-card'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${
                            message.isUser ? 'opacity-90' : 'opacity-70'
                          }`}>
                            {message.sender}
                          </span>
                          <span className={`text-xs ${
                            message.isUser ? 'opacity-70' : 'opacity-50'
                          }`}>
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.isUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary text-white">
                            You
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
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
                    className="bg-gradient-primary hover:bg-gradient-primary-hover shadow-glow-primary button-interactive"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Select a conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a project to start messaging
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;

