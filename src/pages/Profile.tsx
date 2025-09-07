import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Grid, Camera, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePosts } from '@/context/PostsContext';
import Navbar from '@/components/Navbar';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { posts, user } = usePosts();

  const userPosts = posts.filter(post => post.username === username);
  const isOwnProfile = user.username === username;
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5">
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-card border-border/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-instagram shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">@{username}</h1>
                  <p className="text-muted-foreground">
                    {isOwnProfile ? 'Your profile' : `${username}'s profile`}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-center space-x-8 sm:justify-start">
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{userPosts.length}</p>
                    <p className="text-sm text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{totalLikes}</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">0</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>

                {isOwnProfile && (
                  <Button asChild className="bg-gradient-instagram text-white hover:opacity-90">
                    <Link to="/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      Add new post
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Grid */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Grid className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Posts</h2>
          </div>

          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group cursor-pointer overflow-hidden bg-gradient-card border-border/50 shadow-lg transition-transform hover:scale-105"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="aspect-square w-full object-cover transition-opacity group-hover:opacity-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="text-center text-white">
                          <p className="text-lg font-bold">{post.likes} likes</p>
                          <p className="text-sm">{post.caption.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-subtle">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </h3>
              <p className="mb-6 max-w-sm text-muted-foreground">
                {isOwnProfile 
                  ? "Share your first moment and start building your collection!"
                  : `${username} hasn't shared any posts yet.`
                }
              </p>
              {isOwnProfile && (
                <Button asChild className="bg-gradient-instagram text-white hover:opacity-90">
                  <Link to="/upload">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first post
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;