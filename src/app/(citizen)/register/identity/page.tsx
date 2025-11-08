'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function IdentityVerificationPage() {
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
      alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
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
        <CardHeader>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify & Proceed'}
              </Button>
              <Button variant="link" className="w-full" onClick={() => setStep('aadhaar')}>
                Change Aadhaar Number
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
