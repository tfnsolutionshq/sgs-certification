import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Award, 
  Download, 
  Share2, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Phone,
  HelpCircle,
  ExternalLink,
  Copy,
  Linkedin,
  FileText,
  GraduationCap,
  Calendar,
  Send
} from 'lucide-react'

interface Certificate {
  id: string
  type: string
  program: string
  issueDate: string
  status: 'available' | 'pending' | 'processing'
  verificationUrl: string
  thumbnailUrl?: string
}

// Simulated learner data (in real app, this would come from auth/session)
const learnerData = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  cohort: 'Batch 2024-A',
  program: 'General Studies Diploma',
  enrollmentDate: '2024-01-15',
  completionDate: '2024-06-30',
  certificates: [
    {
      id: 'CERT-2024-001234',
      type: 'Diploma',
      program: 'General Studies Diploma',
      issueDate: '2024-07-15',
      status: 'available' as const,
      verificationUrl: '/verify/abc123xyz'
    },
    {
      id: 'CERT-2024-001235',
      type: 'Certificate of Completion',
      program: 'Leadership Workshop',
      issueDate: '2024-05-20',
      status: 'available' as const,
      verificationUrl: '/verify/def456uvw'
    },
    {
      id: 'CERT-2024-001236',
      type: 'Academic Transcript',
      program: 'General Studies',
      issueDate: '',
      status: 'processing' as const,
      verificationUrl: ''
    }
  ] as Certificate[]
}

export default function LearnerPortal() {
  const [showMagicLinkForm, setShowMagicLinkForm] = useState(false)
  const [magicLinkEmail, setMagicLinkEmail] = useState('')
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [showSupportForm, setShowSupportForm] = useState(false)
  const [supportForm, setSupportForm] = useState({ subject: '', category: '', message: '' })
  const [supportSubmitted, setSupportSubmitted] = useState(false)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  // Simulated authenticated state
  const [isAuthenticated] = useState(true)

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending magic link
    setTimeout(() => {
      setMagicLinkSent(true)
    }, 1000)
  }

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submitting support request
    setTimeout(() => {
      setSupportSubmitted(true)
    }, 1000)
  }

  const copyToClipboard = (url: string, certId: string) => {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopiedLink(certId)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const shareToLinkedIn = (cert: Certificate) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + cert.verificationUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  // Magic Link Request Form (unauthenticated)
  if (!isAuthenticated || showMagicLinkForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-dark">School of General Studies</h1>
            <p className="text-gray-500 mt-1">Certificate Portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!magicLinkSent ? (
              <>
                <h2 className="text-xl font-semibold text-text-dark mb-2">Access Your Certificates</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your registered email address and we'll send you a secure link to access your certificates.
                </p>

                <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={magicLinkEmail}
                        onChange={(e) => setMagicLinkEmail(e.target.value)}
                        required
                        className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Magic Link
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">
                    Need help? <button className="text-primary hover:underline">Contact Support</button>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-text-dark mb-2">Check Your Email</h2>
                <p className="text-gray-500 text-sm mb-6">
                  We've sent a secure link to <strong>{magicLinkEmail}</strong>. Click the link to access your certificates.
                </p>
                <p className="text-xs text-gray-400">
                  The link will expire in 24 hours. Didn't receive it?{' '}
                  <button 
                    onClick={() => setMagicLinkSent(false)}
                    className="text-primary hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Authenticated Learner Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-text-dark">School of General Studies</h1>
              <p className="text-xs text-gray-500">Certificate Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSupportForm(true)}
              className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              Need Help?
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {learnerData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm font-medium text-text-dark">{learnerData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-1">Welcome back, {learnerData.name.split(' ')[0]}!</h2>
              <p className="text-gray-500">Access and manage your certificates below.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Program</p>
              <p className="font-medium text-text-dark">{learnerData.program}</p>
              <p className="text-sm text-gray-400 mt-1">{learnerData.cohort}</p>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Your Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learnerData.certificates.map((cert) => (
              <div 
                key={cert.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Certificate Preview */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative">
                  {cert.status === 'available' ? (
                    <div className="text-center">
                      <Award className="h-16 w-16 text-primary/40 mx-auto mb-2" />
                      <p className="text-xs text-primary/60 font-medium">Certificate Preview</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Clock className="h-16 w-16 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-medium">
                        {cert.status === 'processing' ? 'Processing...' : 'Pending'}
                      </p>
                    </div>
                  )}
                  {cert.status === 'available' && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-text-dark">{cert.type}</h4>
                      <p className="text-sm text-gray-500">{cert.program}</p>
                    </div>
                  </div>

                  {cert.status === 'available' ? (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <Calendar className="h-3.5 w-3.5" />
                        Issued: {cert.issueDate}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link 
                          to={`/certificate/${cert.id}`}
                          className="flex-1 h-9 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                        <button className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => copyToClipboard(cert.verificationUrl, cert.id)}
                            className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
                            title="Copy verification link"
                          >
                            {copiedLink === cert.id ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-600" />
                            )}
                          </button>
                        </div>
                        <button 
                          onClick={() => shareToLinkedIn(cert)}
                          className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
                          title="Share to LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {cert.status === 'processing' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                          <span>Currently being generated...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" />
                          <span>Pending generation</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-text-dark">{learnerData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="font-medium text-text-dark">{learnerData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Program</p>
              <p className="font-medium text-text-dark">{learnerData.program}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Cohort</p>
              <p className="font-medium text-text-dark">{learnerData.cohort}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Enrollment Date</p>
              <p className="font-medium text-text-dark">{learnerData.enrollmentDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Completion Date</p>
              <p className="font-medium text-text-dark">{learnerData.completionDate}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Notice an error in your information?{' '}
              <button 
                onClick={() => setShowSupportForm(true)}
                className="text-primary hover:underline"
              >
                Submit a correction request
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Support Form Modal */}
      {showSupportForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowSupportForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {!supportSubmitted ? (
              <>
                <h3 className="text-lg font-semibold text-text-dark mb-1">Contact Support</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Describe your issue and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                      required
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="certificate_issue">Certificate Issue</option>
                      <option value="access_problem">Access Problem</option>
                      <option value="data_correction">Data Correction Request</option>
                      <option value="general_inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                      required
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      required
                      className="w-full h-32 p-4 rounded-lg border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Provide details about your request..."
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowSupportForm(false)}
                      className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-10 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-dark mb-2">Request Submitted</h3>
                <p className="text-sm text-gray-500 mb-6">
                  We've received your support request. You'll receive a response at {learnerData.email} within 24-48 hours.
                </p>
                <button
                  onClick={() => {
                    setShowSupportForm(false)
                    setSupportSubmitted(false)
                    setSupportForm({ subject: '', category: '', message: '' })
                  }}
                  className="h-10 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
