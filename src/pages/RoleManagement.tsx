import { useState } from 'react'
import { Plus, MoreVertical, Shield, Edit, Trash2, X, Check, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'
import DataTable from '../components/DataTable'

interface Admin {
  id: number
  name: string
  email: string
  role: 'Super Admin' | 'Admin' | 'Read-only Admin'
  status: 'Active' | 'Inactive' | 'Locked'
  lastLogin: string
  createdAt: string
}

const admins: Admin[] = [
  { id: 1, name: 'Dr. James Mitchell', email: 'j.mitchell@sgs.edu', role: 'Super Admin', status: 'Active', lastLogin: '2024-01-15 10:30 AM', createdAt: '2023-01-01' },
  { id: 2, name: 'Sarah Chen', email: 's.chen@sgs.edu', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 09:15 AM', createdAt: '2023-03-15' },
  { id: 3, name: 'Mike Johnson', email: 'm.johnson@sgs.edu', role: 'Admin', status: 'Active', lastLogin: '2024-01-14 04:45 PM', createdAt: '2023-06-20' },
  { id: 4, name: 'Emily Watson', email: 'e.watson@sgs.edu', role: 'Read-only Admin', status: 'Active', lastLogin: '2024-01-14 02:30 PM', createdAt: '2023-09-10' },
  { id: 5, name: 'David Lee', email: 'd.lee@sgs.edu', role: 'Admin', status: 'Locked', lastLogin: '2024-01-10 11:00 AM', createdAt: '2023-04-05' },
  { id: 6, name: 'Amanda White', email: 'a.white@sgs.edu', role: 'Read-only Admin', status: 'Inactive', lastLogin: '2023-12-20 03:00 PM', createdAt: '2023-07-15' },
]

const roles = [
  {
    name: 'Super Admin',
    description: 'Full access to all features including user management and security settings',
    permissions: ['Manage Admins', 'Security Settings', 'All Certificate Operations', 'Template Activation', 'Audit Logs', 'System Configuration'],
    color: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Admin',
    description: 'Can manage certificates, users, and templates but cannot modify security settings',
    permissions: ['Certificate Operations', 'User Management', 'Template Management', 'Bulk Uploads', 'View Audit Logs'],
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Read-only Admin',
    description: 'View-only access for monitoring operations without editing capabilities',
    permissions: ['View Certificates', 'View Users', 'View Templates', 'View Audit Logs', 'View Reports'],
    color: 'bg-gray-100 text-gray-700',
  },
]

export default function RoleManagement() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' as const })

  return (
    <div>
      <PageHeader
        title="Role Management"
        description="Manage admin accounts and role permissions"
        action={
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">6</p>
              <p className="text-sm text-gray-500">Total Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Super Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">4</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">1</p>
              <p className="text-sm text-gray-500">Locked</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                  {role.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm) => (
                    <span key={perm} className="inline-flex px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admins Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-text-dark">Admin Accounts</h3>
        </CardHeader>
        <DataTable
          columns={[
            {
              header: 'Admin',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </div>
              )
            },
            {
              header: 'Role',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                  row.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {row.role}
                </span>
              )
            },
            {
              header: 'Status',
              accessor: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  row.status === 'Active' ? 'bg-green-100 text-green-700' :
                  row.status === 'Locked' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {row.status}
                </span>
              )
            },
            { header: 'Last Login', accessor: 'lastLogin' },
            { header: 'Created', accessor: 'createdAt' },
            {
              header: 'Actions',
              accessor: (row) => (
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-gray-100" title="Edit">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  {row.role !== 'Super Admin' && (
                    <button className="p-1.5 rounded hover:bg-gray-100" title="Delete">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                  <button className="p-1.5 rounded hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ),
              className: 'w-28'
            },
          ]}
          data={admins}
        />
      </Card>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">Add New Admin</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="admin@sgs.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as 'Admin' })}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="Admin">Admin</option>
                  <option value="Read-only Admin">Read-only Admin</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowAddModal(false)}>
                  Add Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
