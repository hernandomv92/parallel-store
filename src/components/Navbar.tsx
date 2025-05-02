import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useShoppingCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Catálogo', path: '/catalogo' },
    { title: 'Cómo Funciona', path: '/como-funciona' },
    { title: 'Contacto', path: '/contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-[#0F3460]">
              Zapatos USA <span className="text-[#E94560]">Colombia</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors hover:text-[#E94560] ${
                    isActive ? 'text-[#E94560]' : 'text-[#0F3460]'
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[#0F3460] hover:text-[#E94560] transition-colors">
              <Search size={20} />
            </button>
            <button 
              className="text-[#0F3460] hover:text-[#E94560] relative transition-colors"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E94560] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              className="text-[#0F3460] hover:text-[#E94560] relative transition-colors"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E94560] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="text-[#0F3460] hover:text-[#E94560] transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium py-2 transition-colors hover:text-[#E94560] ${
                    isActive ? 'text-[#E94560]' : 'text-[#0F3460]'
                  }`
                }
                onClick={closeMenu}
              >
                {link.title}
              </NavLink>
            ))}
            <button className="flex items-center space-x-2 py-2 text-[#0F3460] hover:text-[#E94560] transition-colors">
              <Search size={20} />
              <span>Buscar</span>
            </button>
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;