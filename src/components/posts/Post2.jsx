import React from 'react'
import posts from '@/utils/posts'

const Post2 = () => {
  const post = posts[1]
  const audioUrl = 'https://res.cloudinary.com/dao5kgzkm/video/upload/v1741316071/audio/interview.mp3'

  // Split the content by newline characters to create an array of paragraphs
  const paragraphs = post.content.split('\n').filter(para => para.trim() !== '')

  // Interview transcript taken from the subtitles
  const transcript = `Entrevistador: Hoy estamos con Mario, nuestro director ejecutivo para conocer cómo CompraFácil ha logrado acercar la moda todos los colombianos.

  Entrevistador: Mario, ¿Cuál ha sido la visión que ha guiado este crecimiento?

  Mario: En CompraFácil trabajamos cada día para acercar las mejores tendencias globales todos los colombianos, siempre a precios accesibles y sin perder nuestra esencia local.

  Mario: Queremos que cada cliente viva una experiencia de compra fácil, cómoda y emocionante, ya sea en nuestras tiendas o en nuestra plataforma digital.`

  // Split transcript by newlines for better formatting
  const transcriptParagraphs = transcript.split('\n\n').filter(para => para.trim() !== '')

  return (
    <section>
      <h1 className='text-6xl text-blue-darkest pb-8 text-center font-bold'>Blog</h1>
      <article className='h-auto w-5/6 mx-auto px-10 py-6 bg-blue-medium-light'>
        <h2 className='text-4xl font-bold mb-3'>{post.title}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className='text-lg mb-4'>
            {paragraph}
          </p>
        ))}

        {/* Audio player */}
        <h3 className="text-3xl font-semibold mb-4">Entrevista</h3>
        <div className="mx-auto my-8 w-full md:w-4/6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <audio
              className="w-full"
              controls
              preload="metadata"
            >
              <source src={audioUrl} type="audio/mpeg" />
              Su navegador no soporta la reproducción de audio.
            </audio>
            <p className="mt-3 text-sm text-gray-600">
              Entrevista con el equipo de CompraFácil sobre las nuevas tendencias de moda.
            </p>
          </div>
        </div>

        {/* Transcripción de la entrevista */}
        <h4 className='text-2xl font-semibold mb-4'>Transcripción</h4>
        {transcriptParagraphs.map((paragraph, index) => (
          <p key={index} className='text-base mb-4'>
            {paragraph}
          </p>
        ))}

      </article>
    </section>
  )
}

export default Post2