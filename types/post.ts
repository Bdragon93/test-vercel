export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}
