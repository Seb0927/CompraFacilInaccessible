import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Item from './Item';
import Container from '../Container';

const Card = () => {
  const { user, selectCreditCard } = useContext(UserContext);
  const [error, setError] = useState('');
  const errorRef = useRef(null);
  
  // This effect will run after the component renders and the error element exists
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]); // Only run when error changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedCard = formData.get('creditCard');

    const card = user?.creditCards?.find(card => card.number === selectedCard);

    const result = selectCreditCard(card);

    if (result.success) {
      window.location.href = '/payment/location';
    } else {
      setError(result.message);

    }
  };

  return (
    <Container>
      <h1 className='text-4xl font-bold'>Selecciona una tarjeta de crédito</h1>
      <p className='text-lg'>Selecciona la tarjeta de crédito que utilizarás para esta compra. Puedes agregar una tarjeta si lo deseas.</p>

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

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-2 py-4 mb-4'>
          {user?.creditCards?.length === 0 ? (
            <p className='w-full text-center italic py-8'>No tienes tarjeta de créditos registradas</p>
          ) : (
            <div className='flex flex-col'>
              {user?.creditCards?.map((creditCard, index) => (
                <Item
                  key={index}
                  creditCard={creditCard}
                  isSelected={user.selectedCreditCard?.number === creditCard.number}
                />
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-row items-center justify-between w-full'>
          <a
            href={'/payment/addcard'}
            className='flex items-center justify-center h-9 w-48 bg-blue-dark text-white text-xl hover:bg-blue-darkest'
          >
            Agregar tarjeta
          </a>

          <button
            type='submit'
            className='flex items-center justify-center h-9 w-48 bg-blue-dark text-white text-xl hover:bg-blue-darkest'>
            Continuar
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Card;