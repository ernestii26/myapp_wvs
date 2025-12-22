import { API_BASE_URL } from '@/constants/config';
import { useEffect, useState } from 'react';

export interface PostData {
  id: string;
  avatar: any;
  name: string;
  handle: string;
  time: string;
  content: string;
  images?: string[];
  commentsCount: number;
  TeacherName?: string;
}

const API_URL = `${API_BASE_URL}/posts`;

export const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (data: { category: string; content: string; images: string[] }) => {
    try {
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('content', data.content);

      data.images.forEach((imageUri, index) => {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        
        // @ts-ignore: React Native FormData expects an object with uri, name, type
        formData.append('images', {
          uri: imageUri,
          name: filename || `image_${index}.jpg`,
          type,
        });
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create post: ${errorText}`);
      }
      
      const result = await response.json();
      setPosts(prev => [result.data, ...prev]);
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return {
    posts,
    loading,
    createPost,
    fetchPosts
  };
};
