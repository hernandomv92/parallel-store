import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useShoppingCart();

  const { id, name, brand, price, images, category } = product;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      to={`/producto/${id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={images[0]} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={toggleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite 
                ? 'bg-[#E94560] text-white' 
                : 'bg-white text-gray-600 hover:text-[#E94560]'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} fill={isFavorite ? '#fff' : 'none'} />
          </button>
        </div>

        <span className="absolute top-3 left-3 bg-[#0F3460] text-white text-xs py-1 px-2 rounded">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 transform transition-transform duration-300 flex justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-[#E94560] hover:bg-[#e93a52] text-white py-2 px-4 rounded-md flex items-center font-medium transition-colors"
            >
              <ShoppingBag size={16} className="mr-2" />
              Añadir al carrito
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{brand}</div>
        <h3 className="font-medium text-[#0F3460] mb-2 group-hover:text-[#E94560] transition-colors">
          {name}
        </h3>
        <div className="font-bold text-lg text-[#0F3460]">
          {formatPrice(price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;