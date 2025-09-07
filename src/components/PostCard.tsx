import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePosts, type Post } from '@/context/PostsContext';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, user } = usePosts();
  const isLiked = post.likedBy.includes(user.username);

  const handleLike = () => {
    likePost(post.id);
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-card border-border/50 shadow-lg">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Link 
            to={`/profile/${post.username}`}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-instagram">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">@{post.username}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
            </div>
          </Link>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src={post.image}
            alt={post.caption}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-0 ${isLiked ? 'text-like-heart' : 'text-muted-foreground'} hover:text-like-heart transition-colors`}
            >
              <Heart 
                className={`h-6 w-6 ${isLiked ? 'fill-current like-animation' : ''}`} 
              />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-muted-foreground hover:text-foreground">
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Likes count */}
        <div className="px-4 pb-2">
          <p className="text-sm font-semibold text-foreground">
            {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </p>
        </div>

        {/* Caption */}
        <div className="px-4 pb-4">
          <p className="text-sm text-foreground">
            <Link 
              to={`/profile/${post.username}`}
              className="font-semibold hover:opacity-80"
            >
              @{post.username}
            </Link>
            <span className="ml-2">{post.caption}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;