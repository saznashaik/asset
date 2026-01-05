"use client";

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { askQuestionAction } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Message = {
  id: number;
  role: 'user' | 'ai';
  content: React.ReactNode;
};

const initialState = {
    answer: '',
    error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="accent" size="icon">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
      <span className="sr-only">Submit</span>
    </Button>
  );
}

export function ChatPageContent() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: 'Hello! How can I help you analyze your assets today?' }
  ]);
  const [state, formAction] = useFormState(askQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.answer) {
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: state.answer }]);
    }
    if (state.error && !state.answer) { // Only show error if no answer is provided
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', content: `Sorry, I ran into an error: ${state.error}` }]);
    }
  }, [state]);

  useEffect(() => {
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const question = formData.get('question') as string;
    if (!question) return;
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: question }]);
    formAction(formData);
    formRef.current?.reset();
  };
  
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8">
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader>
          <CardTitle>Chat with AssetAI</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4" ref={scrollViewportRef}>
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'ai' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="w-8 h-8 border">
                       <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <form action={handleFormSubmit} ref={formRef} className="flex w-full items-center space-x-2">
            <Input name="question" placeholder="e.g., What is the total value of our assets?" className="flex-1" autoComplete="off" />
            <SubmitButton />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
