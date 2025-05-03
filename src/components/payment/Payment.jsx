import { useContext } from 'react'

import { ShoppingCartContext } from '@/contexts/ShoppingCartContext'
import { UserContext } from '@/contexts/UserContext'

import Container from './Container'
import Counter from './Counter'
import Product from './Product'

const Payment = () => {
  const { user, clearSelectedPaymentDetails } = useContext(UserContext)
  const { cart, clearCart } = useContext(ShoppingCartContext)

  const handlePayment = () => {
    // Clear the cart and payment details
    clearCart()
    clearSelectedPaymentDetails()

    // Redirect to the home page
    window.location.href = '/'
  }

  return (
    <Container>
      <span className='text-4xl font-bold w-full text-center'>Compra final</span>

      {/* Counter */}
      <div className='w-full max-w-md mx-auto my-4'>
        <Counter />
      </div>

      <div className='flex flex-col md:flex-row w-full md:space-x-8 py-4'>
        <section className='flex-1'>
          <span className='text-3xl font-bold mb-4'>Detalles del pago</span>
          <div className='flex flex-row space-y-2'>
            <div className='flex-1'>
              <span className='text-2xl font-bold'>Dirección</span>
              <address className='not-italic'>
                <p>{user.selectedLocation.address}</p>
                <p>{user.selectedLocation.neighborhood}</p>
                <p>{user.selectedLocation.name}</p>
              </address>
            </div>
            <div className='flex-1'>
              <span className='text-2xl font-bold'>Tarjeta</span>
              <p>{'**' + user.selectedCreditCard.number.slice(-4)}</p>
              <p>
                <time dateTime={'01-' + user.selectedCreditCard.expiration_month + '-' + user.selectedCreditCard.expiration_year}>
                  {user.selectedCreditCard.expiration_month + '/' + user.selectedCreditCard.expiration_year}
                </time>
              </p>
              <p>
                {user.selectedCreditCard.owner}
              </p>
            </div>
          </div>
        </section>

        <section className='flex-1'>
          <span className='text-2xl font-bold'>Productos</span>
          <div className='flex flex-col space-y-4 py-4 w-full md:h-64 md:overflow-auto'>
            {cart.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </section>
      </div>

      <div className='flex justify-center w-full '>
        <button
          className='h-9 w-48 bg-blue-dark text-white text-xl hover:bg-blue-darkest'
          onClick={handlePayment}
          onMouseDown={handlePayment}>
          Comprar
        </button>
      </div>
    </Container>
  )
}

export default Payment;