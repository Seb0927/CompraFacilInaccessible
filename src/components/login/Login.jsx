import { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '@/contexts/UserContext'

const Login = () => {
  const { users, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const errorRef = useRef(null);
  const timerRef = useRef(null);

  {/* TO-DO: Delete later */}
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser)
      window.location.href = '/';
    } else {
      setError('Credenciales incorrectas. Para facilitar pruebas, use john@comprafacil.com y comprafacil1234');
      errorRef.current.focus();
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer to submit after 5 seconds of inactivity
    // Use a closure to capture the current value of newPassword and email
    timerRef.current = setTimeout(() => {
      handleSubmitWithValues(newPassword);
    }, 5000);
  };

  // Helper function that uses the provided password value
  const handleSubmitWithValues = (passwordValue) => {
    if (!email || !passwordValue) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const foundUser = users.find(u => u.email === email && u.password === passwordValue);

    if (foundUser) {
      setUser(foundUser)
      window.location.href = '/';
    } else {
      setError('Credenciales incorrectas. Para facilitar pruebas, use john@comprafacil.com y comprafacil1234');
      errorRef.current.focus();
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <section className='h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <form className='flex flex-col space-y-4'>
          <h1 className='text-4xl font-bold'>Iniciar sesión</h1>
          <p className='text-lg'>Ingresa tus credenciales para CompraFácil:</p>

          {error && (
            <p
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              {error}
            </p>
          )}

          <div className='flex flex-col space-y-1'>
            <label htmlFor='email' className='block'>
              Correo electrónico
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true"
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <label htmlFor='password' className='block'>
              Contraseña
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full h-9 bg-blue-dark px-1 text-white'
              aria-required="true"
            />
            <p className='text-sm italic'>La contraseña es aquella que usted utilizó en el registro</p>
          </div>

          <div className='flex flex-col space-y-2 items-center text-center'>
            <p className="bg-blue-light border-2 border-blue-medium-dark text-gray-800 p-3 rounded-lg shadow-sm my-2 text-center">
              ¡El inicio de sesión es automático, por lo que no es necesario hacer clic en el botón de inicio de sesión! Solamente espera 5 segundos después de escribir tu contraseña para que se inicie sesión automáticamente.
            </p>
            <a href='/register' className='underline hover:text-blue-darkest'>¿No tienes cuenta? Regístrate</a>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login