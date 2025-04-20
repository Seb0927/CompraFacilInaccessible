import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'

const Item = (props) => {
  const { location, isSelected } = props;
  const { removeLocation } = useContext(UserContext);

  return (
    <div className='flex flex-row space-x-6 h-16 w-full items-center border-b-2 border-black first:border-t-2'>
      <label
        htmlFor={location.address}
        className='sr-only'>
        {`Dirección ubicada en ${location.address} en el barrio ${location.neighborhood} a nombre de ${location.name}`}
      </label>
      <input
        type='radio'
        id={location.address}
        name='location'
        value={location.address}
        defaultChecked={isSelected}/>

      <div
        aria-hidden='true'
        className='flex-auto flex flex-row space-x-6 items-center cursor-pointer'
      >
        <span className='flex-1 text-center text-lg not-sr-only'>{location.address}</span>
        <span className='flex-1 text-center text-lg not-sr-only'>{location.neighborhood}</span>
        <span className='flex-1 text-center text-lg not-sr-only'>{location.name}</span>
      </div>

      <button
        type='button'
        onClick={() => removeLocation(location)}
        className='bg-blue-dark text-white w-24 py-2 px-4 hover:bg-blue-darkest'
        aria-label={`Eliminar dirección ${location.address}`}>
        Eliminar
      </button>
    </div>
  )
}

export default Item