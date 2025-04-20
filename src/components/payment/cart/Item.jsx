import { useContext } from 'react'
import { ShoppingCartContext } from '@/contexts/ShoppingCartContext'
import { Plus, Minus } from 'lucide-react';

const Item = (props) => {
  const { product } = props;

  const { removeFromCart, incrementQuantity, decrementQuantity } = useContext(ShoppingCartContext);
  const imageUrl = 'https://res.cloudinary.com/dao5kgzkm/image/upload/v1741316071/Clothing/';

  // Calculate total for this item
  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(product.price * product.quantity);

  return (
    <div className='flex flex-row w-full space-x-6 items-center py-4 border-b-2 border-black first:border-t-2'>
      {/* Product image */}
      <img
        src={imageUrl + product.images[0]}
        alt={product.description || `Imagen de ${product.title}`}
        className='w-24 h-24 aspect-square object-cover rounded-sm'
      />

      {/* Product title */}
      <div className='flex-1'>
        <h3 className='text-lg'>{product.title}</h3>
      </div>

      {/* Quantity controls */}
      <div className='flex flex-row items-center space-x-4 flex-1 justify-center'>
        <button
          onClick={() => decrementQuantity(product.title)}
          className='bg-blue-dark text-white h-min w-min p-1 hover:bg-blue-darkest'
          aria-label={`Disminuir cantidad de ${product.title}`}
        >
          <Minus className='h-4 w-4 fill-white' />
        </button>

        <span className='text-xl' aria-label={`Cantidad: ${product.quantity}`}>
          {product.quantity}
        </span>

        <button
          onClick={() => incrementQuantity(product.title)}
          className='bg-blue-dark text-white h-min w-min p-1 hover:bg-blue-darkest'
          aria-label={`Aumentar cantidad de ${product.title}`}
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
          onClick={() => removeFromCart(product.title)}
          className='bg-blue-dark text-white py-2 px-4 hover:bg-blue-darkest'
          aria-label={`Eliminar ${product.title} del carrito`}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Item