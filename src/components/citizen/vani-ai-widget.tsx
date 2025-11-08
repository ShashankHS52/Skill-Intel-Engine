
'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { vaniAgent, VaniAgentInput, VaniAgentOutput } from '@/app/actions/vani-agent';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const INITIAL_GREETING = "Hello! I'm Vani, your AI assistant. How can I help you build your skill profile today? You can tell me what kind of work you do.";

export default function VaniAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<any>({});
  const [inputText, setInputText] = useState('');
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start with a static text greeting to avoid unnecessary API calls on open.
      setMessages([{ sender: 'bot', text: INITIAL_GREETING }]);
    }
  }, [isOpen, messages.length]);

  const playAudio = (audioDataUri: string) => {
    if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioDataUri;
        audioPlayerRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessageText = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessageText }]);
    setInputText('');
    
    await processUserMessage(userMessageText);
  };

  const processUserMessage = async (text: string) => {
    setIsLoading(true);
    try {
        const input: VaniAgentInput = { 
            textQuery: text, 
            conversationState,
            language: 'en-IN'
        };
        const result = await vaniAgent(input);
        
        setMessages(prev => [...prev, { sender: 'bot', text: result.responseText }]);
        setConversationState(result.updatedConversationState);

        if (result.audioDataUri) {
            playAudio(result.audioDataUri);
        }

    } catch (error) {
        console.error("Error processing user message:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I didn't understand that. Could you please try again?" }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90">
          <Mic className="h-8 w-8" />
          <span className="sr-only">Activate Vani AI</span>
        </Button>
        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-accent animate-ping"></div>
        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-accent"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-[28rem] flex flex-col shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-base">Vani AI Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={cn(
                    'flex items-start gap-2 text-sm',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {msg.sender === 'bot' && <Bot className="h-5 w-5 text-primary flex-shrink-0" />}
                    <div
                    className={cn(
                        'p-2 rounded-lg max-w-[80%]',
                        msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    )}
                    >
                    {msg.text}
                    </div>
                    {msg.sender === 'user' && <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                </div>
            ))}
             {isLoading && messages.length > 0 && (
                <div className="flex items-center gap-2 justify-start">
                    <Bot className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="p-2 rounded-lg bg-muted rounded-bl-none">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-3 border-t">
          <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
            <Input
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || !inputText.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
      <audio ref={audioPlayerRef} hidden />
    </div>
  );
}
