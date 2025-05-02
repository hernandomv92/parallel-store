import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carolina Gómez',
    location: 'Bogotá',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'Compré unos Nike Air Max que no encontraba en Colombia. La calidad es excelente y llegaron en perfecto estado en el tiempo prometido. ¡Súper recomendados!'
  },
  {
    id: 2,
    name: 'Juan Martínez',
    location: 'Medellín',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'El proceso de compra fue muy sencillo y el seguimiento del pedido excelente. Los zapatos son originales y el precio mucho mejor que en las tiendas locales.'
  },
  {
    id: 3,
    name: 'María Pérez',
    location: 'Cali',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4,
    text: 'Me encantaron mis Adidas nuevos. El envío tardó un poco más de lo esperado, pero la calidad de los zapatos y el precio compensaron la espera.'
  }
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-4">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-[#0F3460]">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.location}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-[#0F3460] hover:text-[#E94560] transition-colors"
        onClick={prevSlide}
        aria-label="Anterior testimonio"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-[#0F3460] hover:text-[#E94560] transition-colors"
        onClick={nextSlide}
        aria-label="Siguiente testimonio"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-[#E94560]' : 'bg-gray-300'
            }`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;