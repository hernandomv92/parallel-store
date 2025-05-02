import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandLogos from '../components/BrandLogos';
import TestimonialSlider from '../components/TestimonialSlider';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-[#16213E] to-[#0F3460] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Zapatos originales importados desde EE.UU. hasta la puerta de tu casa en Colombia
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in">
              Las mejores marcas internacionales con garantía de autenticidad, envío seguro y los mejores precios del mercado.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Link 
                to="/catalogo" 
                className="bg-[#E94560] hover:bg-[#e93a52] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-flex items-center"
              >
                Ver Catálogo
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/como-funciona" 
                className="bg-transparent border border-white hover:border-[#E94560] hover:text-[#E94560] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Cómo Funciona
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Categorías Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Deportivos',
                image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
                path: '/catalogo/deportivos'
              },
              {
                title: 'Casuales',
                image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg',
                path: '/catalogo/casuales'
              },
              {
                title: 'Lujo',
                image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg',
                path: '/catalogo/lujo'
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.path}
                className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative h-80"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="inline-flex items-center text-sm font-medium">
                    Ver Productos
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F3460]">Productos Destacados</h2>
            <Link 
              to="/catalogo" 
              className="text-[#E94560] font-medium hover:underline inline-flex items-center"
            >
              Ver todo el catálogo
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#0F3460]">Marcas que Importamos</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Trabajamos con las marcas más reconocidas a nivel mundial, garantizando la autenticidad y calidad de cada par de zapatos.
          </p>
          <BrandLogos />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Lo que dicen nuestros clientes</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0F3460] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para estrenar zapatos originales?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Importamos y enviamos los zapatos que siempre has querido directamente desde Estados Unidos hasta la puerta de tu casa.
          </p>
          <Link 
            to="/catalogo" 
            className="bg-[#E94560] hover:bg-[#e93a52] text-white px-8 py-4 rounded-md font-medium transition-colors duration-300 inline-flex items-center"
          >
            Explorar Catálogo
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;