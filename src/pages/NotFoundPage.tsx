import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-bold text-[#E94560]">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-[#0F3460] mt-4 mb-6">
          Página no encontrada
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-[#0F3460] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
          >
            <Home size={20} className="mr-2" />
            Volver al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-white border border-[#0F3460] text-[#0F3460] hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;