import SubmitEntryClient from '@/components/layout/vaultEditor/submit-entry-client';
import { getCurrentUser, multiRoleGuard } from '@/lib/auth';

const SubmitEntryPage = async () => {
  await multiRoleGuard(['SUPERADMIN', 'MODERATOR', 'GUEST']);

  const result = await getCurrentUser();
  const authorId = 'error' in result ? 'unknown' : result.user.id;

  return <SubmitEntryClient authorId={authorId} />;
};

export default SubmitEntryPage;
