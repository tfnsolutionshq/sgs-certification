import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  ArrowLeft, 
  Linkedin, 
  Twitter, 
  Facebook,
  Mail,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Award,
  GraduationCap,
  Calendar,
  Shield,
  QrCode
} from 'lucide-react'

// Simulated certificate data
const certificateData = {
  id: 'CERT-2024-001234',
  learner: {
    name: 'John Doe',
    email: 'john.doe@email.com'
  },
  certificate: {
    type: 'Diploma',
    title: 'General Studies Diploma',
    program: 'School of General Studies',
    description: 'This is to certify that the above named individual has successfully completed all requirements of the General Studies Diploma program.',
    issueDate: 'July 15, 2024',
    completionDate: 'June 30, 2024',
    grade: 'Distinction',
    credentialId: 'CERT-2024-001234',
    verificationUrl: '/verify/abc123xyz'
  },
  signatories: [
    { name: 'Dr. James Wilson', title: 'Dean of Academic Affairs', signature: true },
    { name: 'Prof. Sarah Miller', title: 'Director of Studies', signature: true },
    { name: 'Dr. Michael Brown', title: 'Registrar', signature: true }
  ],
  verification: {
    status: 'valid',
    lastVerified: '2024-03-15 10:30:00',
    blockchain: 'Verified on Ethereum'
  }
}

export default function CertificateViewer() {
  const { id } = useParams()
  const [zoom, setZoom] = useState(100)
  const [copiedLink, setCopiedLink] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const copyVerificationLink = () => {
    navigator.clipboard.writeText(window.location.origin + certificateData.certificate.verificationUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const shareToSocial = (platform: string) => {
    const url = window.location.origin + certificateData.certificate.verificationUrl
    const text = `I just earned my ${certificateData.certificate.title} from ${certificateData.certificate.program}!`
    
    let shareUrl = ''
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`My ${certificateData.certificate.title}`)}&body=${encodeURIComponent(`${text}\n\nVerify here: ${url}`)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/learner" className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="font-semibold text-text-dark">{certificateData.certificate.title}</h1>
              <p className="text-xs text-gray-500">Credential ID: {certificateData.certificate.credentialId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 mr-2 border-r pr-4">
              <button 
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-2 rounded-lg hover:bg-gray-100"
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-4 w-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 w-12 text-center">{zoom}%</span>
              <button 
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 rounded-lg hover:bg-gray-100"
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Download */}
            <button className="h-9 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            {/* Share */}
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="h-9 px-4 rounded-lg bg-primary text-white flex items-center gap-2 text-sm font-medium hover:bg-primary/90"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                  <button
                    onClick={copyVerificationLink}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    {copiedLink ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                    {copiedLink ? 'Link Copied!' : 'Copy Verification Link'}
                  </button>
                  <div className="border-t border-gray-100 my-2" />
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    <Linkedin className="h-4 w-4 text-[#0077b5]" />
                    Share to LinkedIn
                  </button>
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    <Twitter className="h-4 w-4 text-[#1da1f2]" />
                    Share to Twitter
                  </button>
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    <Facebook className="h-4 w-4 text-[#1877f2]" />
                    Share to Facebook
                  </button>
                  <button
                    onClick={() => shareToSocial('email')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                  >
                    <Mail className="h-4 w-4 text-gray-500" />
                    Share via Email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Certificate Preview */}
          <div className="flex-1">
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              {/* Decorative Certificate Design */}
              <div className="aspect-[1.414/1] p-12 bg-gradient-to-br from-white to-slate-50 relative">
                {/* Border Design */}
                <div className="absolute inset-4 border-2 border-primary/20 rounded-lg" />
                <div className="absolute inset-6 border border-primary/10 rounded-lg" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-between py-8">
                  {/* Header */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-serif text-text-dark mb-1">School of General Studies</h1>
                    <p className="text-sm text-gray-500 tracking-widest uppercase">Certificate of Achievement</p>
                  </div>

                  {/* Main Content */}
                  <div className="text-center max-w-lg">
                    <p className="text-sm text-gray-500 mb-4">This is to certify that</p>
                    <h2 className="text-4xl font-serif text-text-dark mb-4 border-b-2 border-primary/30 pb-2 inline-block px-8">
                      {certificateData.learner.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">has successfully completed the requirements for</p>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{certificateData.certificate.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{certificateData.certificate.description}</p>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                      <span>Grade: <strong className="text-text-dark">{certificateData.certificate.grade}</strong></span>
                      <span>Date: <strong className="text-text-dark">{certificateData.certificate.issueDate}</strong></span>
                    </div>
                  </div>

                  {/* Signatories */}
                  <div className="flex justify-center gap-16">
                    {certificateData.signatories.map((sig, idx) => (
                      <div key={idx} className="text-center">
                        <div className="h-12 border-b border-gray-300 mb-2 w-32 flex items-end justify-center">
                          <span className="font-script text-2xl text-gray-400 italic">{sig.name.split(' ')[0]}</span>
                        </div>
                        <p className="text-sm font-medium text-text-dark">{sig.name}</p>
                        <p className="text-xs text-gray-500">{sig.title}</p>
                      </div>
                    ))}
                  </div>

                  {/* Credential ID & QR */}
                  <div className="absolute bottom-8 left-8 flex items-center gap-2 text-xs text-gray-400">
                    <QrCode className="h-8 w-8" />
                    <div>
                      <p>Credential ID: {certificateData.certificate.credentialId}</p>
                      <p>Verify at: sgs.edu/verify</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 space-y-4">
            {/* Verification Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-text-dark">Verified Certificate</p>
                  <p className="text-xs text-green-600">Authenticity confirmed</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-green-600 font-medium">Valid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Verified</span>
                  <span className="text-text-dark">{certificateData.verification.lastVerified}</span>
                </div>
              </div>
              <Link 
                to={certificateData.certificate.verificationUrl}
                className="mt-4 w-full h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
                Public Verification Page
              </Link>
            </div>

            {/* Certificate Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-medium text-text-dark mb-4">Certificate Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 mb-0.5">Recipient</p>
                  <p className="font-medium text-text-dark">{certificateData.learner.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Certificate Type</p>
                  <p className="font-medium text-text-dark">{certificateData.certificate.type}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Program</p>
                  <p className="font-medium text-text-dark">{certificateData.certificate.title}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Issue Date</p>
                  <p className="font-medium text-text-dark">{certificateData.certificate.issueDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Completion Date</p>
                  <p className="font-medium text-text-dark">{certificateData.certificate.completionDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Grade</p>
                  <p className="font-medium text-text-dark">{certificateData.certificate.grade}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Credential ID</p>
                  <p className="font-mono text-text-dark text-xs">{certificateData.certificate.credentialId}</p>
                </div>
              </div>
            </div>

            {/* Signatories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-medium text-text-dark mb-4">Signatories</h3>
              <div className="space-y-3">
                {certificateData.signatories.map((sig, idx) => (
                  <div key={idx} className="flex items-center gap-3">
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
          </div>
        </div>
      </main>
    </div>
  )
}
