
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
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
      router.push('/citizen-dashboard');
      alert('Verification Successful!');
    }, 1500);
  };

  return (
    <>
      <header className="bg-primary text-primary-foreground pt-2 px-2 pb-2 mb-2">
        <div className="container mx-auto flex items-center justify-start h-full">
          <div className="flex items-center gap-2">
            <div>
              <Image src="/logo.svg" alt="Skill Intel Engine Logo" width={58} height={58} />
            </div>
            <h1 className="text-xl font-semibold">Skill Intel Engine</h1>
          </div>
        </div>
      </header>
      <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="relative w-full h-full rounded-lg grid lg:grid-cols-2">
              {/* Left Panel */}
              <div className="relative hidden lg:flex flex-col justify-between p-12 text-white bg-primary rounded-l-lg">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary to-teal-700 opacity-90 rounded-l-lg"></div>
                  <div 
                      className="absolute inset-0 bg-cover bg-center rounded-l-lg"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop')", opacity: 0.1 }}
                  ></div>

                  <div className="relative z-10">
                      <div className="flex items-center gap-3 text-2xl font-bold">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-puzzle"><path d="M19.435 7.348c.43-.43.43-1.129 0-1.559a1.104 1.104 0 0 0-1.559 0l-2.071 2.071a1.104 1.104 0 0 0 0 1.559c.43.43 1.129.43 1.559 0l2.071-2.07Z"/><path d="M12.001 12.001c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559Z"/><path d="M12.001 12.001c-.43-.43-1.129-.43-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559Z"/><path d="M4.566 7.348a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.071 2.071a1.104 1.104 0 0 0 0 1.559c.43.43 1.129.43 1.559 0l2.071-2.07Z"/><path d="M16.653 11.217c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559Z"/><path d="M16.653 11.217c-.43.43-1.129.43-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559Z"/><path d="m2.495 11.217.924.924a1.104 1.104 0 0 0 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0L3.419 10.59a1.104 1.104 0 0 0 0 1.559Z"/><path d="M7.348 16.652c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559Z"/><path d="M7.348 16.652c-.43.43-1.129.43-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559Z"/><path d="M12.001 12.001c.43.43 1.129.43 1.559 0l2.07 2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07-2.07a1.104 1.104 0 0 0 0 1.559Z"/><path d="M12.001 12.001c.43-.43 1.129-.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559Z"/><path d="M19.435 16.652c.43.43 1.129.43 1.559 0l2.07-2.07a1.104 1.104 0 0 0 0-1.559 1.104 1.104 0 0 0-1.559 0l-2.07 2.07a1.104 1.104 0 0 0 0 1.559Z"/></svg>
                          Skill Intel Engine
                      </div>
                      <p className="mt-4 text-base opacity-90">
                          Join millions of Indians in building a stronger, more skilled nation. Your profile helps us create better policies for a brighter future.
                      </p>
                  </div>
                  <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Secure and Confidential</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Personalized Career Insights</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Contribute to National Growth</span>
                      </div>
                  </div>
              </div>

              {/* Right Panel */}
              <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-card rounded-r-lg">
                  <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
                      <CardHeader className="items-center text-center">
                      <img src="/Aadhar-logo.svg" alt="" width={138} height={88}/>
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
          </div>
      </div>
    </>
  );
}
