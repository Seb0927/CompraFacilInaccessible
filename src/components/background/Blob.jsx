import blobSvg from '../../assets/vectors/blob.svg';

const Blob = () => {
  return (
    <div>
      { /* Justification:
      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden */}
      <img src={blobSvg} aria-hidden="true" 
      className='w-80 h-80 md:h-108 md:w-108 lg:h-128 lg:w-128'/>
    </div>
  )
}

export default Blob