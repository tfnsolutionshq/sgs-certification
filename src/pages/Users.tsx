import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, MoreVertical, Download, Upload, Eye, Send, Edit } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable from '../components/DataTable'

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'Learner', cohort: 'Batch 2024-A', program: 'General Studies', status: 'Active', joined: '2024-01-10', certificates: 2 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', role: 'Learner', cohort: 'Batch 2024-A', program: 'General Studies', status: 'Active', joined: '2024-01-10', certificates: 1 },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', role: 'Admin', cohort: '-', program: '-', status: 'Active', joined: '2023-06-15', certificates: 0 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.w@email.com', role: 'Learner', cohort: 'Batch 2024-B', program: 'Advanced Certificate', status: 'Active', joined: '2024-02-01', certificates: 0 },
  { id: 5, name: 'Tom Brown', email: 'tom.brown@email.com', role: 'Learner', cohort: 'Batch 2023-C', program: 'General Studies', status: 'Inactive', joined: '2023-07-01', certificates: 1 },
  { id: 6, name: 'Emily Davis', email: 'emily.d@email.com', role: 'Verifier', cohort: '-', program: '-', status: 'Active', joined: '2023-09-20', certificates: 0 },
  { id: 7, name: 'Chris Lee', email: 'chris.lee@email.com', role: 'Learner', cohort: 'Batch 2024-A', program: 'General Studies', status: 'Active', joined: '2024-01-10', certificates: 1 },
  { id: 8, name: 'Amanda White', email: 'amanda.w@email.com', role: 'Admin', cohort: '-', program: '-', status: 'Active', joined: '2023-03-05', certificates: 0 },
]

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [cohortFilter, setCohortFilter] = useState('')

  return (
    <div>
      <PageHeader
        title="Eligible Users"
        description="Manage learners and their certificate eligibility"
        action={
          <div className="flex gap-2">
            <Link to="/bulk-upload">
              <Button variant="secondary">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </Link>
            <Button variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email, name, cohort, or program..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="learner">Learner</option>
              <option value="verifier">Verifier</option>
            </select>
            <select 
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Cohorts</option>
              <option value="batch-2024-a">Batch 2024-A</option>
              <option value="batch-2024-b">Batch 2024-B</option>
              <option value="batch-2023-c">Batch 2023-C</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="secondary">
              <Filter className="h-4 w-4 mr-2" />
              More
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <DataTable
          columns={[
            {
              header: 'User',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {row.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <Link to={`/users/${row.id}`} className="font-medium text-text-dark hover:text-primary">
                      {row.name}
                    </Link>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Role',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                  row.role === 'Verifier' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {row.role}
                </span>
              )
            },
            { header: 'Cohort', accessor: 'cohort' },
            { header: 'Program', accessor: 'program' },
            { header: 'Certificates', accessor: 'certificates', className: 'w-24' },
            {
              header: 'Status',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {row.status}
                </span>
              )
            },
            { header: 'Joined', accessor: 'joined' },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex items-center gap-1">
                  <Link to={`/users/${row.id}`}>
                    <button className="p-1.5 rounded hover:bg-gray-100" title="View Profile">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                  </Link>
                  <button className="p-1.5 rounded hover:bg-gray-100" title="Edit">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  {row.role === 'Learner' && (
                    <button className="p-1.5 rounded hover:bg-gray-100" title="Send Magic Link">
                      <Send className="h-4 w-4 text-gray-500" />
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
          data={users}
        />
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-8 of 1,234 users</p>
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
