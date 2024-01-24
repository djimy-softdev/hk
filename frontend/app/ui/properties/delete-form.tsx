'use client';

import { DeletePropertyBtn } from './buttons';

export default async function DeleteForm({ id }: { id: string }) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const answer = window.confirm('are you sure?');
    if (!answer) return;

    const form = document.forms[`delete-form-${id}` as any];
    if (!form) return;

    form.requestSubmit();
  };

  return (
    <div onClick={handleSubmit}>
      <DeletePropertyBtn id={id} />
    </div>
  );
}
