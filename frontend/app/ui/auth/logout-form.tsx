'use client';
import { useEffect } from 'react';
import { LogoutBtn } from './buttons';

export default async function LogoutForm() {
  useEffect(() => {
    const form = document.forms['logout-form' as any];
    if (form) {
      form.requestSubmit();
    }
  }, []);

  return (
    <div className="hidden">
      <LogoutBtn />
    </div>
  );
}
