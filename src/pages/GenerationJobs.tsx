import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlayCircle, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  FileText,
  Users,
  Calendar,
  Filter,
  Search,
  Download,
  Eye
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent, CardHeader } from '../components/Card'

interface JobError {
  id: string
  learnerId: string
  learnerName: string
  errorType: string
  message: string
  timestamp: string
}

interface GenerationJob {
  id: string
  name: string
  cohort: string
  certificateType: string
  template: string
  status: 'pending' | 'queued' | 'processing' | 'completed' | 'failed' | 'paused'
  progress: number
  total: number
  processed: number
  successful: number
  failed: number
  createdAt: string
  startedAt?: string
  completedAt?: string
  createdBy: string
  errors: JobError[]
}

const jobs: GenerationJob[] = [
  {
    id: 'JOB-001',
    name: 'Batch 2024-A Diploma Generation',
    cohort: 'Batch 2024-A',
    certificateType: 'Diploma',
    template: 'Official Diploma Template',
    status: 'processing',
    progress: 67,
    total: 156,
    processed: 104,
    successful: 102,
    failed: 2,
    createdAt: '2024-03-15 09:00:00',
    startedAt: '2024-03-15 09:05:00',
    createdBy: 'Admin User',
    errors: [
      { id: 'E1', learnerId: 'L045', learnerName: 'John Missing', errorType: 'Missing Data', message: 'Date of birth field is empty', timestamp: '09:15:32' },
      { id: 'E2', learnerId: 'L089', learnerName: 'Jane Invalid', errorType: 'Validation Error', message: 'Invalid email format', timestamp: '09:22:15' },
    ]
  },
  {
    id: 'JOB-002',
    name: 'Batch 2024-B Certificate of Completion',
    cohort: 'Batch 2024-B',
    certificateType: 'Certificate of Completion',
    template: 'Standard Completion Template',
    status: 'queued',
    progress: 0,
    total: 89,
    processed: 0,
    successful: 0,
    failed: 0,
    createdAt: '2024-03-15 10:30:00',
    createdBy: 'Admin User',
    errors: []
  },
  {
    id: 'JOB-003',
    name: 'Batch 2023-C Transcripts',
    cohort: 'Batch 2023-C',
    certificateType: 'Transcript',
    template: 'Academic Transcript Template',
    status: 'completed',
    progress: 100,
    total: 142,
    processed: 142,
    successful: 140,
    failed: 2,
    createdAt: '2024-03-14 14:00:00',
    startedAt: '2024-03-14 14:05:00',
    completedAt: '2024-03-14 15:32:00',
    createdBy: 'Mike Johnson',
    errors: [
      { id: 'E3', learnerId: 'L112', learnerName: 'Bob Error', errorType: 'Template Error', message: 'Grade data exceeds field limit', timestamp: '14:45:00' },
      { id: 'E4', learnerId: 'L125', learnerName: 'Alice Missing', errorType: 'Missing Data', message: 'Course completion date missing', timestamp: '15:12:00' },
    ]
  },
  {
    id: 'JOB-004',
    name: 'Batch 2023-B Professional Certificates',
    cohort: 'Batch 2023-B',
    certificateType: 'Professional Certificate',
    template: 'Professional Certificate Template',
    status: 'failed',
    progress: 45,
    total: 78,
    processed: 35,
    successful: 30,
    failed: 5,
    createdAt: '2024-03-13 11:00:00',
    startedAt: '2024-03-13 11:02:00',
    createdBy: 'Sarah Wilson',
    errors: [
      { id: 'E5', learnerId: 'L201', learnerName: 'Tom Failed', errorType: 'System Error', message: 'Template rendering failed', timestamp: '11:15:00' },
    ]
  },
  {
    id: 'JOB-005',
    name: 'Individual Certificate - John Doe',
    cohort: 'Batch 2024-A',
    certificateType: 'Diploma',
    template: 'Official Diploma Template',
    status: 'completed',
    progress: 100,
    total: 1,
    processed: 1,
    successful: 1,
    failed: 0,
    createdAt: '2024-03-15 08:00:00',
    startedAt: '2024-03-15 08:00:05',
    completedAt: '2024-03-15 08:00:12',
    createdBy: 'Admin User',
    errors: []
  },
]

const statusConfig = {
  pending: { color: 'bg-gray-100 text-gray-700', icon: Clock, label: 'Pending' },
  queued: { color: 'bg-blue-100 text-blue-700', icon: Clock, label: 'Queued' },
  processing: { color: 'bg-yellow-100 text-yellow-700', icon: PlayCircle, label: 'Processing' },
  completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Completed' },
  failed: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Failed' },
  paused: { color: 'bg-orange-100 text-orange-700', icon: Pause, label: 'Paused' },
}

