import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { usePosts } from '@/context/PostsContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const { login, user } = usePosts();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user.isLoggedIn) {
      navigate('/feed');
    }
  }, [user.isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/feed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary to-accent/10 p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-instagram">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gradient">
            InstaPics
          </CardTitle>
          <p className="text-muted-foreground">
            Share your moments with the world
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Choose your username
              </label>
              <Input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                required
                minLength={3}
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                This will be your display name on the platform
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-instagram text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              disabled={!username.trim() || username.length < 3}
            >
              Get Started
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Welcome to InstaPics! Start sharing your favorite moments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;