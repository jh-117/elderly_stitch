import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import type { Database } from '@/lib/database.types';
import { format } from 'date-fns';

type Order = Database['public']['Tables']['orders']['Row'];

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useStore();
  const t = translations[language];

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; ms: string }> = {
      pending: { en: 'Pending', ms: 'Menunggu' },
      processing: { en: 'Processing', ms: 'Diproses' },
      packed: { en: 'Packed', ms: 'Dibungkus' },
      shipped: { en: 'Shipped', ms: 'Dihantar' },
      delivered: { en: 'Delivered', ms: 'Diterima' },
      cancelled: { en: 'Cancelled', ms: 'Dibatalkan' },
    };
    return language === 'ms' ? statusMap[status]?.ms : statusMap[status]?.en;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      packed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <Navbar title={t.orders.title} showBack />

      <main className="flex-1 overflow-y-auto pb-24 p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="material-symbols-outlined text-8xl text-gray-300 dark:text-gray-600 mb-4">
              receipt_long
            </span>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
              {language === 'ms' ? 'Tiada pesanan lagi' : 'No orders yet'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold text-lg">
                      {order.order_number}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {format(new Date(order.created_at), 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t.orders.total}</p>
                    <p className="text-primary font-bold text-xl">{formatPrice(order.total)}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="text-primary font-bold hover:underline"
                  >
                    {language === 'ms' ? 'Lihat Butiran' : 'View Details'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};
