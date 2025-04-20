import { useContext, useState, useRef } from 'react'
import { UserContext } from '@/contexts/UserContext'

const Register = () => {

  const { users, setUser } = useContext(UserContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !repeatPassword) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    // Check if passwords match
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    // Password length validation
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingrese un correo electrónico válido');
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      setError('Este correo electrónico ya está registrado');
      return;
    }
    
    // Add new user using addUser from context
    const { addUser } = useContext(UserContext);
    const result = addUser({ email, password });
    
    if (result.success) {
      // Auto-login the user
      setUser({ email });
      
      // Redirect to home page
      window.location.href = '/';
    } else {
      setError(result.message);
      errorRef.current.focus();
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <section className='h-auto w-full md:w-4/5 lg:w-8/12 py-8 px-8 bg-blue-medium-light'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <h1 className='text-4xl font-bold'>Registrate</h1>
          <span className='text-lg'>Ingresa las credenciales que utilizarás para iniciar sesión en CompraFácil</span>
          
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
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              aria-required="true"
            />
            <p className='text-sm italic'>Tu contraseña debe de contener como mínimo 8 carácteres</p>
          </div>

          <div className='flex flex-col space-y-1'>
            <label htmlFor='repeatPassword' className='block'>
              Repetir contraseña
            </label>
            <input 
              id='repeatPassword' 
              type='password' 
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              aria-required="true"
            />
          </div>

          <div className='pt-2 flex flex-col space-y-2 items-center'>
            <button 
              type="submit"
              className='h-9 w-32 bg-blue-dark text-white text-lg hover:bg-blue-darkest'>
              Registrarme
            </button>
            <a href='/login' className='underline hover:text-blue-darkest'>Ya tengo una cuenta</a>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register