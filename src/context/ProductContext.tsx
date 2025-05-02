import { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio_cop: number;
  talla: string[];
  imagen_url: string;
  stock: number;
  marca: string;
  categoria: string;
}

interface Filters {
  brands?: string[];
  priceRange?: [number, number];
  category?: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (filters?: Filters) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  getAvailableBrands: () => Promise<string[]>;
  getPriceRange: () => Promise<[number, number]>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {},
  getProductById: async () => null,
  getAvailableBrands: async () => [],
  getPriceRange: async () => [0, 0],
});

export const useProducts = () => useContext(ProductContext);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (filters?: Filters) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('productos').select('*');

      if (filters) {
        if (filters.category) {
          query = query.eq('categoria', filters.category);
        }

        if (filters.brands && filters.brands.length > 0) {
          query = query.in('marca', filters.brands);
        }

        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          query = query.gte('precio_cop', min).lte('precio_cop', max);
        }
      }
      
      const { data, error: supabaseError } = await query;
      
      if (supabaseError) {
        throw supabaseError;
      }

      setProducts(data || []);
    } catch (err) {
      setError('Error fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id: string): Promise<Product | null> => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (supabaseError) {
        throw supabaseError;
      }

      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  }, []);

  const getAvailableBrands = useCallback(async (): Promise<string[]> => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('productos')
        .select('marca')
        .order('marca');

      if (supabaseError) {
        throw supabaseError;
      }

      return [...new Set(data?.map(item => item.marca) || [])];
    } catch (err) {
      console.error('Error fetching brands:', err);
      return [];
    }
  }, []);

  const getPriceRange = useCallback(async (): Promise<[number, number]> => {
    try {
      const { data: minData } = await supabase
        .from('productos')
        .select('precio_cop')
        .order('precio_cop', { ascending: true })
        .limit(1)
        .single();

      const { data: maxData } = await supabase
        .from('productos')
        .select('precio_cop')
        .order('precio_cop', { ascending: false })
        .limit(1)
        .single();

      return [
        minData?.precio_cop || 0,
        maxData?.precio_cop || 1000000
      ];
    } catch (err) {
      console.error('Error fetching price range:', err);
      return [0, 1000000];
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        getAvailableBrands,
        getPriceRange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};