'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader as Loader2, Mail, Lock, Chrome } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Scientist Login</CardTitle>
        <CardDescription>
          Access the EDeepNA analysis platform
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="scientist@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>Restricted to verified scientists only.</p>
          <p>Contact admin for access requests.</p>
        </div>
      </CardContent>
    </Card>
  );
}