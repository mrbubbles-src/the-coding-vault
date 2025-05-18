'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/layout/vaultEditor/editor'), {
  ssr: false,
  loading: () => <p>Lade Editor...</p>,
});

export default function SubmitEntryClient() {
  return (
    <div>
      <h1>SubmitEntryPage</h1>
      <Editor />
    </div>
  );
}
