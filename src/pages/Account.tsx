import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth', { replace: true });
  }, [loading, user, navigate]);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-24 subtle-gradient">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-light text-primary">Your account</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div className="flex gap-3">
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate('/admin')}>
                  Admin dashboard
                </Button>
              )}
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
              >
                Sign out
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-light text-primary">Order history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && <Skeleton className="h-20 w-full" />}
              {!isLoading && orders.length === 0 && (
                <p className="text-muted-foreground">You haven't placed an order yet.</p>
              )}
              {orders.map((order: any) => (
                <div key={order.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </span>
                    <Badge variant="secondary">{order.status}</Badge>
                  </div>
                  <div className="text-lg text-accent">£{Number(order.total_amount ?? 0).toFixed(2)}</div>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    {(order.order_items ?? []).map((item: any) => (
                      <li key={item.id}>
                        {item.quantity} × {item.item_name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
