import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories?: string[];
  }) => void;
  initialCategory?: string;
}

// Puedes personalizar estas categorías:
const shoeTypes = [
  'Guayos de Fútbol',
  'Running',
  'Casual',
  'Skateboarding',
  'Basketball',
  'Tennis',
  'Urbano'
];

const ProductFilters = ({ onFilterChange, initialCategory }: ProductFiltersProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      onFilterChange({ categories: selectedTypes });
    } else {
      onFilterChange({});
    }
  }, [selectedTypes, onFilterChange]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#0F3460]">Filtros</h2>
        {selectedTypes.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#E94560] hover:underline flex items-center"
          >
            <X size={14} className="mr-1" />
            Limpiar todo
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-4">Tipo de Zapato</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {shoeTypes.map(type => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 accent-[#E94560]"
              />
              <label htmlFor={`type-${type}`} className="ml-2 text-gray-700 text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
