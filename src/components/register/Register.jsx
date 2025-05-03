import { Plus } from 'lucide-react';
import { useContext, useState, useRef } from 'react'

import { UserContext } from '@/contexts/UserContext'

const Register = () => {

  const { users, setUser, addUser } = useContext(UserContext);
  
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const errorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !confirmEmail || !password || !repeatPassword) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    // Check if emails match
    if (email !== confirmEmail) {
      setError('Los correos electrónicos no coinciden');
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
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-bold'>Registrate</h1>
          <p className='text-lg'>Ingresa las credenciales que utilizarás para iniciar sesión en CompraFácil. Debes dar click en el botón con forma de más "+" para crear tu cuenta</p>
          
          {error && (
            <p 
              ref={errorRef}
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 font-normal rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              role='alert'
              tabIndex={-1}
            >
              {error}
            </p>
          )}

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='email'>
              Correo electrónico
            </label>
            <input 
              aria-required='true' 
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              id='email'
              type='email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='confirmEmail'>
              Confirmar correo electrónico
            </label>
            <input 
              aria-required='true' 
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              id='confirmEmail'
              type='email'
              value={confirmEmail} 
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='password'>
              Contraseña
            </label>
            <input 
              aria-required='true' 
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              id='password'
              type='password'
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-sm italic'>Tu contraseña debe de contener como mínimo 8 carácteres</p>
          </div>

          <div className='flex flex-col space-y-1'>
            <label className='block' htmlFor='repeatPassword'>
              Repetir contraseña
            </label>
            <input 
              aria-required='true' 
              className='w-full h-9 bg-blue-dark px-1 text-white' 
              id='repeatPassword'
              type='password'
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <div className='pt-2 flex flex-col space-y-2 items-center'>
            <button 
              className='h-9 w-auto p-2 bg-blue-dark text-white text-lg hover:bg-blue-darkest'
              type='submit'>
              <Plus />
            </button>
            <a className='underline hover:text-blue-darkest' href='/login'>Ya tengo una cuenta</a>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register