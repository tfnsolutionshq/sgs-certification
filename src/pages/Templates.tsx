import { Plus, MoreVertical, Eye, Edit, Copy } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent } from '../components/Card'

const templates = [
  {
    id: 1,
    name: 'Standard Completion',
    description: 'Classic completion certificate with institution branding',
    category: 'Completion',
    lastModified: '2024-01-10',
    status: 'Active',
    previewColor: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    name: 'Achievement Gold',
    description: 'Premium gold-themed template for achievements',
    category: 'Achievement',
    lastModified: '2024-01-08',
    status: 'Active',
    previewColor: 'from-yellow-500 to-orange-500'
  },
  {
    id: 3,
    name: 'Workshop Standard',
    description: 'Simple template for workshop participation',
    category: 'Participation',
    lastModified: '2024-01-05',
    status: 'Active',
    previewColor: 'from-green-500 to-teal-500'
  },
  {
    id: 4,
    name: 'Professional Blue',
    description: 'Modern professional certificate design',
    category: 'Professional',
    lastModified: '2023-12-20',
    status: 'Active',
    previewColor: 'from-indigo-500 to-purple-500'
  },
  {
    id: 5,
    name: 'Honours Premium',
    description: 'Elegant design for honours and distinctions',
    category: 'Honours',
    lastModified: '2023-12-15',
    status: 'Draft',
    previewColor: 'from-purple-500 to-pink-500'
  },
  {
    id: 6,
    name: 'Minimalist Modern',
    description: 'Clean and simple modern design',
    category: 'General',
    lastModified: '2023-12-01',
    status: 'Active',
    previewColor: 'from-gray-600 to-gray-800'
  },
]

export default function Templates() {
  return (
    <div>
      <PageHeader
        title="Templates"
        description="Design and manage certificate templates"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-text-light">
          All Templates
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
          Completion
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
          Achievement
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
          Participation
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
          Professional
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
            {/* Preview Area */}
            <div className={`h-40 bg-gradient-to-br ${template.previewColor} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                  <p className="text-xs text-gray-500 mb-1">CERTIFICATE</p>
                  <p className="text-sm font-semibold text-gray-800">{template.name}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  template.status === 'Active' ? 'bg-white/90 text-green-700' : 'bg-white/90 text-gray-700'
                }`}>
                  {template.status}
                </span>
              </div>
            </div>
            
            <CardContent>
              <h3 className="font-semibold text-text-dark mb-1">{template.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{template.category}</span>
                <span>Modified {template.lastModified}</span>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