export default function GenerationJobs() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewJobModal, setShowNewJobModal] = useState(false)

  const toggleExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  const getStatusBadge = (status: GenerationJob['status']) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    )
  }

  return (
    <div>
      <PageHeader
        title="Generation Jobs"
        description="Manage certificate generation jobs and monitor progress"
        action={
          <Button onClick={() => setShowNewJobModal(true)}>
            <PlayCircle className="h-4 w-4 mr-2" />
            New Generation Job
          </Button>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <PlayCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Queued</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">2</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Failed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs by name or cohort..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Status</option>
              <option value="processing">Processing</option>
              <option value="queued">Queued</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <Button variant="secondary">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent>
              {/* Job Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleExpand(job.id)}
                    className="mt-1 p-1 rounded hover:bg-gray-100"
                  >
                    {expandedJob === job.id ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-text-dark">{job.name}</h3>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {job.cohort}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        {job.certificateType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {job.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.status === 'processing' && (
                    <>
                      <Button variant="secondary" size="sm">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    </>
                  )}
                  {job.status === 'failed' && (
                    <Button variant="secondary" size="sm">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry Failed
                    </Button>
                  )}
                  {job.status === 'completed' && (
                    <Button variant="secondary" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {(job.status === 'processing' || job.status === 'paused') && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      Processing: {job.processed} of {job.total} certificates
                    </span>
                    <span className="font-medium">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Stats Summary */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-medium">{job.total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Processed:</span>
                  <span className="font-medium">{job.processed}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span className="font-medium">{job.successful}</span>
                </div>
                {job.failed > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-3.5 w-3.5" />
                    <span className="font-medium">{job.failed}</span>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {expandedJob === job.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Template</p>
                      <p className="text-sm font-medium">{job.template}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Created By</p>
                      <p className="text-sm font-medium">{job.createdBy}</p>
                    </div>
                    {job.startedAt && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Started At</p>
                        <p className="text-sm font-medium">{job.startedAt}</p>
                      </div>
                    )}
                    {job.completedAt && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Completed At</p>
                        <p className="text-sm font-medium">{job.completedAt}</p>
                      </div>
                    )}
                  </div>

                  {/* Error List */}
                  {job.errors.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <h4 className="font-medium text-text-dark">Errors ({job.errors.length})</h4>
                      </div>
                      <div className="bg-red-50 rounded-lg border border-red-100 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-red-100/50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Learner</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Error Type</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Message</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Time</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {job.errors.map((error) => (
                              <tr key={error.id} className="border-t border-red-100">
                                <td className="px-4 py-2">
                                  <Link to={`/users/${error.learnerId}`} className="text-primary hover:underline">
                                    {error.learnerName}
                                  </Link>
                                </td>
                                <td className="px-4 py-2">
                                  <span className="inline-flex px-2 py-0.5 text-xs rounded bg-red-200 text-red-800">
                                    {error.errorType}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-gray-600">{error.message}</td>
                                <td className="px-4 py-2 text-gray-500">{error.timestamp}</td>
                                <td className="px-4 py-2">
                                  <div className="flex gap-1">
                                    <button className="p-1 rounded hover:bg-red-100" title="View Learner">
                                      <Eye className="h-3.5 w-3.5 text-gray-500" />
                                    </button>
                                    <button className="p-1 rounded hover:bg-red-100" title="Retry">
                                      <RotateCcw className="h-3.5 w-3.5 text-gray-500" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowNewJobModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-text-dark mb-6">Create Generation Job</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Name</label>
                <input
                  type="text"
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Batch 2024-A Diploma Generation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Generation Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="type" value="cohort" className="text-primary" defaultChecked />
                    <span className="text-sm">Entire Cohort</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="type" value="individual" className="text-primary" />
                    <span className="text-sm">Individual Learners</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Cohort</label>
                <select className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Choose a cohort</option>
                  <option value="batch-2024-a">Batch 2024-A (156 learners)</option>
                  <option value="batch-2024-b">Batch 2024-B (89 learners)</option>
                  <option value="batch-2023-c">Batch 2023-C (142 learners)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
                <select className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Choose certificate type</option>
                  <option value="diploma">Diploma</option>
                  <option value="completion">Certificate of Completion</option>
                  <option value="transcript">Academic Transcript</option>
                  <option value="professional">Professional Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                <select className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Choose template</option>
                  <option value="official-diploma">Official Diploma Template</option>
                  <option value="standard-completion">Standard Completion Template</option>
                  <option value="academic-transcript">Academic Transcript Template</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature Set</label>
                <select className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Choose signature set</option>
                  <option value="diploma-set">Diploma Signature Set (3 signatories)</option>
                  <option value="completion-set">Completion Signature Set (2 signatories)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowNewJobModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowNewJobModal(false)}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Generation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
