import { getUserPosts } from '@/requests/user';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUser } from '@/requests/user';
import PostList from '@/components/post-list';
import NewPostForm from '@/components/new-post-form';
import { PostProvider } from '@/context/PostContext';
import { ExternalLink } from 'lucide-react';

export async function generateMetadata({ params }: { params: { user_id: string } }) {
  const user = await getUser(params.user_id);
  if (!user) {
    return {};
  }
  return { title: `Posts by ${user.name}` };
}

export default async function UserPosts({ params }: { params: { user_id: string } }) {
  const [user, posts] = await Promise.all([getUser(params.user_id), getUserPosts(params.user_id)]);

  if (!user) {
    return notFound();
  }

  return (
    <PostProvider initialPosts={posts}>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold mr-2">Posts by {user.name}</h1>
          <Link href={`/users/${user.id}`}>
            <ExternalLink />
          </Link>
        </div>
        <NewPostForm userId={user.id} />
        <PostList />
      </div>
    </PostProvider>
  );
}
