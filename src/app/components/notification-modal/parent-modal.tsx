import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuid } from 'uuid';

const appRoot = document.getElementById('root');

interface ParentModalProps {
  children: React.ReactNode;
}

const ParentModal: React.FC<ParentModalProps> = ({ children }) => {
  const id = useMemo(() => uuid(), []);

  const [element, setElement] = useState(document.getElementById(id));

  useEffect(() => {
    if (!element) {
      const newElement = document.createElement('div');
      newElement.setAttribute('id', id);
      appRoot?.appendChild(newElement);
      setElement(newElement);
    }
    return () => {
      if (element) {
        appRoot?.removeChild(element);
      }
    };
  }, []);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
};

export { ParentModal };
