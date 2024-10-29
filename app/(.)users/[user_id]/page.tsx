'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { UserDetail } from '@/components/user-detail';

export default function InterceptedUserModal() {
  const router = useRouter();
  const { user_id } = useParams();
  const { users } = useUserContext();
  const user = users.find((u) => u.id.toString() === user_id);

  if (!user) {
    return notFound();
  }

  return (
    <Dialog open onOpenChange={() => router.push(`/users/${user_id}/posts`)}>
      <DialogContent>
        <DialogHeader />
        <UserDetail user={user} />
      </DialogContent>
    </Dialog>
  );
}
