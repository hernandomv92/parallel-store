import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  currentProductId?: string;
  category?: string;
  limit?: number;
}

const SimilarProducts = ({ currentProductId, category, limit = 4 }: SimilarProductsProps) => {
  const { products } = useProducts();

  // Filter products by category and exclude current product
  const similarProducts = products
    .filter(product => 
      product.category === category && 
      product.id !== currentProductId
    )
    .slice(0, limit);

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {similarProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProducts;