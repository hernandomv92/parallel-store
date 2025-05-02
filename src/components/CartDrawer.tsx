import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useShoppingCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0F3460] flex items-center">
              <ShoppingBag size={20} className="mr-2" />
              Carrito de Compras
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-[#E94560] transition-colors"
              aria-label="Cerrar carrito"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6">Tu carrito está vacío</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-[#0F3460] text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-[#0F3460]">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-[#E94560]"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 text-gray-500 hover:text-[#0F3460]"
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-[#0F3460]"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-medium text-[#0F3460]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-gray-600">Subtotal</span>
                <span className="font-bold text-[#0F3460]">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Impuestos y envío calculados al finalizar la compra
              </p>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full bg-[#E94560] hover:bg-[#e93a52] text-white text-center py-3 rounded-md font-medium transition-colors"
              >
                Finalizar Compra
              </Link>
              <button 
                onClick={onClose}
                className="block w-full text-[#0F3460] hover:text-[#E94560] text-center py-3 mt-2 font-medium transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;