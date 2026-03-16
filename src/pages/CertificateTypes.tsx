import { Plus, MoreVertical, Award, FileText, Star } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent } from '../components/Card'

const certificateTypes = [
  {
    id: 1,
    name: 'Certificate of Completion',
    description: 'Awarded to learners who successfully complete a program',
    template: 'Standard Completion',
    issuedCount: 1247,
    status: 'Active',
    icon: Award,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    name: 'Certificate of Achievement',
    description: 'Awarded for outstanding performance in a program',
    template: 'Achievement Gold',
    issuedCount: 342,
    status: 'Active',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 3,
    name: 'Certificate of Participation',
    description: 'Awarded to participants of workshops and seminars',
    template: 'Workshop Standard',
    issuedCount: 856,
    status: 'Active',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 4,
    name: 'Professional Certificate',
    description: 'Awarded for completing professional development courses',
    template: 'Professional Blue',
    issuedCount: 189,
    status: 'Active',
    icon: Award,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    name: 'Honours Certificate',
    description: 'Awarded to top performers with distinction',
    template: 'Honours Premium',
    issuedCount: 78,
    status: 'Draft',
    icon: Star,
    color: 'bg-orange-100 text-orange-600'
  },
]

export default function CertificateTypes() {
  return (
    <div>
      <PageHeader
        title="Certificate Types"
        description="Manage different types of certificates issued by the institution"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate Type
          </Button>
        }
      />

      {/* Certificate Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificateTypes.map((type) => (
          <Card key={type.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${type.color}`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    type.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {type.status}
                  </span>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-text-dark mb-2">{type.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{type.description}</p>
              
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Template</span>
                  <span className="font-medium text-text-dark">{type.template}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Issued</span>
                  <span className="font-medium text-text-dark">{type.issuedCount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px] text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-600">Add New Type</h3>
            <p className="text-sm text-gray-400 mt-1">Create a new certificate type</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
