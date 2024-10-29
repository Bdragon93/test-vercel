import { getUser } from '@/requests/user';
import { UserDetail } from '@/components/user-detail';
export default async function UserProfile({ params }: { params: { user_id: string } }) {
  const user = await getUser(params.user_id);

  if (!user) {
    return null;
  }

  // TODO: use UserItem component
  return <UserDetail user={user} />;
}
