'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../_featured/header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          router.push('/'); // Redirect to home page if not authenticated
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        setUser(null);
        router.push('/'); // Redirect to home page
      } else {
        toast.error('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="p-8 text-center">
        {user ? (
          <>
            <h2 className="text-xl font-bold mb-2">{user.email}</h2>
            <p className="text-gray-700">
              Not <span className="font-semibold">{user.email}</span>?{' '}
              <span
                onClick={handleLogout}
                className="text-blue-500 cursor-pointer"
              >
                Sign out
              </span>
            </p>

            <h3 className="mt-6 text-lg font-semibold">RECENT ORDERS</h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet.
            </p>

            <h3 className="text-lg font-semibold">BILLING ADDRESS</h3>
            <p className="text-gray-600 mb-2">
              <span className="underline cursor-pointer">Edit</span>
            </p>

            <p className="text-gray-600">United States</p>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
}
