import { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '@/contexts/UserContext'

const AddCard = () => {
  const { addCreditCard } = useContext(UserContext);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let expirationMonth = ''
    let expirationYear = ''

    if (expirationDate){
      const enteredDate = new Date(expirationDate);
      expirationMonth = (enteredDate.getMonth() + 1).toString().padStart(2, '0');
      expirationYear = enteredDate.getFullYear().toString();
    }

    const creditCard = {
      number: cardNumber,
      expiration_month: expirationMonth,
      expiration_year: expirationYear,
      owner: cardHolder
    };

    const result = addCreditCard(creditCard);
    if (result.success) {
      window.location.href = '/payment/card';
    } else {
      setError(result.message);
      errorRef.current.focus();
    }
  }
  return (
    <div className='flex justify-center w-full'>
      <section className='flex flex-col space-y-4 h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-bold'>Agregar nueva tarjeta de crédito</h1>
          <p className='text-lg'>Ingresa los datos de tu tarjeta de crédito a continuación</p>

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
            <label htmlFor='cardNumber' className='block'>
              Número de tarjeta
            </label>
            <input
              id='cardNumber'
              type='text'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>

          <div className='flex flex-col space-y-1'>
            <label htmlFor='cardHolder' className='block'>
              Responsable de la tarjeta
            </label>
            <input
              id='cardHolder'
              type='text'
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>


          <div className='flex flex-col space-y-1'>
            <label htmlFor='expirationDate' className='block'>
              Número de tarjeta
            </label>
            <input
              id='expirationDate'
              type='date'
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true" />
          </div>

          <div className='flex flex-col space-y-2 items-center'>
            <button
              type="submit"
              className='h-9 w-36 bg-blue-dark text-white text-lg hover:bg-blue-darkest'>
              Agregar tarjeta
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddCard