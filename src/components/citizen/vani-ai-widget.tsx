
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Send, Loader2, Bot, User, X, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { vaniAgent, VaniAgentInput } from '@/app/actions/vani-agent';
import MicRecorder from 'mic-recorder-to-mp3';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const INITIAL_GREETING = "Hello! I'm Vani, your AI assistant. Tell me about the work you do, or press the microphone to speak.";

export default function VaniAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<any>({});
  const [inputText, setInputText] = useState('');
  
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<MicRecorder | null>(null);

  const initializeRecorder = useCallback(() => {
    recorderRef.current = new MicRecorder({ bitRate: 128 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      initializeRecorder();
      if (messages.length === 0) {
        setMessages([{ sender: 'bot', text: INITIAL_GREETING }]);
      }
    }
  }, [isOpen, messages.length, initializeRecorder]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const playAudio = (audioDataUri: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = audioDataUri;
      audioPlayerRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const processUserMessage = async (text: string, audioDataUri?: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: text }]);
    
    try {
      const input: VaniAgentInput = { 
        textQuery: text, 
        audioQuery: audioDataUri,
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
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, an error occurred. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userMessageText = inputText.trim();
    setInputText('');
    await processUserMessage(userMessageText);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      try {
        if (!recorderRef.current) return;
        const [buffer, blob] = await recorderRef.current.stop().getMp3();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          // We can't know the transcription on the client, so send a placeholder.
          // The server-side flow will handle the actual transcription.
          await processUserMessage("User provided audio.", base64Audio);
        };
      } catch (e) {
        console.error("Error stopping recording:", e);
      } finally {
        setIsRecording(false);
      }
    } else {
      // Start recording
      if (!recorderRef.current) initializeRecorder();
      try {
        await recorderRef.current?.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Error starting recording:", e);
      }
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
      <Card className="w-80 h-[32rem] flex flex-col shadow-2xl rounded-2xl">
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
            <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-3 border-t">
          <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                  placeholder="Type or press mic..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading || isRecording}
                  autoComplete="off"
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" disabled={isLoading || !inputText.trim() || isRecording}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="button" size="icon" onClick={toggleRecording} disabled={isLoading} variant={isRecording ? 'destructive' : 'outline'}>
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
      <audio ref={audioPlayerRef} hidden />
    </div>
  );
}
