import { CheckCircle as CircleCheck } from 'lucide-react';

const BrandLogos = () => {
  const brands = [
    { name: 'Nike', value: 'nike' },
    { name: 'Adidas', value: 'adidas' },
    { name: 'New Balance', value: 'new-balance' },
    { name: 'Converse', value: 'converse' },
    { name: 'Vans', value: 'vans' },
    { name: 'Puma', value: 'puma' },
    { name: 'Reebok', value: 'reebok' },
    { name: 'Timberland', value: 'timberland' },
    { name: 'Dr. Martens', value: 'dr-martens' },
    { name: 'Clarks', value: 'clarks' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
      {brands.map((brand) => (
        <div 
          key={brand.value}
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm"
        >
          <CircleCheck size={16} className="text-[#E94560] mr-2" />
          <span className="font-medium text-[#0F3460]">{brand.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BrandLogos;