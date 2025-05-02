import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

const FeaturedProducts = () => {
  const { products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter for featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="bg-gray-300 h-64 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;