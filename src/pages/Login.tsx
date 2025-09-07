import React, { useState, useEffect } from 'react';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { usePosts } from '@/context/PostsContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (username.trim() && password.trim()) {
      // Simulate checking if user has 2FA enabled
      // In a real app, this would be determined by backend response
      const has2FA = Math.random() > 0.5; // Simulate 50% chance of 2FA
      
      if (has2FA) {
        navigate('/login/2fa', { state: { username, password } });
      } else {
        login(username);
        navigate('/feed');
      }
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
                Username
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-instagram text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              disabled={!username.trim() || !password.trim() || username.length < 3 || password.length < 6}
            >
              Sign In
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