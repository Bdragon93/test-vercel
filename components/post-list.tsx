import { Post } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
