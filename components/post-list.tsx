'use client';

import { usePostContext } from '@/context/PostContext';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PostList() {
  const { posts } = usePostContext();
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
