'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/signout', {
      method: 'POST',
    });

    // Optional: reload session-less state or redirect
    router.push('/signin');
  };

  return (
    <button onClick={handleSignOut} className='text-white font-bold flex gap-2'>
      <LogOut />
      Sign Out
    </button>
  );
}

