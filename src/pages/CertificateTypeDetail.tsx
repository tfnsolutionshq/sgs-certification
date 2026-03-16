import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Save, Award, FileText, Calendar, Hash, Settings, 
  Layers, Clock, History, ChevronRight, X, AlertTriangle
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

const certificateTypeData = {
  id: 1,
  name: 'Certificate of Completion',
  programLabel: 'General Studies Diploma',
  description: 'Awarded to learners who successfully complete a program of study at SGS',
  template: 'Standard Completion v2.1',
  signatureSet: 'Dean + Director SGS',
  status: 'Active',
  version: 3,
  issuedCount: 1247,
  createdAt: '2023-01-15',
  lastModified: '2024-01-10',
  
  // Configuration
  issueDateRule: 'cohort', // 'cohort' | 'individual' | 'fixed'
  fixedIssueDate: null,
  hasExpiry: false,
  expiryMonths: null,
  
  // Number Format
  numberPrefix: 'CERT',
  numberFormat: 'CERT-{YEAR}-{SEQ:5}',
  currentSequence: 847,
}

const versionHistory = [
  { version: 3, date: '2024-01-10', author: 'Admin User', changes: 'Updated template to v2.1' },
  { version: 2, date: '2023-06-15', author: 'Mike Johnson', changes: 'Changed signature set' },
  { version: 1, date: '2023-01-15', author: 'Admin User', changes: 'Initial creation' },
]

export default function CertificateTypeDetail() {
  const { id } = useParams()
  const [formData, setFormData] = useState(certificateTypeData)
  const [showSaveModal, setShowSaveModal] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <Link to="/certificate-types" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Certificate Types
        </Link>
      </div>

      <PageHeader
        title={formData.name}
        description={`Version ${formData.version} - ${formData.issuedCount.toLocaleString()} certificates issued`}
        action={
          <Button onClick={() => setShowSaveModal(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-dark">Basic Information</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Label</label>
                <input
                  type="text"
                  value={formData.programLabel}
                  onChange={(e) => setFormData({ ...formData, programLabel: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Issue Date Rules */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-dark">Issue Date Configuration</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date Rule</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="issueDateRule"
                      value="cohort"
                      checked={formData.issueDateRule === 'cohort'}
                      onChange={(e) => setFormData({ ...formData, issueDateRule: e.target.value })}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-medium text-text-dark">Per Cohort</p>
                      <p className="text-xs text-gray-500">All certificates in a cohort share the same issue date</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="issueDateRule"
                      value="individual"
                      checked={formData.issueDateRule === 'individual'}
                      onChange={(e) => setFormData({ ...formData, issueDateRule: e.target.value })}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-medium text-text-dark">Per Record</p>
                      <p className="text-xs text-gray-500">Each certificate can have a different issue date from uploaded data</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="issueDateRule"
                      value="fixed"
                      checked={formData.issueDateRule === 'fixed'}
                      onChange={(e) => setFormData({ ...formData, issueDateRule: e.target.value })}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-medium text-text-dark">Fixed Date</p>
                      <p className="text-xs text-gray-500">All certificates use a specific fixed date</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-text-dark">Enable Expiration</p>
                    <p className="text-sm text-gray-500">Set an expiry period for certificates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.hasExpiry}
                      onChange={(e) => setFormData({ ...formData, hasExpiry: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                {formData.hasExpiry && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Period (months)</label>
                    <input
                      type="number"
                      value={formData.expiryMonths || ''}
                      onChange={(e) => setFormData({ ...formData, expiryMonths: parseInt(e.target.value) })}
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="e.g., 24"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Certificate Number Format */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Hash className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-dark">Certificate Number Format</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number Prefix</label>
                <input
                  type="text"
                  value={formData.numberPrefix}
                  onChange={(e) => setFormData({ ...formData, numberPrefix: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format Pattern</label>
                <input
                  type="text"
                  value={formData.numberFormat}
                  onChange={(e) => setFormData({ ...formData, numberFormat: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available tokens: {'{YEAR}'}, {'{MONTH}'}, {'{SEQ:N}'} (N = padding digits)
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Preview</p>
                <p className="font-mono text-sm text-text-dark">CERT-2024-00848</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Template & Signatures */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Template & Signatures</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                <Link 
                  to="/templates/1" 
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-text-dark">{formData.template}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature Set</label>
                <Link 
                  to="/signature-sets" 
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-text-dark">{formData.signatureSet}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Statistics</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Total Issued</span>
                <span className="font-medium text-text-dark">{formData.issuedCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Current Sequence</span>
                <span className="font-medium text-text-dark">{formData.currentSequence}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Created</span>
                <span className="font-medium text-text-dark">{formData.createdAt}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Last Modified</span>
                <span className="font-medium text-text-dark">{formData.lastModified}</span>
              </div>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-text-dark">Version History</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versionHistory.map((v) => (
                  <div key={v.version} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">v{v.version}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-dark">{v.changes}</p>
                      <p className="text-xs text-gray-500">{v.date} by {v.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowSaveModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">Save Changes</h3>
              <button onClick={() => setShowSaveModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Saving will create version {formData.version + 1}. Existing certificates will retain the version used at issuance.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowSaveModal(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as v{formData.version + 1}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
