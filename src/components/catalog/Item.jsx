import { useContext } from 'react'
import { ShoppingCartContext } from '@/contexts/ShoppingCartContext';
import Carousel from './Carousel';

const Item = (props) => {
  const { title, price, description, images } = props;

  const {addToCart} = useContext(ShoppingCartContext);

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <article className='h-96 md:h-88 flex bg-blue-medium-light p-6 rounded-lg items-center'>
      { /*(Article) Justification:
      https://developer.mozilla.org/es/docs/Web/HTML/Element/article */ }
      <div className='h-3/4 w-full px-2 flex'>
        <Carousel images={images} description={description} />
        <div className='w-1/2 flex flex-row items-center justify-center'>
          <div className='ml-6 w-full flex flex-col items-center'>
            <h2 className='text-center font-bold text-xl'>{title}</h2>
            {/* (Span) Justification 
            https://stackoverflow.com/questions/9632311/which-html-tags-are-more-appropriate-for-money*/}
            <span className='text-center text-xl mt-2'>{formattedPrice}</span>
            {/* (aria-label) Justification:
            https://www.w3.org/WAI/WCAG22/Techniques/general/G208 */}
            <button 
              onClick={() => addToCart({ title, price, description, images })}
              className='bg-blue-dark text-white mt-3 lg:mt-6 px-6 py-2 text-xl w-full rounded-lg hover:bg-blue-darkest'
              aria-label={`Añadir ${title}`}>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Item;