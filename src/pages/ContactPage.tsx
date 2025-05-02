import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Por favor selecciona un asunto';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor ingresa tu mensaje';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 1500);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-[#0F3460] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Estamos aquí para responder todas tus preguntas y ayudarte con tu compra.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E94560] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Phone size={24} className="text-[#E94560]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3460] mb-2">Llámanos</h3>
              <p className="text-gray-600 mb-2">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <a href="tel:+5712345678" className="text-[#E94560] font-medium hover:underline">
                +57 1234 567890
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E94560] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Mail size={24} className="text-[#E94560]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3460] mb-2">Escríbenos</h3>
              <p className="text-gray-600 mb-2">Respondemos en menos de 24 horas</p>
              <a href="mailto:info@zapatosusacolombia.com" className="text-[#E94560] font-medium hover:underline">
                info@zapatosusacolombia.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E94560] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <MapPin size={24} className="text-[#E94560]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3460] mb-2">Visítanos</h3>
              <p className="text-gray-600 mb-2">Calle 123 #45-67, Bogotá, Colombia</p>
              <a href="#" className="text-[#E94560] font-medium hover:underline">
                Ver en el mapa
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#0F3460] mb-6">Envíanos un mensaje</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-green-600 mb-4">
                    Gracias por contactarnos. Te responderemos lo más pronto posible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F3460] ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F3460] ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F3460] ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta">Consulta general</option>
                      <option value="pedido">Seguimiento de pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="problema">Problema con mi pedido</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F3460] ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#E94560] hover:bg-[#e93a52] text-white py-3 rounded-md font-medium transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
            
            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#0F3460] mb-6">Preguntas Frecuentes</h2>
              
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-md overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                    ¿Cómo puedo hacer seguimiento a mi pedido?
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">
                      Una vez realizada la compra, recibirás un correo electrónico con un número de seguimiento. 
                      También puedes ingresar a tu cuenta y revisar el estado de tus pedidos en la sección "Mis Pedidos".
                    </p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-md overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                    ¿Cuál es el tiempo de entrega?
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">
                      El tiempo estimado de entrega es de 10 a 15 días hábiles desde la confirmación de tu pedido. 
                      Este plazo incluye el proceso de importación desde Estados Unidos y la entrega a domicilio en Colombia.
                    </p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-md overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                    ¿Qué hago si recibo un producto defectuoso?
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">
                      Si recibes un producto defectuoso, contáctanos dentro de los primeros 7 días después de recibir tu pedido. 
                      Te ayudaremos con el proceso de cambio o devolución sin costo adicional para ti.
                    </p>
                  </div>
                </details>
                
                <details className="border border-gray-200 rounded-md overflow-hidden">
                  <summary className="p-4 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                    ¿Realizan envíos a toda Colombia?
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">
                      Sí, realizamos envíos a todas las ciudades y municipios de Colombia. 
                      El costo de envío se calcula automáticamente durante el proceso de compra según tu ubicación.
                    </p>
                  </div>
                </details>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="font-medium text-[#0F3460] mb-2">¿No encontraste lo que buscabas?</h3>
                <a href="#" className="inline-flex items-center text-[#E94560] font-medium hover:underline">
                  <MessageCircle size={16} className="mr-1" />
                  Chatea con nosotros
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0F3460] mb-8 text-center">Nuestra Ubicación</h2>
          
          <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600">Mapa de ubicación</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;