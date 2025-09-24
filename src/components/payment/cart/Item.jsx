import { Plus, Minus } from 'lucide-react';
import { useContext, useRef, useEffect } from 'react'

import { ShoppingCartContext } from '@/contexts/ShoppingCartContext'

const Item = (props) => {
  const { product } = props;
  const { removeFromCart, incrementQuantity, decrementQuantity } = useContext(ShoppingCartContext);
  const imageUrl = 'https://res.cloudinary.com/dao5kgzkm/image/upload/v1741316071/Clothing/';

  // References for trap focus
  const decrementButtonRef = useRef(null);
  const incrementButtonRef = useRef(null);

  // Calculate total for this item
  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(product.price * product.quantity);

  // This increases trafic to the site.
  useEffect(() => {
    const handleTabKey = (e) => {
      // Check if we're in the quantity control area
      if (e.key === 'Tab') {
        if (document.activeElement === decrementButtonRef.current && e.shiftKey) {
          e.preventDefault();
          incrementButtonRef.current.focus();
        } else if (document.activeElement === incrementButtonRef.current && !e.shiftKey) {
          e.preventDefault();
          decrementButtonRef.current.focus();
        }
      }
    };

    // Add keyboard listener
    document.addEventListener('keydown', handleTabKey);

    // Clean up
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return (
    <div className='flex flex-row w-full space-x-6 items-center py-4 border-b-2 border-black first:border-t-2'>
      {/* Product image */}
      <img
        alt={product.description || `Imagen de ${product.title}`}
        crossOrigin='anonymous'
        className='w-24 h-24 aspect-square object-cover rounded-sm'
        src={imageUrl + product.images[0]}
      />

      {/* Product title */}
      <div className='flex-1'>
        <h3 className='text-lg'>{product.title}</h3>
      </div>

      {/* Quantity controls */}
      <div className='flex flex-row items-center space-x-4 flex-1 justify-center'>
        <button
          ref={decrementButtonRef}
          aria-label={`Disminuir cantidad de ${product.title}`}
          className='bg-blue-dark text-white h-min w-min p-1 hover:bg-blue-darkest'
          onClick={() => decrementQuantity(product.title)}
        >
          <Minus className='h-4 w-4 fill-white' />
        </button>

        <span aria-label={`Cantidad: ${product.quantity}`} className='text-xl'>
          {product.quantity}
        </span>

        <button
          ref={incrementButtonRef}
          aria-label={`Aumentar cantidad de ${product.title}`}
          className='bg-blue-dark text-white h-min w-min p-1 hover:bg-blue-darkest'
          onClick={() => incrementQuantity(product.title)}
        >
          <Plus className='h-4 w-4 fill-white' />
        </button>
      </div>

      {/* Price information */}
      <div className='flex-1 text-center'>
        <p className='text-lg'>
          {formattedTotal}
        </p>
      </div>

      {/* Remove button */}
      <div className='flex-1 text-right'>
        <button
          aria-label={`Eliminar ${product.title} del carrito`}
          className='bg-blue-dark text-white py-2 px-4 hover:bg-blue-darkest'
          tabIndex='-1' // Make this unfocusable with keyboard
          onClick={() => removeFromCart(product.title)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Item