import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { useProducts } from '../context/ProductContext';
import { ChevronDown } from 'lucide-react';

const CatalogPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { products, loading, fetchProducts } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchProducts({ category });
  }, [fetchProducts, category]);

  const handleFilterChange = async (filters: {
    brands?: string[];
    priceRange?: [number, number];
  }) => {
    await fetchProducts({
      ...filters,
      category,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    const sortedProducts = [...products];

    switch (e.target.value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Todos los Productos';

  return (
    <div className="pt-20 pb-16 bg-white text-primary font-sans">
      {/* Header con fondo destacado */}
      <div className="relative text-white py-16 shadow-lg">
       
        <div className="absolute inset-0 w-full h-full object-cover bg-primary/90"></div>
        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-4xl font-bold">{categoryTitle}</h1>
          <p className="mt-2 text-gray-200 text-lg">
            Encuentra los mejores zapatos importados desde Estados Unidos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Botón móvil para mostrar filtros */}
        <button
          className="md:hidden flex items-center justify-between w-full bg-white p-4 rounded-lg shadow border border-gray-200"
          onClick={toggleFilters}
        >
          <span className="font-medium">Filtros</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Filtros laterales */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block md:w-1/5 bg-muted/15 rounded-lg shadow-sm p-4 h-fit border border-gray-100`}
        >
          <ProductFilters onFilterChange={handleFilterChange} initialCategory={category} />
        </div>

          {/* Contenido principal */}
          <div className="md:w-4/5">
            <div className="flex justify-between items-center mb-6">
              <p className="text-accent font-medium">
                Mostrando <strong>{products.length}</strong> productos
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-accent mr-2 font-medium">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-muted rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="default">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </select>
              </div>
            </div>

            {/* Cargando */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                    <div className="bg-muted h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted mb-4">
                  No se encontraron productos que coincidan con tus filtros.
                </p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="text-white bg-accent hover:bg-secondary px-6 py-2 rounded-md transition"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
