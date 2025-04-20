import React from 'react'

const Assistance = () => {
  return (
    <div className='flex justify-center w-full'>
      <section className='h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <h1 className='text-4xl font-bold mb-5'>Preguntas frecuentes</h1>

        <h2 className='text-2xl font-bold'>No puedo añadir mi ciudad en direcciones</h2>
        <p className='text-lg mb-5'>Esto es debido a que CompraFácil se encuentra ofertando sus servicios actualmente en la ciudad de Cali, por lo que solamente nos encontramos presentando servicios de entrega en esta. Esperamos expandir nuestra franquicia mas adelante.</p>

        <h2 className='text-2xl font-bold'>No puedo añadir mi CCV en mi tarjeta de crédito</h2>
        <p className='text-lg mb-5'>Por seguridad, deseamos protegerte de hacer esto en nuestra plataforma ya que no nos aseguramos de vulnerabilidades de la plataforma de aprendizaje 😊.</p>

        <h2 className='text-2xl font-bold'>¿Puedo utilizar mi tarjeta de débito en la plataforma?</h2>
        <p className='text-lg mb-5'>Esto depende del proveedor bancario que estés utilizando. No tenemos la seguridad de que tu tarjeta de débito funcione en nuestra plataforma, pero puedes intentarlo.</p>

        <p className='w-full text-center italic mt-12'>
          Si necesitas asistencia, contáctanos al siguiente número: {' '}
          <a
            href="tel:+57302444999"
            className="text-blue-dark hover:text-blue-darkest underline"
            aria-label="Llamar al número de teléfono +57 302 444 9999"
          >
            +57 302 444 9999
          </a>
        </p>
      </section>
    </div>
  )
}

export default Assistance