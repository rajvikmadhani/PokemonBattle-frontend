import { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import { BACKEND_URL } from '../utils/databaseAPI';

export const useAuth = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${BACKEND_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to authenticate');
        }
        return res.json();
      })
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
