import { useState, useEffect } from 'react'

const Counter = () => {
  // Initial time: 3 minutes in seconds (180 seconds)
  const initialTime = 3 * 60
  // Maximum time: 3 hours in seconds (10800 seconds)
  const maxTime = 3 * 60 * 60
  // Extension time: 30 minutes in seconds (1800 seconds)
  const extensionTime = 30 * 60
  
  const [timeLeft, setTimeLeft] = useState(initialTime)
  
  // Format time as mm:ss or hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Add 30 minutes to timer (up to max 3 hours)
  const extendTime = () => {
    setTimeLeft(prevTime => {
      const newTime = prevTime + extensionTime
      return newTime <= maxTime ? newTime : maxTime
    })
  }
  
  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // Redirect to home page when timer reaches zero
      window.location.href = '/'
      return
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)
    
    // Cleanup timer on unmount
    return () => clearInterval(timer)
  }, [timeLeft])
  
  return (
    <div className="p-4 rounded-lg shadow-md bg-blue-light text-center">
      <h2 className="text-lg font-semibold mb-2">Tiempo restante para completar la compra</h2>
      <div className="text-3xl font-bold mb-3">{formatTime(timeLeft)}</div>
      <button
        onClick={extendTime}
        className="px-4 py-2 bg-blue-dark text-white rounded hover:bg-blue-darkest transition-colors"
        disabled={timeLeft + extensionTime > maxTime}
      >
        Añadir 30 minutos
      </button>
      <p className="text-sm text-gray-600 mt-2">
        {timeLeft + extensionTime > maxTime 
          ? "Has alcanzado el tiempo máximo (3 horas)" 
          : "Puedes extender hasta un máximo de 3 horas"}
      </p>
    </div>
  )
}

export default Counter