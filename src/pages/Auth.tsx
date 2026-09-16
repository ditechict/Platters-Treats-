import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const schema = z.object({
  fullName: z.string().trim().max(100).optional(),
  email: z.string().trim().email('Enter a valid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72),
});

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/account', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setBusy(true);
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: parsed.data.fullName },
        },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('Check your email to confirm your account.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      navigate('/account', { replace: true });
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-24 subtle-gradient min-h-screen">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="font-display text-3xl font-light text-primary">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Track your orders and enquiries in one place.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant="outline" className="w-full" onClick={handleGoogle}>
                Continue with Google
              </Button>

              <div className="relative text-center">
                <span className="bg-card px-3 text-xs uppercase tracking-widest text-muted-foreground relative z-10">
                  or
                </span>
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-primary mb-2">
                      Full name
                    </label>
                    <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
                </Button>
              </form>

              <p className="text-sm text-center text-muted-foreground">
                {mode === 'signin' ? "Don't have an account?" : 'Already registered?'}{' '}
                <button
                  type="button"
                  className="text-accent underline underline-offset-4"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                >
                  {mode === 'signin' ? 'Create one' : 'Sign in'}
                </button>
              </p>
              <p className="text-xs text-center text-muted-foreground">
                <Link to="/" className="underline underline-offset-4">
                  Back to the website
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
