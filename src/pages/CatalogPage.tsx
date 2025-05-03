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

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="pt-24 pb-16 bg-white text-primary font-sans">
      {/* Filtros y productos */}
      <div className="flex gap-6 px-6 max-w-full">
        {/* Filtros laterales */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:max-w-xs bg-muted/15 rounded-lg shadow-sm p-4 h-fit border border-gray-100`}
        >
          <ProductFilters onFilterChange={handleFilterChange} initialCategory={category} />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 w-full">
          <div className="flex justify-between items-center mb-6 px-2">
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

          {/* Contenido */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
