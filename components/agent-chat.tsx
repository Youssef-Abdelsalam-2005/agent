"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bot,
  SendHorizontal,
  User,
  MessageSquare,
  MessageSquarePlus,
  ChevronDown,
  ChevronRight,
  FileText,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CustomInput from "@/components/custom-input";

type ToolCall = {
  id: string;
  name: string;
  args: any;
  result?: any;
  resources?: { title: string; snippet: string; href?: string }[];
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: ToolCall[];
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "demo1",
      role: "user",
      content: "Search for information about our Q4 planning",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "demo2",
      role: "assistant",
      content: "I'll search your vault for Q4 planning information.",
      toolCalls: [
        {
          id: "search1",
          name: "search_vault",
          args: { query: "Q4 planning" },
          resources: [
            {
              title: "Q4 Planning Document.pdf",
              snippet:
                "Our Q4 objectives include launching the new product line, expanding to 3 new markets, and achieving 40% revenue growth...",
              href: "#",
            },
            {
              title: "Budget Allocation Q4.xlsx",
              snippet:
                "Marketing: $2.5M, Development: $1.8M, Operations: $1.2M, with contingency reserves of $500K...",
              href: "#",
            },
          ],
        },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "demo3",
      role: "assistant",
      content:
        "Based on the documents I found, your Q4 planning focuses on three main areas:\n\n1. **Product Launch**: New product line with projected 40% revenue growth\n2. **Market Expansion**: Entry into 3 new geographical markets\n3. **Budget Allocation**: Total budget of $6M across marketing, development, and operations\n\nThe planning documents show detailed timelines and resource allocation. Would you like me to dive deeper into any specific aspect?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "demo4",
      role: "user",
      content: "Search for information about our Q4 planning",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "demo5",
      role: "assistant",
      content: "I'll search your vault for Q4 planning information.",
      toolCalls: [
        {
          id: "search1",
          name: "search_vault",
          args: { query: "Q4 planning" },
          resources: [
            {
              title: "Q4 Planning Document.pdf",
              snippet:
                "Our Q4 objectives include launching the new product line, expanding to 3 new markets, and achieving 40% revenue growth...",
              href: "#",
            },
            {
              title: "Budget Allocation Q4.xlsx",
              snippet:
                "Marketing: $2.5M, Development: $1.8M, Operations: $1.2M, with contingency reserves of $500K...",
              href: "#",
            },
          ],
        },
        {
          id: "search2",
          name: "send_email",
          args: { query: "Email this and that" },
        },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "demo6",
      role: "assistant",
      content:
        "Based on the documents I found, your Q4 planning focuses on three main areas:\n\n1. **Product Launch**: New product line with projected 40% revenue growth\n2. **Market Expansion**: Entry into 3 new geographical markets\n3. **Budget Allocation**: Total budget of $6M across marketing, development, and operations\n\nThe planning documents show detailed timelines and resource allocation. Would you like me to dive deeper into any specific aspect?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "demo7",
      role: "user",
      content: "Search for information about our Q4 planning",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "demo8",
      role: "assistant",
      content: "I'll search your vault for Q4 planning information.",
      toolCalls: [
        {
          id: "search1",
          name: "search_vault",
          args: { query: "Q4 planning" },
          resources: [
            {
              title: "Q4 Planning Document.pdf",
              snippet:
                "Our Q4 objectives include launching the new product line, expanding to 3 new markets, and achieving 40% revenue growth...",
              href: "#",
            },
            {
              title: "Budget Allocation Q4.xlsx",
              snippet:
                "Marketing: $2.5M, Development: $1.8M, Operations: $1.2M, with contingency reserves of $500K...",
              href: "#",
            },
          ],
        },
        {
          id: "seearch2",
          name: "search_web",
          args: { query: "What is happening" },
          resources: [
            {
              title: "Q4 Planning Document.pdf",
              snippet:
                "Our Q4 objectives include launching the new product line, expanding to 3 new markets, and achieving 40% revenue growth...",
              href: "#",
            },
          ],
        },
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "demo9",
      role: "assistant",
      content:
        "Based on the documents I found, your Q4 planning focuses on three main areas:\n\n1. **Product Launch**: New product line with projected 40% revenue growth\n2. **Market Expansion**: Entry into 3 new geographical markets\n3. **Budget Allocation**: Total budget of $6M across marketing, development, and operations\n\nThe planning documents show detailed timelines and resource allocation. Would you like me to dive deeper into any specific aspect?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatHistory, setShowChatHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock chat history
    setChats([
      {
        id: "1",
        title: "Q4 Planning Discussion",
        lastMessage: "Search for information about our Q4 planning",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "2",
        title: "Design System Questions",
        lastMessage: "What are the best practices for component libraries?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: "3",
        title: "Code Review Feedback",
        lastMessage: "Please review this React component",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        id: "4",
        title: "Market Research Analysis",
        lastMessage: "Analyze the competitor landscape for our new product",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content?: string) => {
    const messageContent = content || input.trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with tool calls
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getSimulatedResponse(messageContent),
        toolCalls: messageContent.toLowerCase().includes("search")
          ? [
              {
                id: crypto.randomUUID(),
                name: "search_vault",
                args: { query: messageContent },
                resources: [
                  {
                    title: "Project Proposal.pdf",
                    snippet:
                      "This document outlines the key objectives and deliverables for the upcoming project...",
                    href: "#",
                  },
                  {
                    title: "Design System.png",
                    snippet:
                      "Visual representation of our component library and design tokens...",
                    href: "#",
                  },
                ],
              },
            ]
          : undefined,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleNewChat = () => {
    setIsLoading(false);
    setInput("");
    setMessages([]);
    setShowChatHistory(false);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header actions */}
      <div className="p-6 pb-0">
        <div className="max-w-3xl mx-auto flex justify-end">
          <Button
            variant="ghost"
            onClick={handleNewChat}
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 cursor-pointer"
          >
            <MessageSquarePlus className="mr-2 size-4" />
            New Chat
          </Button>
        </div>
      </div>
      {/* Welcome message when no messages */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl px-6">
            <h1 className="font-display text-4xl md:text-5xl italic text-zinc-100 mb-4">
              {"What can I help you with?"}
            </h1>
            <p className="text-zinc-400 text-lg mb-8">
              {
                "I can search your vault, analyze documents, and help with any questions you have."
              }
            </p>

            {/* Chat History Button */}
            <Button
              variant="ghost"
              onClick={() => setShowChatHistory(true)}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 cursor-pointer"
            >
              <MessageSquare className="mr-2 size-4" />
              View Chat History
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <ScrollArea
          ref={scrollRef}
          className="flex-1 p-6 w-full overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 text-zinc-400">
                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-700/60">
                  <Bot className="size-4 text-zinc-300" />
                </div>
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Input */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex-1">
              <CustomInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="h-12 text-lg"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-orange-500 text-black hover:bg-orange-400 h-12 px-4"
            >
              <SendHorizontal className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Chat History Modal */}
      <Dialog open={showChatHistory} onOpenChange={setShowChatHistory}>
        <DialogContent className="bg-zinc-900 backdrop-blur border-white/10 text-zinc-100 max-w-2xl z-[60]">
          <DialogHeader>
            <DialogTitle className="font-display">
              <div className="relative">
                <CustomInput
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10"
                />
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left p-4 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/60 transition-colors"
                    onClick={() => setShowChatHistory(false)}
                  >
                    <h4 className="font-medium text-zinc-100 truncate">
                      {chat.title}
                    </h4>
                    <p className="text-sm text-zinc-400 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">
                      {formatTimeAgo(chat.timestamp)}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full flex-shrink-0",
          isUser ? "bg-orange-500/20" : "bg-zinc-700/60"
        )}
      >
        {isUser ? (
          <User className="size-4 text-orange-400" />
        ) : (
          <Bot className="size-4 text-zinc-300" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] space-y-3",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-orange-500/90 text-black"
              : "bg-zinc-800/0 text-zinc-100"
          )}
        >
          {message.content}
        </div>

        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="space-y-2">
            {message.toolCalls.map((toolCall) => (
              <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolCallDisplay({ toolCall }: { toolCall: ToolCall }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
        {isOpen ? (
          <ChevronDown className="size-3" />
        ) : (
          <ChevronRight className="size-3" />
        )}
        <Database className="size-3" />
        <span>Used {toolCall.name.replace("_", " ")}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="bg-zinc-900/60 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-2 text-zinc-300">
            <FileText className="size-3" />
            <span className="font-medium">
              Found {toolCall.resources?.length || 0} resources
            </span>
          </div>
          {toolCall.resources && (
            <div className="space-y-2">
              {toolCall.resources.map((resource, i) => (
                <div key={i} className="bg-zinc-800/60 rounded p-2">
                  <div className="font-medium text-zinc-200 mb-1">
                    {resource.title}
                  </div>
                  <div className="text-zinc-400 text-[11px] leading-relaxed">
                    {resource.snippet}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function getSimulatedResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("search") || lower.includes("find")) {
    return "I searched your vault and found relevant documents. Based on the information I found, here's what I can tell you about your query. The documents contain detailed information that should help answer your question.";
  }

  if (lower.includes("upload")) {
    return "I can help you upload files to your vault. What type of document would you like to upload? I can handle PDFs, images, and links.";
  }

  if (lower.includes("email")) {
    return "I can read your emails, but this feature requires email integration setup. Would you like me to help you configure email access?";
  }

  return (
    "I understand you're asking about: " +
    input +
    ". I can help you search your vault, upload files, read emails, or describe images. What would you like to do?"
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
