import Editor from '@/components/layout/vaultEditor/editor';
import { multiRoleGuard } from '@/lib/auth';

const SubmitEntryPage = async () => {
  await multiRoleGuard(['SUPERADMIN', 'MODERATOR', 'GUEST']);

  return (
    <div>
      <h1>SubmitEntryPage</h1>
      <Editor />
    </div>
  );
};

export default SubmitEntryPage;
