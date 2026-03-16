import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Award, Download, RefreshCw, Ban, Send, Copy, ExternalLink,
  CheckCircle, Clock, AlertTriangle, FileText, User, Calendar, Shield, X, Eye
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

const certificateData = {
  id: 1,
  number: 'CERT-2024-00001',
  verificationToken: 'vrf_7x9K2mN4pQ8rT1wE3yU6iO',
  type: 'Certificate of Completion',
  program: 'General Studies Diploma',
  recipient: {
    name: 'John Michael Doe',
    email: 'john.doe@email.com',
    id: 1,
  },
  cohort: 'Batch 2024-A',
  issueDate: '2024-01-15',
  expiryDate: null,
  status: 'Active',
  version: 1,
  template: 'Standard Completion v2.1',
  signatureSet: 'Dean + Director',
  createdAt: '2024-01-15 09:00:00',
  createdBy: 'System (Batch Generation)',
  checksum: 'sha256:7d4e3f2a1b...',
}

const artifactVersions = [
  { version: 1, createdAt: '2024-01-15 09:00:00', createdBy: 'System', reason: 'Initial generation', template: 'v2.1', status: 'Current' },
]

const verificationHistory = [
  { id: 1, timestamp: '2024-01-15 10:30 AM', ipAddress: '203.0.113.45', userAgent: 'Mozilla/5.0...', result: 'Valid', location: 'Lagos, Nigeria' },
  { id: 2, timestamp: '2024-01-15 02:15 PM', ipAddress: '198.51.100.23', userAgent: 'Mozilla/5.0...', result: 'Valid', location: 'London, UK' },
  { id: 3, timestamp: '2024-01-16 09:45 AM', ipAddress: '192.0.2.78', userAgent: 'Chrome/120...', result: 'Valid', location: 'New York, US' },
]

const retrievalHistory = [
  { id: 1, timestamp: '2024-01-15 10:25 AM', method: 'Magic Link', ipAddress: '41.58.120.45' },
  { id: 2, timestamp: '2024-01-16 03:30 PM', method: 'Email + Surname', ipAddress: '41.58.120.45' },
  { id: 3, timestamp: '2024-01-17 11:00 AM', method: 'Magic Link', ipAddress: '105.112.45.78' },
]

export default function CertificateDetail() {
  const { id } = useParams()
  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [showRegenerateModal, setShowRegenerateModal] = useState(false)
  const [revokeReason, setRevokeReason] = useState('')
  const [regenerateReason, setRegenerateReason] = useState('')
  const [useLatestTemplate, setUseLatestTemplate] = useState(false)

  const verificationUrl = `https://sgs.edu/verify/${certificateData.verificationToken}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/certificates" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Certificates
        </Link>
      </div>

      <PageHeader
        title={certificateData.number}
        description={`${certificateData.type} - ${certificateData.recipient.name}`}
        action={
          <div className="flex gap-2">
            <Button variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="secondary" onClick={() => setShowRegenerateModal(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            {certificateData.status === 'Active' && (
              <Button variant="secondary" onClick={() => setShowRevokeModal(true)}>
                <Ban className="h-4 w-4 mr-2" />
                Revoke
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Card */}
          <Card>
            <CardContent className="text-center py-6">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mb-4 ${
                certificateData.status === 'Active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {certificateData.status === 'Active' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Ban className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-text-dark">{certificateData.status}</h3>
              <p className="text-sm text-gray-500 mt-1">Certificate Status</p>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Details</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                <User className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Recipient</p>
                  <Link to={`/users/${certificateData.recipient.id}`} className="text-sm font-medium text-primary hover:underline">
                    {certificateData.recipient.name}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                <Award className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Certificate Type</p>
                  <p className="text-sm font-medium text-text-dark">{certificateData.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Issue Date</p>
                  <p className="text-sm font-medium text-text-dark">{certificateData.issueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                <FileText className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Template</p>
                  <p className="text-sm font-medium text-text-dark">{certificateData.template}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Version</p>
                  <p className="text-sm font-medium text-text-dark">v{certificateData.version}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification URL */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Verification</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Verification URL</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-mono text-text-dark truncate flex-1">{verificationUrl}</p>
                  <button 
                    onClick={() => copyToClipboard(verificationUrl)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <a 
                href={verificationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Open Verification Page
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certificate Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">Certificate Preview</h3>
                <Button variant="secondary" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Full Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-[1.414/1] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="text-center p-8 bg-white/80 rounded-lg shadow">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-xs text-gray-500 mb-2">CERTIFICATE OF COMPLETION</p>
                  <p className="text-lg font-bold text-text-dark mb-1">{certificateData.recipient.name}</p>
                  <p className="text-sm text-gray-600">{certificateData.program}</p>
                  <p className="text-xs text-gray-400 mt-4">{certificateData.number}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Artifact Versions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Artifact Versions</h3>
            </CardHeader>
            <DataTable
              columns={[
                { header: 'Version', accessor: (row) => `v${row.version}`, className: 'w-20' },
                { header: 'Created', accessor: 'createdAt' },
                { header: 'Created By', accessor: 'createdBy' },
                { header: 'Template', accessor: 'template' },
                { header: 'Reason', accessor: 'reason' },
                {
                  header: 'Status',
                  accessor: (row) => (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {row.status}
                    </span>
                  )
                },
              ]}
              data={artifactVersions}
            />
          </Card>

          {/* Verification History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">Verification History</h3>
                <span className="text-sm text-gray-500">{verificationHistory.length} verifications</span>
              </div>
            </CardHeader>
            <DataTable
              columns={[
                { header: 'Timestamp', accessor: 'timestamp' },
                { header: 'Location', accessor: 'location' },
                { header: 'IP Address', accessor: 'ipAddress' },
                {
                  header: 'Result',
                  accessor: (row) => (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      {row.result}
                    </span>
                  )
                },
              ]}
              data={verificationHistory}
            />
          </Card>

          {/* Retrieval History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">Retrieval History</h3>
                <span className="text-sm text-gray-500">{retrievalHistory.length} retrievals</span>
              </div>
            </CardHeader>
            <DataTable
              columns={[
                { header: 'Timestamp', accessor: 'timestamp' },
                { header: 'Method', accessor: 'method' },
                { header: 'IP Address', accessor: 'ipAddress' },
              ]}
              data={retrievalHistory}
            />
          </Card>
        </div>
      </div>

      {/* Revoke Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowRevokeModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">Revoke Certificate</h3>
              <button onClick={() => setShowRevokeModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">
                  This action will mark the certificate as revoked. The verification page will show the revoked status.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Revocation <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  rows={3}
                  placeholder="Enter reason for revocation..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowRevokeModal(false)}>
                  Cancel
                </Button>
                <button 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                  onClick={() => setShowRevokeModal(false)}
                >
                  Revoke Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowRegenerateModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">Regenerate Certificate</h3>
              <button onClick={() => setShowRegenerateModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This will create a new version of the certificate. The current version will be archived.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Regeneration
                </label>
                <textarea
                  value={regenerateReason}
                  onChange={(e) => setRegenerateReason(e.target.value)}
                  rows={3}
                  placeholder="e.g., Name correction, template update..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="useLatestTemplate"
                  checked={useLatestTemplate}
                  onChange={(e) => setUseLatestTemplate(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="useLatestTemplate" className="text-sm text-gray-700">
                  Use latest template and signature versions
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowRegenerateModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowRegenerateModal(false)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
