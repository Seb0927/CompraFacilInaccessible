import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

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
      aria-label="Carrusel de imágenes del producto"
      aria-roledescription="Carrusel"
      className='relative h-full w-1/2 z-0'
      role="region"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {/* Current image */}
      <img
        aria-label={`Imagen ${index + 1} de ${images.length}: ${description}`}
        aria-roledescription="Imagen"
        className='h-full w-full object-cover rounded-lg pointer-events-none'
        crossOrigin='anonymous'
        src={imageUrl + images[index] + '.jpg'}
      />
      
      {/* Add slide indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-blue-dark' : 'bg-white bg-opacity-60'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;