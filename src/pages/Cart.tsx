// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import type { Database } from '@/lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type CartItem = Database['public']['Tables']['cart_items']['Row'] & { product: Product };

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setCartCount } = useStore();
  const t = translations[language];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      navigate('/login');
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (data) {
      setCartItems(data as CartItem[]);
      setCartCount(data.length);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    await supabase
      .from('cart_items')
      .update({ quantity: newQuantity } as any)
      .eq('id', itemId);

    fetchCartItems();
  };

  const removeItem = async (itemId: string) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
    fetchCartItems();
  };

  const getProductName = (product: Product) => {
    return language === 'ms' ? product.name_ms : product.name_en;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.product.discount_price || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 50 ? 0 : 5.0;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <Navbar title={t.cart.title} showBack />

      <main className="flex-1 overflow-y-auto pb-32 px-4 py-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="material-symbols-outlined text-8xl text-gray-300 dark:text-gray-600 mb-4">
              shopping_cart
            </span>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">{t.cart.empty}</p>
            <Button onClick={() => navigate('/')}>
              {language === 'ms' ? 'Mula Beli-belah' : 'Start Shopping'}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700">
                    {item.product.images[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={getProductName(item.product)}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                        {getProductName(item.product)}
                      </h3>
                      {item.product.brand && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.product.brand}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-primary text-lg font-bold">
                        {formatPrice(item.product.discount_price || item.product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <span className="material-symbols-outlined text-xl">remove</span>
                        </button>
                        <span className="text-gray-900 dark:text-white font-bold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <span className="material-symbols-outlined text-xl">add</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm font-medium self-start hover:text-red-600"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-40">
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t.cart.subtotal}</span>
              <span className="text-gray-900 dark:text-white font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t.cart.delivery}</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {deliveryFee === 0 ? (language === 'ms' ? 'PERCUMA' : 'FREE') : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white font-bold text-lg">{t.cart.total}</span>
              <span className="text-primary font-bold text-xl">{formatPrice(total)}</span>
            </div>
            <Button size="lg" onClick={() => navigate('/checkout')}>
              {t.cart.checkout}
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
