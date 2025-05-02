// src/utils/mapToProduct.ts
import { Product } from '../types/Product';
import { ProductFromDB } from '../types/ProductFromDB';

export function mapToProduct(db: ProductFromDB): Product {
  return {
    id: db.id,
    name: db.nombre,
    brand: db.marca,
    price: db.precio_cop,
    description: db.descripcion,
    category: db.categoria,
    sizes: db.talla,
    images: [db.imagen_url],
    quantity: 1,
  };
}
