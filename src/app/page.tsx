import { LoginForm } from '@/components/auth/login-form';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <main className="w-full max-w-md space-y-8">
        <div className="text-center">
            <div className="inline-block bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Bot size={40} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
            QuickSight Executive AI
            </h1>
            <p className="mt-2 text-muted-foreground">
            Welcome back. Sign in to access your executive dashboard.
            </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
