import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { usePosts } from '@/context/PostsContext';

const TwoFactorAuth: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = usePosts();

  const { username, password } = location.state || {};

  // Redirect if no username/password in state
  React.useEffect(() => {
    if (!username || !password) {
      navigate('/login');
    }
  }, [username, password, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError('');

    // Simulate OTP verification
    setTimeout(() => {
      // Simulate success/failure (90% success rate)
      const isValid = Math.random() > 0.1;
      
      if (isValid) {
        login(username);
        navigate('/feed');
      } else {
        setError('Invalid verification code. Please try again.');
        setOtp('');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setError('');
    // Simulate resending code
    alert('New verification code sent to your authenticator app!');
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary to-accent/10 p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-instagram">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gradient">
            Two-Factor Authentication
          </CardTitle>
          <p className="text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <div className="text-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-instagram text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </Button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isLoading}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Resend code
            </Button>

            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isLoading}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorAuth;