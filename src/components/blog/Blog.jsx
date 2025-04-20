import Post from './Post'
import posts from '@/utils/posts'

const Blog = () => {
  return (
    <section>
      <h1 className='text-6xl text-blue-darkest pb-8 text-center font-bold'>Blog</h1>
      <div className='flex flex-col space-y-6'>
        {posts.map((post, index) => (
          <Post
            key={index}
            id={index}
            title={post.title}
            content={post.content}
          />))}
      </div>
    </section>
  )
}

export default Blog