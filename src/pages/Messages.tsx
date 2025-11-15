import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  Trash2,
  Users,
  Clock
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
  projectTitle: string;
  teamName: string;
  teamMembers: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "completed" | "archived";
  messages: Message[];
}

const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    projectTitle: "Coffee Shop Website",
    teamName: "Alex + Sarah",
    teamMembers: ["Alex Chen", "Sarah Kim"],
    lastMessage: "The mockups are ready for your review!",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    status: "active",
    messages: [
      {
        id: "1",
        sender: "Alex Chen",
        content: "Hi! We've started working on the wireframes. Should have them ready by tomorrow.",
        timestamp: "2 days ago",
        isUser: false
      },
      {
        id: "2", 
        sender: "You",
        content: "Great! Looking forward to seeing them. Make sure to include the online ordering flow.",
        timestamp: "2 days ago",
        isUser: true
      },
      {
        id: "3",
        sender: "Sarah Kim",
        content: "Wireframes are complete! We've included 3 different layout options for the homepage.",
        timestamp: "1 day ago",
        isUser: false
      },
      {
        id: "4",
        sender: "You",
        content: "These look fantastic! I love option 2. Can you proceed with the detailed mockups?",
        timestamp: "1 day ago",
        isUser: true
      },
      {
        id: "5",
        sender: "Sarah Kim",
        content: "The mockups are ready for your review!",
        timestamp: "2 hours ago",
        isUser: false
      },
      {
        id: "6",
        sender: "Alex Chen",
        content: "We've also prepared a clickable prototype. Link is in the project dashboard.",
        timestamp: "2 hours ago",
        isUser: false
      }
    ]
  },
  {
    id: "2",
    projectTitle: "Restaurant Mobile App",
    teamName: "Mike + Emma + Chen",
    teamMembers: ["Mike Johnson", "Emma Liu", "Chen Wang"],
    lastMessage: "We have some questions about the reservation system",
    lastMessageTime: "5 hours ago",
    unreadCount: 1,
    status: "active",
    messages: [
      {
        id: "1",
        sender: "Mike Johnson",
        content: "Thanks for selecting our team! We're excited to work on this project.",
        timestamp: "3 days ago",
        isUser: false
      },
      {
        id: "2",
        sender: "You",
        content: "Welcome to the team! Looking forward to working with you all.",
        timestamp: "3 days ago",
        isUser: true
      },
      {
        id: "3",
        sender: "Emma Liu",
        content: "We have some questions about the reservation system",
        timestamp: "5 hours ago",
        isUser: false
      }
    ]
  },
  {
    id: "3",
    projectTitle: "E-commerce Store",
    teamName: "Jordan + Pat",
    teamMembers: ["Jordan Smith", "Pat Wilson"],
    lastMessage: "Project completed successfully! Thank you for the great review.",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    status: "completed",
    messages: [
      {
        id: "1",
        sender: "Jordan Smith",
        content: "Project completed successfully! Thank you for the great review.",
        timestamp: "1 week ago",
        isUser: false
      },
      {
        id: "2",
        sender: "You",
        content: "Thank you both for the excellent work! Would love to work together again.",
        timestamp: "1 week ago",
        isUser: true
      }
    ]
  }
];

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    conv.teamName.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/business-dashboard")}
              className="gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs sm:text-base px-2 sm:px-4 h-8 sm:h-10"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back
            </Button>
            <h1 className="text-lg sm:text-2xl font-bold text-primary">CampusBuild</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Title */}
        <div className="px-4 py-3 border-b bg-background">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Communicate with your project teams
          </p>
        </div>
        
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
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm">{conversation.projectTitle}</h3>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {conversation.teamName}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <Badge className={getStatusColor(conversation.status)}>
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
              ))}
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
                  <div className="space-y-1">
                    <h2 className="font-semibold">{selectedConversation.projectTitle}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{selectedConversation.teamMembers.join(", ")}</span>
                      <Badge className={getStatusColor(selectedConversation.status)}>
                        {selectedConversation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                          <AvatarFallback className="text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium opacity-70">
                            {message.sender}
                          </span>
                          <span className="text-xs opacity-50">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.isUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
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
                    className="bg-blue-600 hover:bg-blue-700"
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
                    Choose a project team to start messaging
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
