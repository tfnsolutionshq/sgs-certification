import { Search, Download, Filter, User, FileText, Settings, Shield } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable from '../components/DataTable'

const auditLogs = [
  {
    id: 1,
    action: 'Certificate Issued',
    description: 'Certificate CERT-2024-00847 issued to John Doe',
    performedBy: 'Admin User',
    category: 'Certificate',
    timestamp: '2024-01-15 10:30:25 AM',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    action: 'User Created',
    description: 'New learner account created for jane.smith@email.com',
    performedBy: 'Admin User',
    category: 'User',
    timestamp: '2024-01-15 09:45:12 AM',
    ipAddress: '192.168.1.100'
  },
  {
    id: 3,
    action: 'Template Modified',
    description: 'Template "Standard Completion" updated',
    performedBy: 'Mike Johnson',
    category: 'Template',
    timestamp: '2024-01-14 04:30:00 PM',
    ipAddress: '192.168.1.105'
  },
  {
    id: 4,
    action: 'Settings Changed',
    description: 'Email notification settings updated',
    performedBy: 'Admin User',
    category: 'Settings',
    timestamp: '2024-01-14 02:15:30 PM',
    ipAddress: '192.168.1.100'
  },
  {
    id: 5,
    action: 'Cohort Created',
    description: 'New cohort "Batch 2024-B" created with 89 students',
    performedBy: 'Admin User',
    category: 'Cohort',
    timestamp: '2024-01-14 11:00:00 AM',
    ipAddress: '192.168.1.100'
  },
  {
    id: 6,
    action: 'Signatory Added',
    description: 'Dr. Emily Watson added as signatory',
    performedBy: 'Admin User',
    category: 'Signatory',
    timestamp: '2024-01-13 03:45:00 PM',
    ipAddress: '192.168.1.100'
  },
  {
    id: 7,
    action: 'Certificate Revoked',
    description: 'Certificate CERT-2023-00521 revoked - Duplicate issuance',
    performedBy: 'Mike Johnson',
    category: 'Certificate',
    timestamp: '2024-01-13 10:20:15 AM',
    ipAddress: '192.168.1.105'
  },
  {
    id: 8,
    action: 'Bulk Import',
    description: '156 learners imported to Batch 2024-A',
    performedBy: 'Admin User',
    category: 'User',
    timestamp: '2024-01-10 09:00:00 AM',
    ipAddress: '192.168.1.100'
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Certificate':
      return <FileText className="h-4 w-4" />
    case 'User':
    case 'Cohort':
      return <User className="h-4 w-4" />
    case 'Settings':
      return <Settings className="h-4 w-4" />
    default:
      return <Shield className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Certificate':
      return 'bg-blue-100 text-blue-600'
    case 'User':
      return 'bg-green-100 text-green-600'
    case 'Template':
      return 'bg-purple-100 text-purple-600'
    case 'Settings':
      return 'bg-orange-100 text-orange-600'
    case 'Cohort':
      return 'bg-teal-100 text-teal-600'
    case 'Signatory':
      return 'bg-pink-100 text-pink-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export default function AuditLogs() {
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Track all system activities and changes"
        action={
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit logs..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <select className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">All Categories</option>
              <option value="certificate">Certificate</option>
              <option value="user">User</option>
              <option value="template">Template</option>
              <option value="settings">Settings</option>
              <option value="cohort">Cohort</option>
            </select>
            <select className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">All Users</option>
              <option value="admin">Admin User</option>
              <option value="mike">Mike Johnson</option>
            </select>
            <Button variant="secondary">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <DataTable
          columns={[
            {
              header: 'Action',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getCategoryColor(row.category)}`}>
                    {getCategoryIcon(row.category)}
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">{row.action}</p>
                    <p className="text-xs text-gray-500 max-w-md truncate">{row.description}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Category',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(row.category)}`}>
                  {row.category}
                </span>
              )
            },
            { header: 'Performed By', accessor: 'performedBy' },
            { header: 'Timestamp', accessor: 'timestamp' },
            { header: 'IP Address', accessor: 'ipAddress' },
          ]}
          data={auditLogs}
        />
      </Card>
    </div>
  )
}
