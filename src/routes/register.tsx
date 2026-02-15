import { useState } from 'react'
import { Link, useNavigate, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image,
  Coins,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
    role: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    return { minLength, hasUppercase, hasLowercase, hasNumber }
  }

  const passwordValidation = validatePassword(formData.password)
  const isPasswordValid = Object.values(passwordValidation).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!isPasswordValid) {
      toast.error('Password does not meet the requirements')
      return
    }

    setIsLoading(true)

    // Simulate registration - will be replaced with real auth
    setTimeout(() => {
      const bonusCoins = formData.role === 'buyer' ? 50 : 10
      toast.success('Registration Successfull', {
        description: `Welcome to TaskFlow! You received ${bonusCoins} bonus coins.`,
      })
      setIsLoading(false)
      navigate({ to: '/dashboard' })
    }, 1500)
  }

  const handleGoogleSignIn = () => {
    toast.info('Google Sign-In', {
      description: 'Google authentication will be available soon',
    })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 py-12">
      {/* Background Elements */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-100 h-100 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-border/50">
          <CardHeader className="text-center pb-4">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
            </Link>
            <CardTitle className="font-display text-2xl">
              Create Account
            </CardTitle>
            <CardDescription>
              Join TaskFlow and start earning today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">Profile Picture URL (optional)</Label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="photoUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoUrl}
                    onChange={(e) => handleChange('photoUrl', e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password requirements */}
                {formData.password && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { key: 'minLength', label: '8+ characters' },
                      { key: 'hasUppercase', label: 'Uppercase' },
                      { key: 'hasLowercase', label: 'Lowercase' },
                      { key: 'hasNumber', label: 'Number' },
                    ].map((req) => (
                      <div
                        key={req.key}
                        className={`flex items-center gap-1 text-xs ${
                          passwordValidation[
                            req.key as keyof typeof passwordValidation
                          ]
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Select Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleChange('role', value)}
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">
                      <div className="flex items-center gap-2">
                        <span>👷 Worker</span>
                        <span className="text-xs text-muted-foreground">
                          (+10 coins)
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="buyer">
                      <div className="flex items-center gap-2">
                        <span>💼 Buyer</span>
                        <span className="text-xs text-muted-foreground">
                          (+50 coins)
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Workers complete tasks to earn. Buyers post tasks for workers.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 btn-primary-gradient"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
