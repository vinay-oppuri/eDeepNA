'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Send, Bot, User, Code, BarChart3, Microscope, ChevronDown, Sparkles, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  timestamp: Date;
  isTyping?: boolean;
}

// --- MOCK RESPONSES & SUGGESTIONS ---
const mockResponses = [
  "I found 267 novel clusters in Dataset DeepSea_01. Here's the breakdown by novelty score...",
  "There are 23 clusters with novelty scores above 33% from Indian Ocean samples. Let me show you the data...",
  "Family X shows the following abundance distribution across datasets. The peak abundance occurs in deep-sea samples...",
  "Based on your query, I've identified several interesting patterns in the taxonomic data. Would you like me to generate a visualization?",
];

const suggestedPrompts = [
  { icon: <BarChart3 className="h-4 w-4 mr-2" />, text: "Summarize novel findings in DeepSea_Pacific" },
  { icon: <Microscope className="h-4 w-4 mr-2" />, text: "Compare taxonomic diversity between Arctic and Mediterreanean samples" },
  { icon: <Code className="h-4 w-4 mr-2" />, text: "Show me the most abundant sequence in cluster C045" },
];


export function Chatbot({ showIntroMessage = true }: { showIntroMessage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (showIntroMessage) {
      return [
        {
          id: '1',
          type: 'bot',
          content: (
            <>
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-400" /> EDeepNA Assistant
              </h3>
              <p>Welcome! I can help you analyze your eDNA datasets. Here are some suggestions to get you started:</p>
            </>
          ),
          timestamp: new Date()
        }
      ];
    }
    return [];
  });

  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const handleSendMessage = async (prompt?: string) => {
    const content = prompt || newMessage;
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, { id: 'typing', type: 'bot', content: '', timestamp: new Date(), isTyping: true }]);
    setNewMessage('');
    scrollToBottom();

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(m => !m.isTyping));
      setMessages(prev => [...prev, botResponse]);
      scrollToBottom();
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg">
          <Bot className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 right-0 left-0 lg:left-auto lg:right-8 bg-gray-900/80 backdrop-blur-lg border-t border-l border-r border-gray-700/50 rounded-t-2xl shadow-2xl z-50 overflow-hidden" style={{width: 'calc(100% - 2rem)', maxWidth:'700px', margin: '0 auto'}}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900/50 cursor-pointer" onClick={() => setIsOpen(false)}>
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-3 text-purple-400" />
          <h2 className="text-lg font-bold text-white">EDeepNA Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={(e) => {e.stopPropagation(); setIsOpen(false);}}>
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Message Area */}
      <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-gray-600">
                 <div className={`w-full h-full flex items-center justify-center rounded-full ${ message.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                    {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-purple-400" />}
                </div>
              </Avatar>
              <div className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                {message.isTyping ? (
                  <div className="flex items-center space-x-1 p-2">
                    <Loader2 className="h-5 w-5 text-purple-400 animate-spin" /> 
                    <span className="text-sm text-gray-400">Thinking...</span>
                  </div>
                ) : (
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {showIntroMessage && messages.length === 1 && (
             <div className="mt-6 space-y-2">
                {suggestedPrompts.map((prompt, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                    >
                        <Button variant="outline" className="w-full justify-start h-auto p-3 bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-gray-300" onClick={() => handleSendMessage(prompt.text)}>
                            {prompt.icon} {prompt.text}
                        </Button>
                    </motion.div>
                ))}
             </div>
        )}

      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-gray-900/50 border-t border-gray-700/50">
        <div className="relative">
          <Input
            placeholder="Ask a question about your datasets..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-gray-800 border-gray-700 text-white rounded-full pl-4 pr-12 h-12 focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!newMessage.trim()}
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
