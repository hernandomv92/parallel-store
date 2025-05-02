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
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mt-6 animate-fade-in">
              <Link 
                to="/catalogo" 
                className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:ring-2 hover:ring-accent"
              >
                Ver Catálogo
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/como-funciona" 
                className="bg-transparent border border-white text-white hover:bg-secondary hover:text-white hover:border-transparent px-6 py-3 rounded-md font-medium inline-flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-accent"
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
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Categorías Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Nike',
                  image: 'https://i.imgur.com/C8WTLTw.png',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
                  path: '/catalogo/nike',
                },
                {
                  title: 'Adidas',
                  image: 'https://i.imgur.com/pah32qY.jpeg',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
                  path: '/catalogo/adidas',
                },
                {
                  title: 'Reebok',
                  image: 'https://i.imgur.com/qlUKm8Z.png',
                  logo: 'https://i.imgur.com/TeOj3Um.png',
                  path: '/catalogo/reebok',
                },
              ].map((category, index) => (
                <Link
                  key={index}
                  to={category.path}
                  className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative h-80"
                >
                  {/* Floating logo */}
                  <img
                    src={category.logo}
                    alt={`${category.title} logo`}
                    className="absolute top-4 left-4 w-12 h-12 z-30 bg-white rounded-full p-1 shadow-md object-contain"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 z-10"></div>

                  {/* Background image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Text */}
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
