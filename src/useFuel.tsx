import { useState, useEffect } from 'react';

const globalWindow = window;

export function useFuel() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [fuel, setFuel] = useState(globalWindow.fuel);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (globalWindow.fuel) {
        setFuel(globalWindow.fuel);
      } else {
        setError('fuel not detected on the window!');
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return [fuel, error, isLoading] as const;
}
