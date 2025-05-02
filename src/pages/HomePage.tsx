import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandLogos from '../components/BrandLogos';
import TestimonialSlider from '../components/TestimonialSlider';

const HomePage = () => {
  return (
    <div className="bg-background text-primary font-sans">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Parallel Store trae los mejores zapatos originales de EE.UU. directo a tu puerta en Colombia.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted">
            Descubre marcas reconocidas a nivel mundial, con autenticidad garantizada, envíos seguros y precios que marcan la diferencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/catalogo" 
                className="bg-accent hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
              >
                Ver Catálogo
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/como-funciona" 
                className="border border-white hover:border-accent hover:text-accent text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Cómo Funciona
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Categorías Destacadas</h2>
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
                className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow relative h-80"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all z-10" />
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="inline-flex items-center text-sm font-medium">
                    Ver Productos
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
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
            <h2 className="text-3xl font-bold text-primary">Productos Destacados</h2>
            <Link 
              to="/catalogo" 
              className="text-accent font-medium hover:underline inline-flex items-center"
            >
              Ver todo el catálogo
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Marcas que Importamos</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Trabajamos con las marcas más reconocidas a nivel mundial, garantizando la autenticidad y calidad de cada par de zapatos.
          </p>
          <BrandLogos />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Lo que dicen nuestros clientes</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para estrenar zapatos originales?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Importamos y enviamos los zapatos que siempre has querido directamente desde Estados Unidos hasta la puerta de tu casa.
          </p>
          <Link 
            to="/catalogo" 
            className="bg-accent hover:bg-secondary text-white px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center"
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
