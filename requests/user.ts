import api from '@/lib/api';
import { User, Post } from '@/types';

// TODO: add type

export const getUsers = async (): Promise<User[]> => {
  try {
    const res: any = await api.get(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/users`);

    return res;
  } catch (e) {
    console.error('Unable to get users', e);
    return [];
  }
};

export const getUserPost = async (userId: string): Promise<Post[]> => {
  try {
    const res: any = await api.get(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/users/${userId}/posts`);

    return res;
  } catch (e) {
    console.error('Unable to get users', e);
    return [];
  }
};

// TODO handle no user on the UI
export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const res: any = await api.get(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/users/${userId}`);

    return res;
  } catch (e) {
    console.error('Unable to get users', e);
    return null;
  }
};
