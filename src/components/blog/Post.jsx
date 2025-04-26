import React from 'react'

const Post = (props) => {

  const { id, title, content } = props;

  // Function to get the substring without cutting off words
  const getSubstring = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const trimmedText = text.substring(0, maxLength);
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');
    return trimmedText.substring(0, lastSpaceIndex) + '...';
  };

  return (
    <article className='min-h-auto h-auto w-full px-10 py-6 bg-blue-medium-light'>
      <h2 className='text-2xl font-bold mb-2'>{title}</h2>
      <p className='text-lg mb-4'>{getSubstring(content, 150)}</p>
      <a
        title={'Leer más sobre ' + title}
        href={'/blog/post' + (id + 1)}
        className='flex items-center justify-center h-9 w-28 bg-blue-dark text-white text-xl mt-3 hover:bg-blue-darkest'>Leer más</a>
    </article>
  )
}

export default Post