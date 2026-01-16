import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import type { Database } from '@/lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, setCartCount } = useStore();
  const t = translations[language];

  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchCartCount();
  }, []);

  const fetchData = async () => {
    const [categoriesRes, productsRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(6),
    ]);

    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (productsRes.data) setRecommendedProducts(productsRes.data);
    setLoading(false);
  };

  const fetchCartCount = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (session.session) {
      const { count } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.session.user.id);
      setCartCount(count || 0);
    }
  };

  const addToCart = async (productId: string) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      navigate('/login');
      return;
    }

    await supabase.from('cart_items').upsert({
      user_id: session.session.user.id,
      product_id: productId,
      quantity: 1,
    } as any);

    fetchCartCount();
  };

  const getCategoryName = (category: Category) => {
    return language === 'ms' ? category.name_ms : category.name_en;
  };

  const getProductName = (product: Product) => {
    return language === 'ms' ? product.name_ms : product.name_en;
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
      <Navbar showTextSize showNotifications showCart />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 py-4">
          <label className="flex flex-col h-14 w-full cursor-text">
            <div className="flex w-full flex-1 items-center rounded-xl h-full border border-gray-200 dark:border-gray-700 focus-within:border-primary bg-white dark:bg-gray-800 transition-colors pr-2 shadow-sm">
              <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 pr-2">
                <span className="material-symbols-outlined text-3xl">search</span>
              </div>
              <input
                className="flex w-full flex-1 resize-none bg-transparent text-gray-900 dark:text-white focus:outline-none h-full placeholder:text-gray-500 px-2 text-lg font-normal"
                placeholder={t.home.searchPlaceholder}
                onClick={() => navigate('/products')}
                readOnly
              />
              <button
                aria-label="AI Voice Navigation"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white hover:bg-primary-700 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-2xl font-bold">mic</span>
              </button>
            </div>
          </label>
        </div>

        <section>
          <div className="flex justify-between items-center px-5 pt-2 pb-4">
            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight">
              {t.home.categories}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 px-5">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="flex flex-col gap-3 p-4 active:scale-95 transition-transform cursor-pointer"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-inner">
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={getCategoryName(category)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    {getCategoryName(category)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex justify-between items-center px-5 py-4">
            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight">
              {t.home.recommended}
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-5 pb-5">
            {recommendedProducts.map((product) => (
              <Card
                key={product.id}
                className="flex items-center p-4 gap-4 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={getProductName(product)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1 h-full justify-between gap-2">
                  <div>
                    <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight line-clamp-2">
                      {getProductName(product)}
                    </h3>
                    {product.brand && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{product.brand}</p>
                    )}
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <span className="text-gray-900 dark:text-white text-xl font-bold">
                      {formatPrice(product.discount_price || product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      aria-label="Add to cart"
                      className="bg-primary hover:bg-primary-700 text-white rounded-lg p-3 active:scale-95 transition-all flex items-center justify-center shadow-md"
                    >
                      <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};
