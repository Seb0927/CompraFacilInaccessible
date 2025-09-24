const Container = (props) => {
  const { children } = props

  return (
    <div className='flex justify-center w-full'>
      <section className='flex flex-col space-y-4 h-auto w-full md:w-9/10 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        {children}
      </section>
    </div>
  )
}

export default Container