import React, { createContext, useContext, useState, useEffect } from 'react';
import demoSunset from '@/assets/demo-sunset.jpg';
import demoPuppy from '@/assets/demo-puppy.jpg';
import demoCoffee from '@/assets/demo-coffee.jpg';

export interface Post {
  id: string;
  username: string;
  image: string;
  caption: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

interface PostsContextType {
  posts: Post[];
  user: User;
  addPost: (image: string, caption: string) => void;
  likePost: (postId: string) => void;
  login: (username: string) => void;
  logout: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    username: 'naturelovers',
    image: demoSunset,
    caption: 'Beautiful sunset at the beach tonight! 🌅 Nothing beats golden hour by the ocean.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes: 24,
    likedBy: []
  },
  {
    id: '2',
    username: 'puppylife',
    image: demoPuppy,
    caption: 'This little guy made my day! 🐕 Playing fetch in the park never gets old.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    likes: 89,
    likedBy: []
  },
  {
    id: '3',
    username: 'coffeetime',
    image: demoCoffee,
    caption: 'Perfect latte art to start my morning ☕️ Who else needs their daily caffeine fix?',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    likes: 45,
    likedBy: []
  }
];

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('instagramPosts');
    const savedUser = localStorage.getItem('instagramUser');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(DEMO_POSTS);
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('instagramPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('instagramUser', JSON.stringify(user));
  }, [user]);

  const addPost = (image: string, caption: string) => {
    if (!user.isLoggedIn) return;

    const newPost: Post = {
      id: Date.now().toString(),
      username: user.username,
      image,
      caption,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    if (!user.isLoggedIn) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(user.username);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(u => u !== user.username)
            : [...post.likedBy, user.username]
        };
      }
      return post;
    }));
  };

  const login = (username: string) => {
    setUser({ username: username.trim(), isLoggedIn: true });
  };

  const logout = () => {
    setUser({ username: '', isLoggedIn: false });
  };

  return (
    <PostsContext.Provider value={{
      posts,
      user,
      addPost,
      likePost,
      login,
      logout
    }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};