
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Function to generate a random alphanumeric string for captcha
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

export default function IdentityVerificationPage() {
  const [aadhaar, setAadhaar] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
      alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (captcha.toLowerCase() !== generatedCaptcha.toLowerCase()) {
      alert('Invalid CAPTCHA. Please try again.');
      setGeneratedCaptcha(generateCaptcha());
      setCaptcha('');
      return;
    }
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30); // Start 30-second timer
    }, 1500);
  };

  const handleResendOtp = () => {
    setLoading(true);
    // Simulate API call to resend OTP
    setTimeout(() => {
        setLoading(false);
        setResendTimer(30); // Restart 30-second timer
        alert('A new OTP has been sent.');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }
    setLoading(true);
    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      // On success, redirect to the next step
      // router.push('/register/profile-details');
      alert('Verification Successful! (Next step not implemented yet)');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Image src="/aadhaar-logo.svg" alt="Aadhaar Logo" width={120} height={40} />
          <CardTitle>Start Your Skill Profile</CardTitle>
          <CardDescription>
            Let's begin by verifying your identity with Aadhaar for a fast and secure setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'aadhaar' && (
            <form onSubmit={handleAadhaarSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  placeholder="Enter 12-digit Aadhaar"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha">Enter CAPTCHA</Label>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                         <Input
                            id="captcha"
                            type="text"
                            placeholder="Enter the text"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-md select-none">
                        <span className="text-lg font-bold tracking-widest" style={{fontFamily: 'monospace', textDecoration: 'line-through'}}>{generatedCaptcha}</span>
                    </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground text-center pt-2">
                  An OTP has been sent to the mobile number linked with your Aadhaar.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading && resendTimer > 0}>
                {loading && resendTimer > 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify & Proceed'}
              </Button>
              <div className="flex justify-center items-center gap-2 text-sm">
                <Button variant="link" onClick={handleResendOtp} disabled={resendTimer > 0 || loading}>
                  Resend OTP
                </Button>
                {resendTimer > 0 && <span className="text-muted-foreground">in {resendTimer}s</span>}
              </div>
              <Button variant="link" className="w-full" onClick={() => {
                  setStep('aadhaar');
                  setGeneratedCaptcha(generateCaptcha());
                  setCaptcha('');
              }}>
                Change Aadhaar Number
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
