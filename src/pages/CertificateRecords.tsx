import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Filter, Download, Award, MoreVertical, Eye, RefreshCw, 
  Ban, CheckCircle, AlertCircle, Clock, FileText
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

interface CertificateRecord {
  id: number
  number: string
  recipientName: string
  recipientEmail: string
  type: string
  cohort: string
  issueDate: string
  status: 'Active' | 'Revoked' | 'Pending' | 'Expired'
  version: number
  retrievals: number
  verifications: number
}

const certificates: CertificateRecord[] = [
  { id: 1, number: 'CERT-2024-00001', recipientName: 'John Doe', recipientEmail: 'john.doe@email.com', type: 'Certificate of Completion', cohort: 'Batch 2024-A', issueDate: '2024-01-15', status: 'Active', version: 1, retrievals: 3, verifications: 5 },
  { id: 2, number: 'CERT-2024-00002', recipientName: 'Jane Smith', recipientEmail: 'jane.smith@email.com', type: 'Certificate of Completion', cohort: 'Batch 2024-A', issueDate: '2024-01-15', status: 'Active', version: 1, retrievals: 1, verifications: 2 },
  { id: 3, number: 'CERT-2024-00003', recipientName: 'Mike Johnson', recipientEmail: 'mike.j@email.com', type: 'Certificate of Achievement', cohort: 'Batch 2024-A', issueDate: '2024-01-14', status: 'Active', version: 2, retrievals: 0, verifications: 0 },
  { id: 4, number: 'CERT-2024-00004', recipientName: 'Sarah Wilson', recipientEmail: 'sarah.w@email.com', type: 'Certificate of Completion', cohort: 'Batch 2024-A', issueDate: '2024-01-14', status: 'Pending', version: 1, retrievals: 0, verifications: 0 },
  { id: 5, number: 'CERT-2023-00521', recipientName: 'Tom Brown', recipientEmail: 'tom.brown@email.com', type: 'Certificate of Completion', cohort: 'Batch 2023-C', issueDate: '2023-12-15', status: 'Revoked', version: 1, retrievals: 2, verifications: 1 },
  { id: 6, number: 'CERT-2023-00520', recipientName: 'Emily Davis', recipientEmail: 'emily.d@email.com', type: 'Professional Certificate', cohort: 'Batch 2023-B', issueDate: '2023-09-30', status: 'Active', version: 1, retrievals: 5, verifications: 12 },
  { id: 7, number: 'CERT-2023-00519', recipientName: 'Chris Lee', recipientEmail: 'chris.lee@email.com', type: 'Certificate of Completion', cohort: 'Batch 2023-B', issueDate: '2023-09-30', status: 'Active', version: 3, retrievals: 4, verifications: 8 },
]

export default function CertificateRecords() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  return (
    <div>
      <PageHeader
        title="Certificate Records"
        description="View and manage all issued certificates"
        action={
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">2,847</p>
              <p className="text-sm text-gray-500">Total Issued</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">2,812</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">23</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <Ban className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">12</p>
              <p className="text-sm text-gray-500">Revoked</p>
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
              placeholder="Search by certificate number, name, or email..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="revoked">Revoked</option>
              <option value="expired">Expired</option>
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="completion">Completion</option>
              <option value="achievement">Achievement</option>
              <option value="professional">Professional</option>
            </select>
            <Button variant="secondary">
              <Filter className="h-4 w-4 mr-2" />
              More
            </Button>
          </div>
        </div>
      </Card>

      {/* Certificates Table */}
      <Card>
        <DataTable
          columns={[
            {
              header: 'Certificate',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Link to={`/certificates/${row.id}`} className="font-medium text-text-dark hover:text-primary">
                      {row.number}
                    </Link>
                    <p className="text-xs text-gray-500">{row.type}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Recipient',
              accessor: (row) => (
                <div>
                  <Link to={`/users/${row.id}`} className="font-medium text-text-dark hover:text-primary">
                    {row.recipientName}
                  </Link>
                  <p className="text-xs text-gray-500">{row.recipientEmail}</p>
                </div>
              )
            },
            { header: 'Cohort', accessor: 'cohort' },
            { header: 'Issue Date', accessor: 'issueDate' },
            { header: 'Ver.', accessor: (row) => `v${row.version}`, className: 'w-16' },
            {
              header: 'Activity',
              accessor: (row) => (
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-blue-600">{row.retrievals} retrieved</span>
                  <span className="text-green-600">{row.verifications} verified</span>
                </div>
              )
            },
            {
              header: 'Status',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.status === 'Active' ? 'bg-green-100 text-green-700' :
                  row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  row.status === 'Revoked' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {row.status}
                </span>
              )
            },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex items-center gap-1">
                  <Link to={`/certificates/${row.id}`}>
                    <button className="p-1.5 rounded hover:bg-gray-100" title="View Details">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                  </Link>
                  <button className="p-1.5 rounded hover:bg-gray-100" title="Download PDF">
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  {row.status === 'Active' && (
                    <button className="p-1.5 rounded hover:bg-gray-100" title="Regenerate">
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                  <button className="p-1.5 rounded hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ),
              className: 'w-32'
            },
          ]}
          data={certificates}
        />
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-7 of 2,847 certificates</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-sm rounded border border-primary bg-primary text-white">1</button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </Card>
    </div>
  )
}
