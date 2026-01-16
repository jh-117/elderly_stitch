import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import type { Database } from '@/lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const { language, setCartCount } = useStore();
  const t = translations[language];

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    let query = supabase.from('products').select('*').eq('is_active', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data } = await query.order('rating', { ascending: false });

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const nameEn = product.name_en.toLowerCase();
    const nameMs = product.name_ms.toLowerCase();
    const query = searchQuery.toLowerCase();
    return nameEn.includes(query) || nameMs.includes(query);
  });

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

    const { count } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.session.user.id);
    setCartCount(count || 0);
  };

  const getProductName = (product: Product) => {
    return language === 'ms' ? product.name_ms : product.name_en;
  };

  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <Navbar title={language === 'ms' ? 'Produk' : 'Products'} showBack showCart />

      <div className="px-4 py-3 bg-white dark:bg-gray-900">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid place-items-center h-full w-12 text-gray-500">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="peer h-full w-full outline-none text-base text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-500"
            placeholder={t.home.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-24 p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="text-lg">{t.common.loading}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-full aspect-square rounded-t-2xl overflow-hidden bg-gray-50 dark:bg-gray-700">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={getProductName(product)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="text-gray-900 dark:text-white text-sm font-bold leading-tight line-clamp-2">
                    {getProductName(product)}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.review_count})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">
                      {formatPrice(product.discount_price || product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-700 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    </button>
                  </div>
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
