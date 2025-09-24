import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 10000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50'
      role='alert'
    >
      {message}
    </div>
  );
};

export default Notification;