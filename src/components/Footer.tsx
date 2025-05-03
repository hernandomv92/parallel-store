import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3460] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Parallel <span className="text-[#E94560]">Store</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Importamos zapatos originales de marcas reconocidas desde Estados Unidos hasta la puerta de tu casa en Colombia.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-[#E94560] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-[#E94560] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-[#E94560] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#E94560] transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-300 hover:text-[#E94560] transition-colors">Catálogo</Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-300 hover:text-[#E94560] transition-colors">Cómo Funciona</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-[#E94560] transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo/nike" className="text-gray-300 hover:text-[#E94560] transition-colors">Nike</Link>
              </li>
              <li>
                <Link to="/catalogo/adidas" className="text-gray-300 hover:text-[#E94560] transition-colors">Adidas</Link>
              </li>
              <li>
                <Link to="/catalogo/reebok" className="text-gray-300 hover:text-[#E94560] transition-colors">Reebok</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-[#E94560]" />
                <span className="text-gray-300">Cali, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-[#E94560]" />
                <span className="text-gray-300">+57 3238253871</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-[#E94560]" />
                <span className="text-gray-300">info@parallelstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Parallel Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;