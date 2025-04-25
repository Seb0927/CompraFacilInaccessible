import { useState, useContext, useRef } from 'react'
import { UserContext } from '@/contexts/UserContext'

const AddCard = () => {
  const { addLocation } = useContext(UserContext);

  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const location = {
      address: address,
      neighborhood: neighborhood,
      name: name
    };

    const result = addLocation(location);
    if (result.success) {
      window.location.href = '/payment/location';
    } else {
      setError(result.message);
      errorRef.current.focus();
    }
  }
  return (
    <div className='flex justify-center w-full'>
      <section className='flex flex-col space-y-4 h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-bold'>Agregar nueva dirección</h1>
          <p className='text-lg'>Ingresa los datos de tu dirección a continuación:</p>

          {error && (
            <p
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              {error}
            </p>
          )}

          <div className='flex flex-col space-y-1'>
            <label htmlFor='address' className='block'>
              Dirección
            </label>
            <input
              id='address'
              type='text'
              value={address}
              tabIndex={3}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>

          {/* Note: 
          Usually the neighborhood is asked first and then the address. Make it behave the same as well! */}
          <div className='flex flex-col space-y-1'>
            <label htmlFor='neighborhood' className='block'>
              Barrio
            </label>
            <input
              id='neighborhood'
              type='text'
              value={neighborhood}
              tabIndex={2}
              onChange={(e) => setNeighborhood(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>


          <div className='flex flex-col space-y-1'>
            <label htmlFor='name' className='block'>
              Receptor del pedido
            </label>
            <input
              id='name'
              type='text'
              value={name}
              tabIndex={4}
              onChange={(e) => setName(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>

          <div className='flex flex-col space-y-2 items-center'>
            <button
              tabIndex={5}
              type="submit"
              className='h-9 w-48 bg-blue-dark text-white text-lg hover:bg-blue-darkest'>
              Agregar dirección
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddCard