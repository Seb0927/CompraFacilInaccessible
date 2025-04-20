import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import './index.css'
import {
  Background,
  Catalog,
  Blog,
  Login,
  Post1,
  Post2,
  Post3,
  Register,
  Assistance,
  Cart,
  Card,
  AddCard,
  Location,
  AddLocation,
  Payment
} from './components'

// Component map for dynamic loading
const components = {
  catalog: Catalog,
  blog: Blog,
  login: Login,
  post1: Post1,
  post2: Post2,
  post3: Post3,
  register: Register,
  assistance: Assistance,
  cart: Cart,
  card: Card,
  addcard: AddCard,
  location: Location,
  addlocation: AddLocation,
  payment: Payment
}

// Map component titles to their respective names
const titles = {
  catalog: 'Catalogo',
  blog: 'Blog',
  login: 'Iniciar Sesión',
  register: 'Registro',
  assistance: 'Asistencia',
  cart: 'Carrito de Compras',
  card: 'Tarjeta de Crédito',
  addcard: 'Agregar Tarjeta de Crédito',
  location: 'Ubicación',
  addlocation: 'Agregar Ubicación',
  payment: 'Método de Pago'
}

// Dynamic page component
function DynamicPage(props) {
  // Use either passed prop or URL parameter
  const params = useParams();
  const componentKey = (props.componentName || params.componentName || 'catalog').toLowerCase();

  const Component = components[componentKey] || Catalog;

  // Dynamically update the document title using the titles object
  useEffect(() => {
    const componentTitle = titles[componentKey] || 'CompraFácil'; // Fallback to "CompraFácil" if no title is found
    document.title = `${componentTitle}`;
  }, [componentKey]);

  return (
    <Background>
      <Component />
    </Background>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DynamicPage componentName="catalog" />} />
        <Route path="/blog" element={<DynamicPage componentName="blog" />} />
        <Route path="/blog/:componentName" element={<DynamicPage />} />
        <Route path="/login" element={<DynamicPage componentName="login" />} />
        <Route path="/register" element={<DynamicPage componentName="register" />} />
        <Route path="/help" element={<DynamicPage componentName="assistance" />} />
        <Route path="/payment/:componentName" element={<DynamicPage />} />
        <Route path="/payment" element={<DynamicPage componentName="payment" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)