'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post, PostContextType } from '@/types/post';

const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: Post[];
}

export const PostProvider: React.FC<PostProviderProps> = ({ children, initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = useCallback((newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  return <PostContext.Provider value={{ posts, addPost }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
