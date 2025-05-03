import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from 'react-router';

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

// Dynamic page component
function DynamicPage(props) {
  // Use either passed prop or URL parameter
  const params = useParams();
  const componentKey = (props.componentName || params.componentName || 'catalog').toLowerCase();

  const Component = components[componentKey] || Catalog;

  // Set the document title to "CompraFácil" for all pages
  useEffect(() => {
    document.title = 'CompraFácil';
  }, []);

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
        <Route element={<DynamicPage componentName='catalog' />} path='/' />
        <Route element={<DynamicPage componentName='blog' />} path='/blog' />
        <Route element={<DynamicPage />} path='/blog/:componentName' />
        <Route element={<DynamicPage componentName='assistance' />} path='/assistance' />
        <Route element={<DynamicPage componentName='login' />} path='/login' />
        <Route element={<DynamicPage componentName='register' />} path='/register' />
        <Route element={<DynamicPage componentName='assistance' />} path='/help' />
        <Route element={<DynamicPage />} path='/payment/:componentName' />
        <Route element={<DynamicPage componentName='payment' />} path='/payment' />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)