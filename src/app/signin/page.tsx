'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        console.log('Sign-in successful!', data);
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

  return (
    <div style={{ /* ... your styling ... */ }}>
      <div style={{ /* ... your styling ... */ }}>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ /* ... input styling ... */ }}
            />

          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ /* ... input styling ... */ }}
            />
          </div>
          {/* --- THIS DISPLAYS THE ERROR MESSAGE --- */}
          {error && (
            <p style={{ color: '#d9534f', marginBottom: '15px', fontSize: '14px' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{ /* ... button styling ... */ }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
