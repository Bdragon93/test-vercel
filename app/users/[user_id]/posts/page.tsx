import { getUserPost } from '@/requests/user';
import PostList from '@/components/post-list';
import Link from 'next/link';

export default async function UserPost({ params }: { params: { user_id: string } }) {
  const res = await getUserPost(params.user_id);

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/users/${params.user_id}`}>View Profile</Link>
      </div>
      <PostList posts={res} />
    </main>
  );
}
