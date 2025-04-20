import Blob from './Blob.jsx'
import Header from './Header.jsx'
import { UserProvider } from '@/contexts/UserContext'
import { ShoppingCartProvider } from '@/contexts/ShoppingCartContext'

const Background = (props) => {

  const { children } = props;

  return (
    <>
      {/* Background */}
      <div className='bg-blue-lightest absolute min-h-screen w-full -z-50'>
        {/* Blob */}
        <div className='absolute -z-40 -left-0 top-0 -translate-y-1/4 -translate-x-1/2'>
          <Blob />
        </div>

        {/* User Context */}
        <UserProvider>
          {/* ShoppingCart Context */}
          <ShoppingCartProvider>

            {/* Navbar */}
            <Header />

            {/* Main */}
            {/* Justification:
        https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content */}
            <main className='pt-20 pb-10 md:px-20 px-10'>
              {children}
            </main>
          </ShoppingCartProvider>
        </UserProvider>
      </div>
    </>
  )

}

export default Background