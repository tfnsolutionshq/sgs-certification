import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Shield,
  Award,
  GraduationCap,
  Calendar,
  User,
  FileText,
  Clock,
  Download,
  ExternalLink,
  QrCode
} from 'lucide-react'

interface VerificationResult {
  status: 'valid' | 'invalid' | 'revoked' | 'not_found'
  certificate?: {
    id: string
    type: string
    title: string
    recipient: string
    issueDate: string
    completionDate: string
    grade?: string
    program: string
    institution: string
    signatories: { name: string; title: string }[]
  }
  verification?: {
    verifiedAt: string
    verificationCount: number
  }
  error?: string
}

// Simulated verification results
const mockVerificationResults: Record<string, VerificationResult> = {
  'abc123xyz': {
    status: 'valid',
    certificate: {
      id: 'CERT-2024-001234',
      type: 'Diploma',
      title: 'General Studies Diploma',
      recipient: 'John Doe',
      issueDate: 'July 15, 2024',
      completionDate: 'June 30, 2024',
      grade: 'Distinction',
      program: 'General Studies Program',
      institution: 'School of General Studies',
      signatories: [
        { name: 'Dr. James Wilson', title: 'Dean of Academic Affairs' },
        { name: 'Prof. Sarah Miller', title: 'Director of Studies' },
        { name: 'Dr. Michael Brown', title: 'Registrar' }
      ]
    },
    verification: {
      verifiedAt: new Date().toISOString(),
      verificationCount: 47
    }
  },
  'def456uvw': {
    status: 'valid',
    certificate: {
      id: 'CERT-2024-001235',
      type: 'Certificate of Completion',
      title: 'Leadership Workshop',
      recipient: 'Jane Smith',
      issueDate: 'May 20, 2024',
      completionDate: 'May 19, 2024',
      program: 'Professional Development',
      institution: 'School of General Studies',
      signatories: [
        { name: 'Prof. Sarah Miller', title: 'Director of Studies' }
      ]
    },
    verification: {
      verifiedAt: new Date().toISOString(),
      verificationCount: 12
    }
  },
  'revoked123': {
    status: 'revoked',
    certificate: {
      id: 'CERT-2023-000789',
      type: 'Diploma',
      title: 'General Studies Diploma',
      recipient: 'Test User',
      issueDate: 'January 15, 2023',
      completionDate: 'December 30, 2022',
      program: 'General Studies Program',
      institution: 'School of General Studies',
      signatories: []
    },
    error: 'This certificate was revoked on March 1, 2024 due to academic integrity violation.'
  }
}

export default function PublicVerification() {
  const { token } = useParams()
  const [searchInput, setSearchInput] = useState(token || '')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(
    token ? mockVerificationResults[token] || { status: 'not_found' } : null
  )

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Extract token from URL or credential ID
      const inputToken = searchInput.includes('verify/') 
        ? searchInput.split('verify/')[1]?.split('?')[0]
        : searchInput.replace('CERT-', '').toLowerCase()
      
      setResult(mockVerificationResults[inputToken] || { status: 'not_found' })
      setIsLoading(false)
    }, 1500)
  }

  const getStatusDisplay = () => {
    if (!result) return null

    switch (result.status) {
      case 'valid':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          title: 'Certificate Verified',
          subtitle: 'This is an authentic certificate issued by School of General Studies',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      case 'revoked':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-red-500" />,
          title: 'Certificate Revoked',
          subtitle: result.error || 'This certificate has been revoked',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      case 'invalid':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          title: 'Invalid Certificate',
          subtitle: 'This certificate could not be verified',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      case 'not_found':
        return {
          icon: <XCircle className="h-16 w-16 text-gray-400" />,
          title: 'Certificate Not Found',
          subtitle: 'No certificate matches the provided credential ID or verification link',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        }
    }
  }

  const statusDisplay = getStatusDisplay()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-dark">School of General Studies</h1>
          <p className="text-gray-500 mt-1">Certificate Verification Portal</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-text-dark">Verify a Certificate</h2>
              <p className="text-sm text-gray-500">Enter a credential ID or paste a verification link</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter credential ID (e.g., CERT-2024-001234) or verification URL"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchInput.trim()}
              className="h-12 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Verify
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-400 text-center">
            You can also scan the QR code on a certificate to verify it instantly
          </p>
        </div>

        {/* Verification Result */}
        {result && statusDisplay && (
          <div className={`bg-white rounded-2xl shadow-sm border ${statusDisplay.borderColor} overflow-hidden mb-8`}>
            {/* Status Banner */}
            <div className={`${statusDisplay.bgColor} p-8 text-center`}>
              <div className="flex justify-center mb-4">
                {statusDisplay.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-dark mb-2">{statusDisplay.title}</h3>
              <p className="text-sm text-gray-600">{statusDisplay.subtitle}</p>
            </div>

            {/* Certificate Details */}
            {result.certificate && result.status !== 'not_found' && (
              <div className="p-8">
                <h4 className="font-semibold text-text-dark mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Certificate Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Credential ID</p>
                    <p className="font-mono text-sm text-text-dark">{result.certificate.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Certificate Type</p>
                    <p className="text-sm text-text-dark">{result.certificate.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Recipient Name</p>
                    <p className="text-sm font-medium text-text-dark flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {result.certificate.recipient}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Program</p>
                    <p className="text-sm text-text-dark">{result.certificate.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Issuing Institution</p>
                    <p className="text-sm text-text-dark flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      {result.certificate.institution}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Issue Date</p>
                    <p className="text-sm text-text-dark flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {result.certificate.issueDate}
                    </p>
                  </div>
                  {result.certificate.grade && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Grade</p>
                      <p className="text-sm font-medium text-text-dark">
                        <span className="inline-flex px-2 py-0.5 bg-primary/10 text-primary rounded">
                          {result.certificate.grade}
                        </span>
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Completion Date</p>
                    <p className="text-sm text-text-dark">{result.certificate.completionDate}</p>
                  </div>
                </div>

                {/* Signatories */}
                {result.certificate.signatories.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-text-dark mb-4">Authorized Signatories</h4>
                    <div className="flex flex-wrap gap-4">
                      {result.certificate.signatories.map((sig, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {sig.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-dark">{sig.name}</p>
                            <p className="text-xs text-gray-500">{sig.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Info */}
                {result.verification && result.status === 'valid' && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Verified just now
                      </span>
                      <span>
                        This certificate has been verified {result.verification.verificationCount} times
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="font-semibold text-text-dark mb-6">How Certificate Verification Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-text-dark mb-2">1. Enter Credential</h4>
              <p className="text-sm text-gray-500">
                Enter the credential ID from the certificate or scan the QR code
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-text-dark mb-2">2. Instant Verification</h4>
              <p className="text-sm text-gray-500">
                Our system checks the certificate against our secure database
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium text-text-dark mb-2">3. View Results</h4>
              <p className="text-sm text-gray-500">
                See complete certificate details and authenticity status
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            For any verification issues, please contact{' '}
            <a href="mailto:verify@sgs.edu" className="text-primary hover:underline">
              verify@sgs.edu
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
