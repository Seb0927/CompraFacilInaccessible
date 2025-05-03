import { useContext } from 'react';

import { UserContext } from '@/contexts/UserContext';

const Item = (props) => {
  const { creditCard, isSelected } = props;
  const { removeCreditCard } = useContext(UserContext);

  return (
    <div className='flex flex-row space-x-6 h-16 w-full items-center border-b-2 border-black first:border-t-2'>
      <label
        className='sr-only'
        htmlFor={creditCard.number}>
        {`Tarjeta terminada en ${creditCard.number.slice(-4)} con fecha de vencimiento ${creditCard.expiration_month}/${creditCard.expiration_year} y titular ${creditCard.owner}`}
      </label>
      <input
        defaultChecked={isSelected}
        id={creditCard.number}
        name='creditCard'
        type='radio'
        value={creditCard.number}
      />

      <div
        aria-hidden='true'
        className='flex-auto flex flex-row space-x-6 items-center cursor-pointer'
      >
        <span className='flex-1 text-center text-lg'>{'**' + creditCard.number.slice(-4)}</span>
        <span className='flex-1 text-center text-lg'>{creditCard.expiration_month + '/' + creditCard.expiration_year}</span>
        <span className='flex-1 text-center text-lg'>{creditCard.owner}</span>
      </div>

      <button
        aria-label={`Eliminar tarjeta terminada en ${creditCard.number.slice(-4)}`}
        className='bg-blue-dark text-white w-24 py-2 px-4 hover:bg-blue-darkest'
        type='button'
        onClick={() => removeCreditCard(creditCard)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default Item;