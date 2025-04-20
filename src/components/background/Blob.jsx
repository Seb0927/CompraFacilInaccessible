import blobSvg from '../../assets/vectors/blob.svg';

const Blob = () => {
  return (
    <div>
      <img src={blobSvg} alt='vectors/blob.svg'
      className='w-80 h-80 md:h-108 md:w-108 lg:h-128 lg:w-128'/>
    </div>
  )
}

export default Blob