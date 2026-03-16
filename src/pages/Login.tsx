import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate login - in real app this would validate against backend
    setTimeout(() => {
      if (email && password) {
        // Store user session (dummy)
        localStorage.setItem('sgs_user', JSON.stringify({
          email,
          name: 'Admin User',
          role: 'Super Admin',
          permissions: ['all']
        }))
        navigate('/')
      } else {
        setError('Please enter your email and password')
      }
      setLoading(false)
    }, 1000)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setResetSent(true)
      setLoading(false)
    }, 1500)
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-text-dark">Reset Password</h1>
              <p className="text-gray-500 mt-2">
                {resetSent 
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to receive reset instructions'}
              </p>
            </div>

            {resetSent ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-700 text-sm">
                    Password reset link sent to <strong>{resetEmail}</strong>
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setShowForgotPassword(false)
                    setResetSent(false)
                    setResetEmail('')
                  }}
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@sgs.edu"
                      className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12" variant={loading ? 'loading' : 'primary'}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text-dark">SGS Certificate Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to manage certificates</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sgs.edu"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-11 pr-12 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full h-12" variant={loading ? 'loading' : 'primary'}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo credentials notice */}
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Demo: Enter any email and password to login
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          School of General Studies - Digital Certificate System
        </p>
      </div>
    </div>
  )
}
