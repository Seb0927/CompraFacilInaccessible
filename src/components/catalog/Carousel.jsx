import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = (props) => {
  const { images, description } = props;

  const [index, setIndex] = useState(0);
  const imageUrl = 'https://res.cloudinary.com/dao5kgzkm/image/upload/v1741316071/Clothing/';
  
  // Refs for drag functionality
  const carouselRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const threshold = 50; // Minimum drag distance to trigger a slide change
  
  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  // Mouse events for desktop
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
  };
  
  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      currentXRef.current = e.clientX;
    }
  };
  
  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      const diff = currentXRef.current - startXRef.current;
      
      // If dragged far enough, change slide
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToPrevious(); // Dragged right -> show previous image
        } else {
          goToNext(); // Dragged left -> show next image
        }
      }
      
      isDraggingRef.current = false;
    }
  };
  
  // Touch events for mobile
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    if (isDraggingRef.current) {
      currentXRef.current = e.touches[0].clientX;
    }
  };
  
  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      const diff = currentXRef.current - startXRef.current;
      
      // If dragged far enough, change slide
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToPrevious(); // Dragged right -> show previous image
        } else {
          goToNext(); // Dragged left -> show next image
        }
      }
      
      isDraggingRef.current = false;
    }
  };

  return (
    <div 
      ref={carouselRef}
      className='relative h-full w-1/2 z-0'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="Carrusel"
      aria-label="Carrusel de imágenes del producto"
    >
      {/* Navigation buttons */}
      {index !== 0 &&
        <button
          onClick={goToPrevious}
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 mx-2 focus:outline-2 focus:outline-blue-dark'
          aria-label="Imagen anterior"
        >
          <ChevronLeft />
        </button>
      }
      
      {/* Current image */}
      <img
        crossOrigin='anonymous'
        src={imageUrl + images[index] + '.jpg'}
        alt={description}
        className='h-full w-full object-cover rounded-lg pointer-events-none'
        aria-roledescription="Imagen"
        aria-label={`Imagen ${index + 1} de ${images.length}: ${description}`}
      />
      
      {index !== images.length - 1 &&
        <button
          onClick={goToNext}
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 mx-2 focus:outline-2 focus:outline-blue-dark'
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={24} />
        </button>
      }
      
      {/* Optional: Add slide indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-blue-dark' : 'bg-white bg-opacity-60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            aria-current={i === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;