import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getAuth } from '../utils/authHelper';

export const useAuth = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    getAuth(token)
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(error => {
        console.error('Failed to rehydrate user', error);
      })
      .finally(() => setLoading(false));
  }, [setUser]);

  return { user, loading };
};
