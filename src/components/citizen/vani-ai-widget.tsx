'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { vaniAgent, VaniAgentInput, VaniAgentOutput } from '@/app/actions/vani-agent';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

// Mock transcription for demonstration
const mockTranscription = "I am a plumber, I fix taps and pipes in people's houses.";

export default function VaniAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<any>({});
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Start with a greeting when the widget opens
      handleInitialGreeting();
    }
  }, [isOpen]);

  const playAudio = (audioDataUri: string) => {
    if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioDataUri;
        audioPlayerRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const handleInitialGreeting = async () => {
    setIsLoading(true);
    setMessages([]);
    try {
        const input: VaniAgentInput = { textQuery: 'Hello', language: 'en-IN' };
        const result = await vaniAgent(input);

        setMessages([{ sender: 'bot', text: result.responseText }]);
        setConversationState(result.updatedConversationState);
        if (result.audioDataUri) {
          playAudio(result.audioDataUri);
        }
    } catch (error) {
        console.error("Error with initial greeting:", error);
        setMessages([{ sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleMicClick = async () => {
    if (isListening) {
      setIsListening(false);
      // This is where you would stop recording and get the transcription.
      // For now, we'll use a mock transcription.
      const userMessageText = mockTranscription;
      setMessages(prev => [...prev, { sender: 'user', text: userMessageText }]);
      
      // Send the transcribed text to the agent
      await processUserMessage(userMessageText);

    } else {
      // This is where you would start the recording
      setIsListening(true);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm listening..." }]);
    }
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
             {isLoading && (
                <div className="flex items-center gap-2 justify-start">
                    <Bot className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="p-2 rounded-lg bg-muted rounded-bl-none">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter className="p-3 border-t">
          <Button 
            onClick={handleMicClick}
            size="lg" 
            className={cn(
                "w-full rounded-full h-14 transition-colors duration-300",
                isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
            )}
            disabled={isLoading}
          >
            {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
            <span className="ml-2 font-semibold text-lg">{isListening ? "Tap to Stop" : "Tap to Speak"}</span>
          </Button>
        </CardFooter>
      </Card>
      <audio ref={audioPlayerRef} hidden />
    </div>
  );
}