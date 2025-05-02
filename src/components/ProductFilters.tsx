import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    brands?: string[];
    priceRange?: [number, number];
  }) => void;
  initialCategory?: string;
}

const ProductFilters = ({ onFilterChange, initialCategory }: ProductFiltersProps) => {
  const { getAvailableBrands, getPriceRange } = useProducts();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      const brands = await getAvailableBrands();
      setAvailableBrands(brands);

      const [minPrice, maxPrice] = await getPriceRange();
      setPriceRange([minPrice, maxPrice]);
      setMaxPrice(maxPrice);
    };

    loadFilters();
  }, [getAvailableBrands, getPriceRange]);

  useEffect(() => {
    const newFilters: {
      brands?: string[];
      priceRange?: [number, number];
    } = {};
    
    if (selectedBrands.length > 0) {
      newFilters.brands = selectedBrands;
    }
    
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
      newFilters.priceRange = priceRange;
    }
    
    onFilterChange(newFilters);
  }, [selectedBrands, priceRange, onFilterChange, maxPrice]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([priceRange[0], value]);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#0F3460]">Filtros</h2>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-[#E94560] hover:underline flex items-center"
          >
            <X size={14} className="mr-1" />
            Limpiar todo
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Rango de Precio</h3>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">{formatPrice(priceRange[0])}</span>
          <span className="text-sm text-gray-500">{formatPrice(priceRange[1])}</span>
        </div>
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full accent-[#E94560]"
          />
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-full accent-[#E94560]"
          />
        </div>
        <div className="flex space-x-2">
          <div>
            <label htmlFor="min-price" className="text-sm text-gray-500 block mb-1">Mínimo</label>
            <input
              type="number"
              id="min-price"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="border rounded px-3 py-1 w-full text-sm"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="text-sm text-gray-500 block mb-1">Máximo</label>
            <input
              type="number"
              id="max-price"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="border rounded px-3 py-1 w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Marcas</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableBrands.map(brand => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 accent-[#E94560]"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;