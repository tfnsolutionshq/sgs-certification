import { useState } from 'react'
import { Save, Shield, Clock, Lock, AlertTriangle, RefreshCw, Key, Globe } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    // Rate Limiting
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    rateLimitWindow: 60,
    maxRequestsPerWindow: 100,
    
    // Captcha
    enableCaptcha: true,
    captchaThreshold: 3,
    
    // Magic Links
    magicLinkExpiry: 15,
    maxMagicLinksPerHour: 3,
    
    // Verification
    verificationRateLimit: 10,
    verificationWindow: 60,
    
    // Session
    sessionTimeout: 60,
    rememberMeDuration: 30,
    
    // PDF Retention
    pdfRetentionDays: 365,
    
    // Certificate Numbers
    preventEnumeration: true,
  })

  const handleSave = () => {
    // In real app, save to backend
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <PageHeader
        title="Security Settings"
        description="Configure security policies, rate limits, and access controls"
        action={
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">Authentication Security</h3>
                <p className="text-sm text-gray-500">Login protection and lockout settings</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Before account lockout</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lockout Duration (min)
                </label>
                <input
                  type="number"
                  value={settings.lockoutDuration}
                  onChange={(e) => setSettings({ ...settings, lockoutDuration: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Account lock period</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (min)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remember Me (days)
                </label>
                <input
                  type="number"
                  value={settings.rememberMeDuration}
                  onChange={(e) => setSettings({ ...settings, rememberMeDuration: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Captcha Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">CAPTCHA Settings</h3>
                <p className="text-sm text-gray-500">Bot protection configuration</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-text-dark">Enable CAPTCHA</p>
                <p className="text-sm text-gray-500">Show CAPTCHA after failed attempts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.enableCaptcha}
                  onChange={(e) => setSettings({ ...settings, enableCaptcha: e.target.checked })}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CAPTCHA Threshold
              </label>
              <input
                type="number"
                value={settings.captchaThreshold}
                onChange={(e) => setSettings({ ...settings, captchaThreshold: parseInt(e.target.value) })}
                disabled={!settings.enableCaptcha}
                className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">Show CAPTCHA after this many failed attempts</p>
            </div>
          </CardContent>
        </Card>

        {/* Rate Limiting */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">Rate Limiting</h3>
                <p className="text-sm text-gray-500">API and request throttling</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate Limit Window (sec)
                </label>
                <input
                  type="number"
                  value={settings.rateLimitWindow}
                  onChange={(e) => setSettings({ ...settings, rateLimitWindow: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Requests/Window
                </label>
                <input
                  type="number"
                  value={settings.maxRequestsPerWindow}
                  onChange={(e) => setSettings({ ...settings, maxRequestsPerWindow: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Rate Limit
                </label>
                <input
                  type="number"
                  value={settings.verificationRateLimit}
                  onChange={(e) => setSettings({ ...settings, verificationRateLimit: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Per verification window</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Window (sec)
                </label>
                <input
                  type="number"
                  value={settings.verificationWindow}
                  onChange={(e) => setSettings({ ...settings, verificationWindow: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Magic Link Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Key className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">Magic Link Settings</h3>
                <p className="text-sm text-gray-500">Learner access link configuration</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Expiry (min)
                </label>
                <input
                  type="number"
                  value={settings.magicLinkExpiry}
                  onChange={(e) => setSettings({ ...settings, magicLinkExpiry: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Time before link expires</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Links/Hour
                </label>
                <input
                  type="number"
                  value={settings.maxMagicLinksPerHour}
                  onChange={(e) => setSettings({ ...settings, maxMagicLinksPerHour: parseInt(e.target.value) })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Per email address</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">Data Retention</h3>
                <p className="text-sm text-gray-500">PDF and data lifecycle settings</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF Retention Period (days)
              </label>
              <input
                type="number"
                value={settings.pdfRetentionDays}
                onChange={(e) => setSettings({ ...settings, pdfRetentionDays: parseInt(e.target.value) })}
                className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">0 for indefinite retention</p>
            </div>
          </CardContent>
        </Card>

        {/* Anti-Enumeration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-dark">Anti-Enumeration</h3>
                <p className="text-sm text-gray-500">Prevent brute force attacks on certificate numbers</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-text-dark">Prevent Certificate Enumeration</p>
                <p className="text-sm text-gray-500">Use non-sequential, cryptographically signed verification tokens</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.preventEnumeration}
                  onChange={(e) => setSettings({ ...settings, preventEnumeration: e.target.checked })}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
