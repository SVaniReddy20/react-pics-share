import React from 'react';
import { Camera, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/context/PostsContext';
import PostCard from '@/components/PostCard';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const Feed: React.FC = () => {
  const { posts } = usePosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5">
      <Navbar />
      
      <main className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gradient mb-2">Your Feed</h1>
          <p className="text-muted-foreground">Discover amazing moments from the community</p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-subtle">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No posts yet
            </h2>
            <p className="mb-6 text-muted-foreground max-w-sm">
              Be the first to share a moment! Upload your first photo and start building your feed.
            </p>
            <Button asChild className="bg-gradient-instagram text-white hover:opacity-90">
              <Link to="/upload">
                <Plus className="mr-2 h-4 w-4" />
                Create your first post
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Feed;