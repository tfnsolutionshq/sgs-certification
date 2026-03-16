import { Plus, MoreVertical, Upload } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

const signatories = [
  {
    id: 1,
    name: 'Dr. James Mitchell',
    title: 'Dean, School of General Studies',
    email: 'j.mitchell@sgs.edu',
    signatureUploaded: true,
    certificateTypes: ['Completion', 'Achievement'],
    status: 'Active'
  },
  {
    id: 2,
    name: 'Prof. Sarah Chen',
    title: 'Academic Director',
    email: 's.chen@sgs.edu',
    signatureUploaded: true,
    certificateTypes: ['Professional', 'Honours'],
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    title: 'Head of Certification',
    email: 'm.brown@sgs.edu',
    signatureUploaded: true,
    certificateTypes: ['All Types'],
    status: 'Active'
  },
  {
    id: 4,
    name: 'Dr. Emily Watson',
    title: 'Program Coordinator',
    email: 'e.watson@sgs.edu',
    signatureUploaded: false,
    certificateTypes: ['Participation'],
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Prof. David Lee',
    title: 'Former Dean',
    email: 'd.lee@sgs.edu',
    signatureUploaded: true,
    certificateTypes: ['Completion'],
    status: 'Inactive'
  },
]

export default function Signatories() {
  return (
    <div>
      <PageHeader
        title="Signatories"
        description="Manage authorized certificate signatories"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Signatory
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-3xl font-bold text-text-dark">5</p>
            <p className="text-sm text-gray-500 mt-1">Total Signatories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-3xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-500 mt-1">Active Signatories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-3xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-gray-500 mt-1">Pending Setup</p>
          </CardContent>
        </Card>
      </div>

      {/* Signatories Table */}
      <Card>
        <DataTable
          columns={[
            {
              header: 'Signatory',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {row.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.title}</p>
                  </div>
                </div>
              )
            },
            { header: 'Email', accessor: 'email' },
            {
              header: 'Signature',
              accessor: (row) => (
                row.signatureUploaded ? (
                  <span className="inline-flex items-center gap-1 text-sm text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Uploaded
                  </span>
                ) : (
                  <button className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <Upload className="h-3 w-3" />
                    Upload
                  </button>
                )
              )
            },
            {
              header: 'Certificate Types',
              accessor: (row) => (
                <div className="flex flex-wrap gap-1">
                  {row.certificateTypes.map((type, index) => (
                    <span key={index} className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600">
                      {type}
                    </span>
                  ))}
                </div>
              )
            },
            {
              header: 'Status',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.status === 'Active' ? 'bg-green-100 text-green-700' :
                  row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {row.status}
                </span>
              )
            },
            {
              header: '',
              accessor: () => (
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              ),
              className: 'w-10'
            },
          ]}
          data={signatories}
        />
      </Card>
    </div>
  )
}
