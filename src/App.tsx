import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <ProductProvider>
        <ShoppingCartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalogo" element={<CatalogPage />} />
              <Route path="catalogo/:category" element={<CatalogPage />} />
              <Route path="producto/:id" element={<ProductPage />} />
              <Route path="como-funciona" element={<HowItWorksPage />} />
              <Route path="contacto" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ShoppingCartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;