"use client";

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { askQuestionAction } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, Loader2, Search, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const initialState = {
    answer: null,
    error: null,
    query: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-primary hover:bg-primary/90">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      <span className="ml-2">Query</span>
    </Button>
  );
}

export function AIQuery() {
  const [state, formAction] = useFormState(askQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.answer || state.error) {
        formRef.current?.reset();
    }
  }, [state]);

  const showResult = state.answer || state.error;

  return (
    <div className="space-y-4">
        <Card className="shadow-sm">
            <CardContent className="p-4">
                <form action={formAction} ref={formRef} className="flex w-full items-center space-x-3">
                    <div className="relative flex-1">
                        <Bot className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            name="question" 
                            placeholder="Ask questions like: What is my replacement budget next year?" 
                            className="flex-1 pl-10 pr-4 py-2 h-11 text-base" 
                            autoComplete="off" 
                        />
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
      
        {showResult && (
             <Alert variant={state.error ? 'destructive' : 'default'} className="bg-card">
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                    {state.query && <p className="font-semibold text-foreground mb-2">Query: "{state.query}"</p>}
                    {state.answer && <p>{state.answer}</p>}
                    {state.error && <p>Sorry, I ran into an error: {state.error}</p>}
                </AlertDescription>
            </Alert>
        )}
    </div>
  );
}
