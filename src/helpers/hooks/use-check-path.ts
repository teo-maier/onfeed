import { useState, useEffect } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

const useCheckPath = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();
  const match = useMatch("*");

  useEffect(() => {
    const handleLeave = (event: any) => {
      if (!event.defaultPrevented) {
        setIsLeaving(true);
      }
    };

    window.addEventListener('beforeunload', handleLeave);

    return () => {
      window.removeEventListener('beforeunload', handleLeave);
      setIsLeaving(false);
    };
  }, []);

  useEffect(() => {
    setIsLeaving(false);
  }, [match]);

  const handleLeave = () => {
    setIsLeaving(true);
    navigate(''); // replace with your desired navigation destination
  };

  return [isLeaving, handleLeave];
}

export { useCheckPath };
