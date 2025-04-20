import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import shoppingCartSvg from '../../assets/vectors/shopping_cart.svg'

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const imageUrl = 'https://res.cloudinary.com/dao5kgzkm/image/upload/logo';

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className='fixed bg-blue-darkest h-16 w-full z-50'>
      <div className='flex items-center h-full px-4 py-3 md:space-x-5'>
        <img crossOrigin='anonymous' src={imageUrl} alt='Logo de CompraFacil' className='h-full md:block hidden' />
        <span className='text-white text-xl font-bold md:block hidden'>CompraFácil</span>
        <hr className='h-full w-0.5 blue bg-white md:block hidden' />
        {/* Justification:
      https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11.html */}
        <nav>
          <ul className='flex items-center space-x-4'>
            <li className='text-white text-xl'>
              <a href='/'>Catálogo</a>
            </li>
            <li className='text-white text-xl'>
              <a href='/blog'>Blog</a>
            </li>
            <li className='text-white text-xl'>
              <a href='assistance'>Ayuda</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className='absolute right-0 top-0 h-full flex items-center px-4 py-3 space-x-5'>
        <a href="/payment/cart" className='h-full'>
          <img src={shoppingCartSvg} alt='Tu carrito de compras' className='h-full' />
        </a>

        {user ? (
          <button
            onClick={handleLogout}
            className='bg-blue-light h-full px-3 font-semibold text-lg rounded-md hover:bg-blue-medium-light'>
            Cerrar sesión
          </button>
        ) : (
          <a href='/login'
            className='flex items-center justify-center bg-blue-light h-full px-3 font-semibold text-lg rounded-md hover:bg-blue-medium-light'>
            Iniciar sesión
          </a>
        )}
      </div>
    </header>
  )
}

export default Header