import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Package, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Search size={32} className="text-[#E94560]" />,
      title: 'Busca y Selecciona',
      description: 'Explora nuestro catálogo de zapatos originales importados de las mejores marcas americanas.'
    },
    {
      icon: <ShoppingCart size={32} className="text-[#E94560]" />,
      title: 'Añade al Carrito',
      description: 'Selecciona tu talla y añade los productos que deseas a tu carrito de compras.'
    },
    {
      icon: <CreditCard size={32} className="text-[#E94560]" />,
      title: 'Realiza el Pago',
      description: 'Efectúa el pago de forma segura mediante nuestras opciones disponibles en pesos colombianos.'
    },
    {
      icon: <Truck size={32} className="text-[#E94560]" />,
      title: 'Importación',
      description: 'Nos encargamos de la importación desde Estados Unidos, gestionando todos los trámites necesarios.'
    },
    {
      icon: <Package size={32} className="text-[#E94560]" />,
      title: 'Envío a Domicilio',
      description: 'Enviamos tu pedido hasta la puerta de tu casa en cualquier lugar de Colombia.'
    },
    {
      icon: <CheckCircle size={32} className="text-[#E94560]" />,
      title: 'Disfruta tu Compra',
      description: 'Recibe tus zapatos originales y disfruta de la calidad y el estilo de las mejores marcas.'
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en llegar mi pedido?',
      answer: 'El tiempo estimado de entrega es de 10 a 15 días hábiles desde el momento de la compra. Este plazo incluye el proceso de importación desde Estados Unidos y la entrega a domicilio en Colombia.'
    },
    {
      question: '¿Cómo puedo hacer seguimiento a mi pedido?',
      answer: 'Una vez realizada la compra, recibirás un número de seguimiento por correo electrónico. Con este número podrás rastrear tu pedido en tiempo real a través de nuestra plataforma o directamente con la empresa de mensajería.'
    },
    {
      question: '¿Los productos son originales?',
      answer: 'Sí, todos nuestros productos son 100% originales. Trabajamos directamente con distribuidores autorizados en Estados Unidos y ofrecemos garantía de autenticidad en cada par de zapatos.'
    },
    {
      question: '¿Qué pasa si el zapato no me queda bien?',
      answer: 'Ofrecemos un periodo de 30 días para devoluciones. Si el zapato no te queda bien, puedes solicitar un cambio de talla o un reembolso del importe pagado siguiendo nuestro proceso de devoluciones.'
    },
    {
      question: '¿Incluye impuestos de importación?',
      answer: 'Sí, el precio que ves en nuestra tienda ya incluye todos los impuestos y aranceles de importación. No tendrás que pagar ningún cargo adicional al recibir tu pedido.'
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos pagos con tarjetas de crédito y débito, transferencias bancarias, y a través de plataformas como PayU. Todos los pagos se procesan en pesos colombianos (COP).'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-[#0F3460] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cómo Funciona</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Importamos zapatos originales desde Estados Unidos hasta la puerta de tu casa en Colombia, de manera fácil, segura y confiable.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Nuestro Proceso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0F3460] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-[#0F3460] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Tiempo de Entrega</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {/* Day 1 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-[#0F3460] mb-2">Día 1</h3>
                  <p className="text-gray-600">Recibimos tu pedido y procesamos el pago</p>
                </div>
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#E94560] z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4">
                  <p className="font-medium text-gray-800">
                    Te enviamos confirmación del pedido con los detalles de tu compra
                  </p>
                </div>
              </div>
              
              {/* Day 2-3 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <p className="font-medium text-gray-800">
                    Compramos tu pedido en Estados Unidos y lo preparamos para envío
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#E94560] z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4">
                  <h3 className="text-xl font-bold text-[#0F3460] mb-2">Día 2-3</h3>
                  <p className="text-gray-600">Adquisición y preparación del producto</p>
                </div>
              </div>
              
              {/* Day 4-8 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-[#0F3460] mb-2">Día 4-8</h3>
                  <p className="text-gray-600">Transporte internacional</p>
                </div>
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#E94560] z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4">
                  <p className="font-medium text-gray-800">
                    Tu pedido viaja desde EE.UU. a Colombia. Recibirás actualizaciones de seguimiento.
                  </p>
                </div>
              </div>
              
              {/* Day 9-12 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <p className="font-medium text-gray-800">
                    Trámites aduaneros y proceso de nacionalización del producto
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#E94560] z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4">
                  <h3 className="text-xl font-bold text-[#0F3460] mb-2">Día 9-12</h3>
                  <p className="text-gray-600">Proceso aduanero</p>
                </div>
              </div>
              
              {/* Day 13-15 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold text-[#0F3460] mb-2">Día 13-15</h3>
                  <p className="text-gray-600">Entrega final</p>
                </div>
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-[#E94560] z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4">
                  <p className="font-medium text-gray-800">
                    ¡Tu pedido llega a la puerta de tu casa! Disfruta de tus nuevos zapatos originales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Nuestras Garantías</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#0F3460] hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-[#0F3460] mb-4">Autenticidad Garantizada</h3>
              <p className="text-gray-600 mb-4">
                Todos nuestros productos son 100% originales, adquiridos directamente de distribuidores autorizados en Estados Unidos.
              </p>
              <p className="text-gray-600">
                En caso de cualquier duda sobre la autenticidad, ofrecemos reembolso inmediato.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#E94560] hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-[#0F3460] mb-4">Devoluciones Sencillas</h3>
              <p className="text-gray-600 mb-4">
                Dispones de 30 días para devoluciones. Si el producto no te queda bien o no cumple tus expectativas, te ofrecemos cambio o reembolso.
              </p>
              <p className="text-gray-600">
                Solo debes conservar el embalaje original y todos los accesorios incluidos.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#0F3460] hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-[#0F3460] mb-4">Envío Seguro</h3>
              <p className="text-gray-600 mb-4">
                Todos los envíos están asegurados contra pérdidas, daños o robos durante el transporte internacional y nacional.
              </p>
              <p className="text-gray-600">
                Si tu paquete sufre algún percance, te enviaremos un reemplazo sin costo adicional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0F3460]">Preguntas Frecuentes</h2>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <summary className="p-4 font-medium text-[#0F3460] cursor-pointer hover:text-[#E94560] focus:outline-none transition-colors">
                  {faq.question}
                </summary>
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#16213E] to-[#0F3460] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para estrenar zapatos originales?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Importamos y enviamos los zapatos que siempre has querido directamente desde Estados Unidos hasta la puerta de tu casa.
          </p>
          <Link 
            to="/catalogo" 
            className="bg-[#E94560] hover:bg-[#e93a52] text-white px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center"
          >
            Explorar Catálogo
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;