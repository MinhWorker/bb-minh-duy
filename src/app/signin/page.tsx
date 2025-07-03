'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to hold error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize Next.js router

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission and page reload
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse the response body

      if (response.ok) {
        // --- THIS IS THE SUCCESS REDIRECTION ---
        router.push('/admin'); // Redirect to the admin dashboard
      } else {
        // --- THIS IS THE ERROR MESSAGE DISPLAY ---
        setError(data.message || 'An unknown error occurred during sign-in.');
        console.error('Sign-in failed:', data.message);
      }
    } catch (err) {
      // Network or other unexpected errors
      console.error('An error occurred:', err);
      setError('Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleTogglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-green-50'>
      <div className="border border-primary rounded-md p-7 shadow-lg shadow-primary/50 min-w-1/3 sm:mx-4 bg-white">
        <h1 className="text-primary font-bold text-2xl mb-6">ĐĂNG NHẬP</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" className='block text-primary font-light text-sm ml-2'>Tên đăng nhập <b className="text-danger">*</b></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập của bạn"
              // required
              className='focus:outline-primary border border-accent rounded-sm p-2 placeholder:text-sm placeholder:text-accent w-full mt-1 text-secondary'
            />

          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" className='block text-primary font-light text-sm ml-2'>Mật khẩu <b className='text-danger'>*</b></label>
            <div className='flex items-center border border-accent rounded-sm group focus-within:border-primary focus-within:border-2'>
              <input
                type={isPasswordShown ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Nhập mật khẩu của bạn"
                onChange={(e) => setPassword(e.target.value)}
                // required
                className='p-2 placeholder:text-sm placeholder:text-accent w-full mt-1 text-secondary flex-1 focus:outline-none'
              />
              <span
                onClick={handleTogglePassword}
                className='text-accent mr-2'
              >{isPasswordShown ? <EyeOff /> : <Eye />}</span>
            </div>
          </div>
          {/* --- THIS DISPLAYS THE ERROR MESSAGE --- */}
          {error && (
            <p style={{ color: '#d9534f', marginBottom: '15px', fontSize: '14px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full text-center text-white rounded-sm py-3 text-sm font-semibold ${loading ? "bg-secondary" : "bg-primary"}`}>
            {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
          </button>
        </form>
      </div>
    </div >
  );
}
