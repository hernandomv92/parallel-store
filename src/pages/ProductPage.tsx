import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  ArrowLeft, 
  Check,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useShoppingCart } from '../context/ShoppingCartContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { addToCart } = useShoppingCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      if (id) {
        setLoading(true);
        const fetchedProduct = getProductById(id); // ✅ CORRECTO
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart({
        id: product.id,
        name: product.nombre,
        brand: product.marca,
        price: product.precio_cop,
        category: product.categoria,
        images: [product.imagen_url],
        selectedSize,
        quantity
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(newQuantity, product?.stock || 1)));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
              <div className="h-10 bg-gray-300 rounded mb-6"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#0F3460] mb-4">Producto no encontrado</h2>
        <p className="text-gray-600 mb-8">El producto que estás buscando no existe o ha sido removido.</p>
        <Link 
          to="/catalogo" 
          className="bg-[#0F3460] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  const { nombre, marca, precio_cop, descripcion, categoria, talla, imagen_url } = product;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#E94560]">Inicio</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/catalogo" className="hover:text-[#E94560]">Catálogo</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/catalogo/${categoria}`} className="hover:text-[#E94560] capitalize">
            {categoria}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700 truncate max-w-xs">{nombre}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
              <img 
                src={imagen_url} 
                alt={nombre} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-[#0F3460] mb-2">{nombre}</h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-4">{marca}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">(24 reseñas)</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-[#0F3460] mb-6">{formatPrice(precio_cop)}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-gray-600">{descripcion}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Talla</h3>
                <button className="text-sm text-[#E94560] hover:underline">Guía de tallas</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {talla.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md flex items-center justify-center border ${
                      selectedSize === size 
                      ? 'border-[#E94560] bg-[#E94560] bg-opacity-10 text-[#E94560]' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500 mt-2">Por favor selecciona una talla</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Cantidad</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#0F3460]"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="flex-grow text-center">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#0F3460]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-grow bg-[#E94560] hover:bg-[#e93a52] text-white py-3 px-6 rounded-md font-medium transition-colors inline-flex items-center justify-center ${
                  !selectedSize ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingBag size={20} className="mr-2" />
                Añadir al Carrito
              </button>
              <button
                onClick={toggleFavorite}
                className={`w-12 h-12 rounded-md flex items-center justify-center border ${
                  isFavorite 
                  ? 'border-[#E94560] bg-[#E94560] text-white' 
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} fill={isFavorite ? '#fff' : 'none'} />
              </button>
            </div>

            {/* Product Features */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <Truck size={20} className="text-[#0F3460] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Envío Internacional</h4>
                  <p className="text-sm text-gray-600">
                    Entrega estimada de 10-15 días hábiles desde Estados Unidos.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={20} className="text-[#0F3460] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Garantía de Autenticidad</h4>
                  <p className="text-sm text-gray-600">
                    Todos nuestros productos son 100% originales y auténticos.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check size={20} className="text-[#0F3460] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Devoluciones Sencillas</h4>
                  <p className="text-sm text-gray-600">
                    30 días para devoluciones si el producto no te satisface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;