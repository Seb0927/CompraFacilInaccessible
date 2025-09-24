import { useState, useEffect } from 'react'

import posts from '@/utils/posts'

import Post from './Post'

const Blog = () => {
  // State to control blinking animation
  const [isBlinking, setIsBlinking] = useState(true);

  // Effect to stop blinking after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 30000); // 30000 milliseconds = 30 seconds

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <h1 className='text-6xl text-blue-darkest pb-8 text-center font-bold'>Blog</h1>
      <div className='flex flex-col space-y-6'>
        {posts.map((post, index) => (
          <Post
            key={index}
            content={post.content}
            id={index}
            title={post.title}
          />))}
      </div>

      {/* Mensaje promocional con animación de parpadeo usando Tailwind */}
      {/* Note: Animation property saves the blinking interval time */}
      <div 
        className={`mt-10 mx-auto max-w-4xl border-2 border-blue-dark rounded-lg p-6 shadow-md
          ${isBlinking ? 'animate-blink' : 'bg-blue-light'}`}
      >
        <h2 className='text-2xl font-bold text-center mb-3'>
          ¡Promociones de Verano Disponibles Ahora!
        </h2>
        <p className='text-lg text-center mb-4'>
          Disfruta de descuentos increíbles en toda nuestra colección de verano.
          Renueva tu armario con las últimas tendencias a precios imbatibles.
        </p>
      </div>
    </section>
  )
}

export default Blog