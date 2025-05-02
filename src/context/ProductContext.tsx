import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { ProductFromDB } from '../types/ProductFromDB';
import { mockProducts } from '../data/mockProducts';
import { mapToProduct } from '../utils/mapToProduct';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (filters?: Filters) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

interface Filters {
  brands?: string[];
  priceRange?: [number, number];
  category?: string;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {},
  getProductById: () => undefined,
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
      let filtered: ProductFromDB[] = [...mockProducts];

      if (filters?.category) {
        filtered = filtered.filter((p) => p.categoria === filters.category);
      }

      if (filters?.brands?.length) {
        filtered = filtered.filter((p) => filters.brands!.includes(p.marca));
      }

      if (filters?.priceRange) {
        const [min, max] = filters.priceRange;
        filtered = filtered.filter(
          (p) => p.precio_cop >= min && p.precio_cop <= max
        );
      }

      const mappedProducts: Product[] = filtered.map(mapToProduct);
      setProducts(mappedProducts);
    } catch (err) {
      setError('Error cargando productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProducts, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
};
