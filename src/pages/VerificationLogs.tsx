import { Search, Download, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

const verificationLogs = [
  {
    id: 1,
    certificateId: 'CERT-2024-00847',
    recipientName: 'John Doe',
    verifierName: 'ABC Corporation',
    verifierEmail: 'hr@abccorp.com',
    verifiedAt: '2024-01-15 10:30:25 AM',
    ipAddress: '192.168.1.100',
    status: 'Valid'
  },
  {
    id: 2,
    certificateId: 'CERT-2024-00832',
    recipientName: 'Jane Smith',
    verifierName: 'XYZ Tech Inc',
    verifierEmail: 'verify@xyztech.com',
    verifiedAt: '2024-01-15 09:15:42 AM',
    ipAddress: '10.0.0.55',
    status: 'Valid'
  },
  {
    id: 3,
    certificateId: 'CERT-FAKE-001',
    recipientName: 'Unknown',
    verifierName: 'Anonymous',
    verifierEmail: 'test@test.com',
    verifiedAt: '2024-01-14 04:45:18 PM',
    ipAddress: '172.16.0.1',
    status: 'Invalid'
  },
  {
    id: 4,
    certificateId: 'CERT-2023-01542',
    recipientName: 'Mike Johnson',
    verifierName: 'Global Recruiters',
    verifierEmail: 'team@globalrecruit.com',
    verifiedAt: '2024-01-14 02:30:00 PM',
    ipAddress: '192.168.2.50',
    status: 'Valid'
  },
  {
    id: 5,
    certificateId: 'CERT-2023-01200',
    recipientName: 'Sarah Wilson',
    verifierName: 'Tech Startup Ltd',
    verifierEmail: 'hr@techstartup.io',
    verifiedAt: '2024-01-14 11:20:33 AM',
    ipAddress: '10.10.10.10',
    status: 'Valid'
  },
  {
    id: 6,
    certificateId: 'CERT-2024-00801',
    recipientName: 'Tom Brown',
    verifierName: 'Enterprise Co',
    verifierEmail: 'verify@enterprise.co',
    verifiedAt: '2024-01-13 03:45:12 PM',
    ipAddress: '192.168.5.25',
    status: 'Expired'
  },
]

export default function VerificationLogs() {
  return (
    <div>
      <PageHeader
        title="Verification Logs"
        description="Track all certificate verification attempts"
        action={
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">892</p>
              <p className="text-xs text-gray-500">Total Verifications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">856</p>
              <p className="text-xs text-gray-500">Valid (96%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">24</p>
              <p className="text-xs text-gray-500">Invalid (2.7%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-xs text-gray-500">Expired (1.3%)</p>
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
              placeholder="Search by certificate ID or verifier..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <select className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">All Status</option>
              <option value="valid">Valid</option>
              <option value="invalid">Invalid</option>
              <option value="expired">Expired</option>
            </select>
            <Button variant="secondary">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <DataTable
          columns={[
            { header: 'Certificate ID', accessor: 'certificateId' },
            { header: 'Recipient', accessor: 'recipientName' },
            {
              header: 'Verifier',
              accessor: (row) => (
                <div>
                  <p className="font-medium text-text-dark">{row.verifierName}</p>
                  <p className="text-xs text-gray-500">{row.verifierEmail}</p>
                </div>
              )
            },
            { header: 'Verified At', accessor: 'verifiedAt' },
            { header: 'IP Address', accessor: 'ipAddress' },
            {
              header: 'Status',
              accessor: (row) => (
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                  row.status === 'Valid' ? 'bg-green-100 text-green-700' :
                  row.status === 'Invalid' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {row.status === 'Valid' && <CheckCircle className="h-3 w-3" />}
                  {row.status === 'Invalid' && <XCircle className="h-3 w-3" />}
                  {row.status === 'Expired' && <AlertCircle className="h-3 w-3" />}
                  {row.status}
                </span>
              )
            },
          ]}
          data={verificationLogs}
        />
      </Card>
    </div>
  )
}
