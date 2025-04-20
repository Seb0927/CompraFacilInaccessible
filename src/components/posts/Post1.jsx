import React from 'react'
import posts from '@/utils/posts'

const Post1 = () => {
  const post = posts[0]
  const videoUrl = 'https://res.cloudinary.com/dao5kgzkm/video/upload/v1741316071/Videos/presentation.mp4'
  const subtitlesUrl = '/src/assets/subtitles/presentation.vtt'
  const audioDescriptionUrl = '/src/assets/descriptions/presentation.vtt'

  // Split the content by newline characters to create an array of paragraphs
  const paragraphs = post.content.split('\n').filter(para => para.trim() !== '')

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

        {/* Video with subtitles */}
        <div className="mx-auto my-8 relative w-full md:w-4/6 aspect-video">
          <video
            className="w-full rounded-lg shadow-lg"
            controls
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Subtitles track */}
            <track
              src={subtitlesUrl}
              kind="subtitles"
              srcLang="es"
              label="Español"
              default
            />
            {/* Audio descriptions track */}
            <track
              src={audioDescriptionUrl}
              kind="descriptions"
              srcLang="es"
              label="Descripción de audio"
            />
            Su navegador no soporta el elemento de video.
          </video>
        </div>
      </article>
    </section>
  )
}

export default Post1