import { useState, useEffect, useContext, useRef } from 'react'

import { UserContext } from '@/contexts/UserContext'

const AddCard = () => {
  const { addCreditCard } = useContext(UserContext);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState(false);

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
      setError(true);
      errorRef.current.focus();
    }
  }
  return (
    <div className='flex justify-center w-full'>
      <section className='flex flex-col space-y-4 h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-bold'>Agregar nueva tarjeta de crédito</h1>

          {error && (
            <p
              ref={errorRef}
              className='text-lg'
              role="alert"
              tabIndex={-1}
            >
              Hay un error en los datos ingresados
            </p>
          )}

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='cardNumber'>
              Número de tarjeta
            </label>
            <input
              aria-required="true"
              className='w-full h-9 bg-blue-dark px-1 text-white'
              id='cardNumber'
              type='text'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)} />
          </div>

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='cardHolder'>
              Responsable de la tarjeta
            </label>
            <input
              aria-required="true"
              className='w-full h-9 bg-blue-dark px-1 text-white'
              id='cardHolder'
              type='text'
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)} />
          </div>


          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='expirationDate'>
              Número de tarjeta
            </label>
            <input
              aria-required="true"
              className='w-full h-9 bg-blue-dark px-1 text-white'
              id='expirationDate'
              type='date'
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)} />
          </div>

          <div className='flex flex-col space-y-2 items-center'>
            <button
              className='h-9 w-36 bg-blue-dark text-white text-lg hover:bg-blue-darkest'
              type="submit">
              Agregar tarjeta
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddCard