import { useContext } from 'react'

import { ShoppingCartContext } from '@/contexts/ShoppingCartContext'

import Item from './Item'
import Container from '../Container'

const Cart = () => {
  const { cart } = useContext(ShoppingCartContext);

  return (
    <Container>
      <h1 className='text-4xl font-bold'>Carrito de compras</h1>
      <p className='text-lg'>Un resumen de tus productos agregados para comprar</p>

      <div className='flex flex-col space-y-4 py-4'>
        {cart.length === 0 ? (
          <>
            <hr className='h-0.5 w-full border-black bg-black' />
            <p className='w-full text-center italic py-8'>No has agregado productos a tu carrito de compras</p>
            <hr className='h-0.5 w-full border-black bg-black' />
          </>
        ) : (
          <div className='w-full'>
            {cart.map((product, index) => (
              <Item key={index} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-row items-center justify-center'>
        {cart.length === 0 ? (
          <span
            aria-disabled='true'
            className='flex items-center justify-center h-9 w-48 bg-gray-400 text-white text-xl cursor-not-allowed opacity-60'
            tabIndex={-1}
          >
            Comprar
          </span>
        ) : (
          <a
            className='flex items-center justify-center h-9 w-48 bg-blue-dark text-white text-xl hover:bg-blue-darkest'
            href={'/payment/card'}
          >
            Comprar
          </a>
        )}
      </div>
    </Container>
  )
}

export default Cart;