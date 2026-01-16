// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useStore();
  const t = translations[language];

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', user.id);

      if (!cartItems || cartItems.length === 0) {
        alert(language === 'ms' ? 'Troli anda kosong' : 'Your cart is empty');
        return;
      }

      const subtotal = cartItems.reduce((sum, item: any) => {
        const price = item.product.discount_price || item.product.price;
        return sum + price * item.quantity;
      }, 0);

      const deliveryFee = subtotal > 50 ? 0 : 5.0;
      const total = subtotal + deliveryFee;

      const { data: orderNumber } = await supabase.rpc('generate_order_number');

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: String(orderNumber || `ORD-${Date.now()}`),
          status: 'pending',
          subtotal,
          delivery_fee: deliveryFee,
          tax: 0,
          total,
          payment_method: paymentMethod,
          payment_status: 'pending',
          delivery_method: deliveryMethod,
        } as any)
        .select()
        .single();

      if (orderError) throw orderError;
      if (!order) throw new Error('Failed to create order');

      const orderItems = cartItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: language === 'ms' ? item.product.name_ms : item.product.name_en,
        product_image: item.product.images[0],
        quantity: item.quantity,
        unit_price: item.product.discount_price || item.product.price,
        total_price: (item.product.discount_price || item.product.price) * item.quantity,
      }));

      await supabase.from('order_items').insert(orderItems as any);
      await supabase.from('cart_items').delete().eq('user_id', user.id);

      navigate(`/orders/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert(language === 'ms' ? 'Ralat membuat pesanan' : 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <Navbar title={t.checkout.title} showBack />

      <div className="bg-white dark:bg-gray-900 pt-6 pb-4 px-4 w-full">
        <div className="flex w-full flex-row items-center justify-between gap-2">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    step >= s ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  {s}
                </div>
                <span className={`text-xs font-bold ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
                  {s === 1 ? t.checkout.step1 : s === 2 ? t.checkout.step2 : t.checkout.step3}
                </span>
              </div>
              {s < 3 && <div className="h-1 flex-1 rounded-full bg-gray-200 dark:bg-gray-700"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32 p-4">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">{t.checkout.shippingDetails}</h2>
            <Input
              label={t.checkout.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ali Bin Abu"
            />
            <Input
              label={t.checkout.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="012 345 6789"
            />
            <div className="flex flex-col w-full">
              <label className="text-gray-900 dark:text-gray-200 text-lg font-semibold leading-normal pb-2 ml-1">
                {t.checkout.address}
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex w-full resize-none rounded-xl text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary focus:ring-0 p-4 text-lg font-normal min-h-[120px] placeholder:text-gray-500"
                placeholder="No. 123, Jalan Bunga Raya..."
              />
            </div>
            <div>
              <label className="text-gray-900 dark:text-gray-200 text-lg font-semibold leading-normal pb-3 block">
                {t.checkout.deliveryMethod}
              </label>
              <div className="space-y-3">
                <Card
                  className={`p-4 cursor-pointer border-2 ${
                    deliveryMethod === 'home' ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setDeliveryMethod('home')}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-bold">{t.checkout.homeDelivery}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">2-3 {language === 'ms' ? 'hari' : 'days'}</p>
                    </div>
                  </div>
                </Card>
                <Card
                  className={`p-4 cursor-pointer border-2 ${
                    deliveryMethod === 'pickup' ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setDeliveryMethod('pickup')}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-bold">{t.checkout.selfPickup}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {language === 'ms' ? 'Ambil di kedai' : 'Collect at store'}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">{t.checkout.paymentMethod}</h2>
            <div className="space-y-3">
              <Card
                className={`p-4 cursor-pointer border-2 ${
                  paymentMethod === 'cod' ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                  <p className="text-gray-900 dark:text-white font-bold">{t.checkout.cashOnDelivery}</p>
                </div>
              </Card>
              <Card
                className={`p-4 cursor-pointer border-2 ${
                  paymentMethod === 'stripe' ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setPaymentMethod('stripe')}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">credit_card</span>
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold">
                      {language === 'ms' ? 'Kad Kredit/Debit' : 'Credit/Debit Card'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">(Demo)</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold">
              {language === 'ms' ? 'Sahkan Pesanan' : 'Confirm Order'}
            </h2>
            <Card className="p-4 space-y-3">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.checkout.fullName}</p>
                <p className="text-gray-900 dark:text-white font-semibold">{fullName}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.checkout.phone}</p>
                <p className="text-gray-900 dark:text-white font-semibold">{phone}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.checkout.address}</p>
                <p className="text-gray-900 dark:text-white font-semibold">{address}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.checkout.paymentMethod}</p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {paymentMethod === 'cod' ? t.checkout.cashOnDelivery : 'Credit Card'}
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-40">
        <div className="flex gap-3 max-w-md mx-auto">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              {t.common.back}
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1">
              {t.common.next}
            </Button>
          ) : (
            <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1">
              {loading ? t.common.loading : t.checkout.placeOrder}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
