import React, { useEffect } from 'react'
import Item from './Item';
import products from '@/utils/products';
import { ShoppingCartProvider } from '../../contexts/ShoppingCartContext';
import Music from './Music';

const Catalog = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is 'c' or 'C'
      if (event.key.toLowerCase() === 'c') {
        window.location.href = '/payment/cart';
      }
    };

    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  console.log(localStorage.getItem('shopping_cart'))
  return (
    <section>
      <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
        <Music />
      </div>

      { /*(Section) Justification:
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section#usage_notes */}
      <h1 className='text-6xl text-blue-darkest pb-8 text-center font-bold'>Catálogo</h1>

      {/* ¿Why not ul-li tags? TL;DR: Think a list as you always do, short elements and that's it
    https://stackoverflow.com/questions/16213214/is-it-a-good-practice-to-put-articles-inside-lis
    Posdata: Actually, there is a debate: https://stackoverflow.com/questions/19307443/semantic-html-of-an-articles-list */}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        <ShoppingCartProvider>
          {products.map((product, index) => (
            <Item
              key={index}
              title={product.title}
              price={product.price}
              description={product.description}
              images={product.images}
            />
          ))}
        </ShoppingCartProvider>
      </div>

      <p className='text-center text-lg mt-4 py-6 bg-blue-medium-light border-4 border-blue-medium-dark rounded-lg'>
        <span className='font-bold'>Consejo:</span> ¡Puedes utilizar la tecla "C" para ir a tu carrito de compras!
      </p>
    </section>
  )
}

export default Catalog