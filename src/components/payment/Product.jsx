const Products = (props) => {
  const { product } = props;

  const imageUrl = 'https://res.cloudinary.com/dao5kgzkm/image/upload/v1741316071/Clothing/';

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(product.price * product.quantity);

  return (
    <div className='flex flex-row w-full space-x-6 items-center py-4 border-b-2 border-black first:border-t-2'>
      {/* Product image */}
      <img
        alt={product.description || `Imagen de ${product.title}`}
        className='w-16 h-16 aspect-square object-cover rounded-sm'
        src={imageUrl + product.images[0]}
      />

      {/* Product title */}
      <div className='flex-2 w-full text-center'>
        <p className='text-lg'>{product.title}</p>
      </div>

      {/* Price information */}
      <div className='flex-1 w-full text-right'>
        <p className='text-lg'>
          {formattedTotal}
        </p>
      </div>
    </div>
  )
}

export default Products