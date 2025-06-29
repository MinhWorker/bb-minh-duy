'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslate } from 'react-admin';

export function SignOutButton() {
  const router = useRouter();
  const translate = useTranslate();

  const handleSignOut = async () => {
    await fetch('/api/signout', {
      method: 'POST',
    });

    router.push('/signin');
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white flex gap-2 items-center"
    >
      <LogOut />
      {translate('ra.auth.logout')}
    </button>
  );
}

