'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic<{ authorId: string }>(
  () => import('@/components/layout/vaultEditor/editor'),
  {
    ssr: false,
    loading: () => <p>Lade Editor...</p>,
  },
);

export default function SubmitEntryClient({ authorId }: { authorId: string }) {
  return (
    <div>
      <h1>SubmitEntryPage</h1>
      <Editor authorId={authorId || 'unknown'} />
    </div>
  );
}
