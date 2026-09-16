import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const useTable = (table: string, enabled: boolean) =>
  useQuery({
    queryKey: ['admin', table],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth', { replace: true });
  }, [loading, user, navigate]);

  const orders = useTable('orders', isAdmin);
  const enquiries = useTable('enquiries', isAdmin);
  const bookings = useTable('event_bookings', isAdmin);

  if (!loading && user && !isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-24 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-light text-primary mb-4">Restricted area</h1>
          <p className="text-muted-foreground">This dashboard is available to team members only.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const renderList = (
    query: ReturnType<typeof useTable>,
    render: (row: any) => React.ReactNode
  ) => (
    <div className="space-y-4">
      {query.isLoading && <Skeleton className="h-24 w-full" />}
      {!query.isLoading && (query.data ?? []).length === 0 && (
        <p className="text-muted-foreground">Nothing here yet.</p>
      )}
      {(query.data ?? []).map((row: any) => (
        <Card key={row.id} className="border-0 shadow-soft">
          <CardContent className="p-5">{render(row)}</CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-24 subtle-gradient">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div>
            <h1 className="font-display text-4xl font-light text-primary">Dashboard</h1>
            <p className="text-muted-foreground">Orders, enquiries and event bookings.</p>
          </div>

          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              {renderList(orders, (row) => (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary">{row.customer_name ?? row.customer_email}</span>
                    <Badge variant="secondary">{row.status}</Badge>
                  </div>
                  <p className="text-accent text-lg">£{Number(row.total_amount ?? 0).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(row.created_at).toLocaleString('en-GB')}
                  </p>
                </>
              ))}
            </TabsContent>

            <TabsContent value="enquiries" className="mt-6">
              {renderList(enquiries, (row) => (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary">{row.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(row.created_at).toLocaleString('en-GB')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.email} {row.phone ? `· ${row.phone}` : ''}</p>
                  <p className="mt-2 text-sm">{row.message}</p>
                </>
              ))}
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              {renderList(bookings, (row) => (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-primary">{row.name}</span>
                    <Badge variant="secondary">{row.status ?? 'new'}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {row.event_type} · {row.guest_count ? `${row.guest_count} guests` : ''}
                  </p>
                  <p className="text-sm">{row.email}</p>
                </>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
