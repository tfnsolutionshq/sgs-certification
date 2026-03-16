import { useState } from 'react'
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Calendar, 
  Filter,
  Search,
  Send,
  Paperclip,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent, CardHeader } from '../components/Card'

interface SupportRequest {
  id: string
  learnerName: string
  learnerEmail: string
  cohort: string
  subject: string
  category: 'certificate_issue' | 'access_problem' | 'data_correction' | 'general_inquiry'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  assignedTo?: string
  messages: {
    id: string
    sender: string
    senderType: 'learner' | 'admin'
    message: string
    timestamp: string
    attachments?: string[]
  }[]
}

const supportRequests: SupportRequest[] = [
  {
    id: 'SR-001',
    learnerName: 'John Doe',
    learnerEmail: 'john.doe@email.com',
    cohort: 'Batch 2024-A',
    subject: 'Certificate shows incorrect name spelling',
    category: 'data_correction',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-15 10:30:00',
    updatedAt: '2024-03-15 10:30:00',
    messages: [
      {
        id: 'M1',
        sender: 'John Doe',
        senderType: 'learner',
        message: 'My certificate shows my name as "Jon Doe" instead of "John Doe". Please correct this as I need it for my job application.',
        timestamp: '10:30:00',
        attachments: ['certificate_screenshot.png']
      }
    ]
  },
  {
    id: 'SR-002',
    learnerName: 'Jane Smith',
    learnerEmail: 'jane.smith@email.com',
    cohort: 'Batch 2024-A',
    subject: 'Cannot access my certificate',
    category: 'access_problem',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-14 15:20:00',
    updatedAt: '2024-03-15 09:00:00',
    assignedTo: 'Admin User',
    messages: [
      {
        id: 'M2',
        sender: 'Jane Smith',
        senderType: 'learner',
        message: 'I received a magic link but it says "Invalid or expired token" when I click on it.',
        timestamp: '15:20:00'
      },
      {
        id: 'M3',
        sender: 'Admin User',
        senderType: 'admin',
        message: 'Hi Jane, I\'ve sent you a new magic link. Please check your email and try again. The link is valid for 24 hours.',
        timestamp: '09:00:00'
      }
    ]
  },
  {
    id: 'SR-003',
    learnerName: 'Mike Johnson',
    learnerEmail: 'mike.j@email.com',
    cohort: 'Batch 2023-C',
    subject: 'Request for additional certificate copy',
    category: 'general_inquiry',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-13 11:00:00',
    updatedAt: '2024-03-13 14:30:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'M4',
        sender: 'Mike Johnson',
        senderType: 'learner',
        message: 'Can I get a digital copy of my certificate sent to my new email address?',
        timestamp: '11:00:00'
      },
      {
        id: 'M5',
        sender: 'Support Team',
        senderType: 'admin',
        message: 'Hi Mike, I\'ve updated your email address and resent the certificate link. Please check your new email.',
        timestamp: '14:30:00'
      }
    ]
  },
  {
    id: 'SR-004',
    learnerName: 'Sarah Wilson',
    learnerEmail: 'sarah.w@email.com',
    cohort: 'Batch 2024-B',
    subject: 'Certificate not generated yet',
    category: 'certificate_issue',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-03-15 08:45:00',
    updatedAt: '2024-03-15 08:45:00',
    messages: [
      {
        id: 'M6',
        sender: 'Sarah Wilson',
        senderType: 'learner',
        message: 'I completed my course 2 weeks ago but my certificate hasn\'t been generated yet. When can I expect it?',
        timestamp: '08:45:00'
      }
    ]
  },
]

const categoryLabels = {
  certificate_issue: 'Certificate Issue',
  access_problem: 'Access Problem',
  data_correction: 'Data Correction',
  general_inquiry: 'General Inquiry'
}

const statusConfig = {
  open: { color: 'bg-blue-100 text-blue-700', label: 'Open' },
  in_progress: { color: 'bg-yellow-100 text-yellow-700', label: 'In Progress' },
  resolved: { color: 'bg-green-100 text-green-700', label: 'Resolved' },
  closed: { color: 'bg-gray-100 text-gray-700', label: 'Closed' }
}

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-600', label: 'Low' },
  medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Medium' },
  high: { color: 'bg-red-100 text-red-700', label: 'High' }
}

export default function SupportRequests() {
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [replyMessage, setReplyMessage] = useState('')

  return (
    <div>
      <PageHeader
        title="Support Requests"
        description="Manage learner support tickets and inquiries"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">2</p>
              <p className="text-sm text-gray-500">Open</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Resolved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">High Priority</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6">
        {/* Requests List */}
        <div className="flex-1">
          {/* Filters */}
          <Card className="mb-4">
            <div className="p-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search requests..."
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
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">All Categories</option>
                  <option value="certificate_issue">Certificate Issue</option>
                  <option value="access_problem">Access Problem</option>
                  <option value="data_correction">Data Correction</option>
                  <option value="general_inquiry">General Inquiry</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Request List */}
          <div className="space-y-3">
            {supportRequests.map((request) => (
              <Card 
                key={request.id}
                className={`cursor-pointer transition-all ${selectedRequest?.id === request.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                onClick={() => setSelectedRequest(request)}
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{request.id}</span>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig[request.status].color}`}>
                        {statusConfig[request.status].label}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${priorityConfig[request.priority].color}`}>
                        {priorityConfig[request.priority].label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{request.createdAt}</span>
                  </div>
                  <h4 className="font-medium text-text-dark mb-1">{request.subject}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {request.learnerName}
                    </span>
                    <span>{request.cohort}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {categoryLabels[request.category]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Request Detail Panel */}
        {selectedRequest && (
          <div className="w-96 flex-shrink-0">
            <Card className="sticky top-4">
              <CardHeader className="flex items-center justify-between">
                <h3 className="font-semibold text-text-dark">Request Details</h3>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Request Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subject</p>
                    <p className="text-sm font-medium">{selectedRequest.subject}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Learner</p>
                      <p className="text-sm font-medium">{selectedRequest.learnerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Cohort</p>
                      <p className="text-sm font-medium">{selectedRequest.cohort}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <select 
                        className="w-full h-8 px-2 text-xs rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue={selectedRequest.status}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Priority</p>
                      <select 
                        className="w-full h-8 px-2 text-xs rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue={selectedRequest.priority}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  {selectedRequest.assignedTo && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                      <p className="text-sm font-medium">{selectedRequest.assignedTo}</p>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-text-dark mb-3">Conversation</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedRequest.messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`p-3 rounded-lg ${
                          msg.senderType === 'learner' ? 'bg-gray-100' : 'bg-primary/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{msg.sender}</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 flex gap-1">
                            {msg.attachments.map((att, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 text-xs text-primary">
                                <Paperclip className="h-3 w-3" />
                                {att}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply */}
                <div className="border-t pt-4">
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full h-20 p-3 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm">
                      <Paperclip className="h-3 w-3 mr-1" />
                      Attach
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Send className="h-3 w-3 mr-1" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
