import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Upload, Save, Eye, Settings, Type, Image, QrCode, 
  FileSignature, Move, Trash2, Plus, X, AlertTriangle, Check
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardHeader, CardContent } from '../components/Card'

interface FieldMapping {
  id: string
  name: string
  type: 'text' | 'date' | 'qrcode' | 'signature' | 'image'
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  fontWeight?: string
  alignment?: 'left' | 'center' | 'right'
}

const templateData = {
  id: 1,
  name: 'Standard Completion',
  description: 'Classic completion certificate with institution branding',
  category: 'Completion',
  status: 'Active',
  version: '2.1',
  lastModified: '2024-01-10',
  modifiedBy: 'Admin User',
}

const initialFields: FieldMapping[] = [
  { id: 'recipient_name', name: 'Recipient Name', type: 'text', x: 50, y: 40, width: 300, height: 30, fontSize: 24, fontWeight: 'bold', alignment: 'center' },
  { id: 'program_name', name: 'Program Name', type: 'text', x: 50, y: 50, width: 300, height: 20, fontSize: 14, alignment: 'center' },
  { id: 'issue_date', name: 'Issue Date', type: 'date', x: 30, y: 70, width: 100, height: 16, fontSize: 12, alignment: 'left' },
  { id: 'cert_number', name: 'Certificate Number', type: 'text', x: 70, y: 70, width: 100, height: 16, fontSize: 12, alignment: 'right' },
  { id: 'qr_code', name: 'QR Code', type: 'qrcode', x: 85, y: 75, width: 50, height: 50 },
  { id: 'signature_1', name: 'Signature 1', type: 'signature', x: 20, y: 80, width: 80, height: 30 },
  { id: 'signature_2', name: 'Signature 2', type: 'signature', x: 60, y: 80, width: 80, height: 30 },
]

const availableFields = [
  { id: 'recipient_name', name: 'Recipient Name', type: 'text' },
  { id: 'recipient_email', name: 'Recipient Email', type: 'text' },
  { id: 'program_name', name: 'Program Name', type: 'text' },
  { id: 'cohort_name', name: 'Cohort Name', type: 'text' },
  { id: 'issue_date', name: 'Issue Date', type: 'date' },
  { id: 'expiry_date', name: 'Expiry Date', type: 'date' },
  { id: 'cert_number', name: 'Certificate Number', type: 'text' },
  { id: 'verification_url', name: 'Verification URL', type: 'text' },
  { id: 'qr_code', name: 'QR Code', type: 'qrcode' },
  { id: 'signature_1', name: 'Signature 1', type: 'signature' },
  { id: 'signature_2', name: 'Signature 2', type: 'signature' },
  { id: 'logo', name: 'Institution Logo', type: 'image' },
  { id: 'watermark', name: 'Watermark', type: 'image' },
]

export default function TemplateEditor() {
  const { id } = useParams()
  const [fields, setFields] = useState<FieldMapping[]>(initialFields)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [templateStatus, setTemplateStatus] = useState<'Draft' | 'Active' | 'Archived'>('Active')

  const selectedFieldData = fields.find(f => f.id === selectedField)

  const updateField = (fieldId: string, updates: Partial<FieldMapping>) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, ...updates } : f))
  }

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId))
    setSelectedField(null)
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/templates" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Link>
      </div>

      <PageHeader
        title={templateData.name}
        description={`Version ${templateData.version} - ${templateData.category}`}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={() => setShowSaveModal(true)}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Field List */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Template Info</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={templateStatus}
                  onChange={(e) => setTemplateStatus(e.target.value as 'Draft' | 'Active' | 'Archived')}
                  className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Completion</option>
                  <option>Achievement</option>
                  <option>Participation</option>
                  <option>Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Background Image</label>
                <button className="w-full h-20 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center text-gray-500 text-sm">
                  <Upload className="h-5 w-5 mb-1" />
                  Upload PDF/Image
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">Fields</h3>
                <span className="text-xs text-gray-500">{fields.length} mapped</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    selectedField === field.id 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {field.type === 'text' && <Type className="h-4 w-4" />}
                  {field.type === 'date' && <Type className="h-4 w-4" />}
                  {field.type === 'qrcode' && <QrCode className="h-4 w-4" />}
                  {field.type === 'signature' && <FileSignature className="h-4 w-4" />}
                  {field.type === 'image' && <Image className="h-4 w-4" />}
                  <span className="flex-1 truncate">{field.name}</span>
                </button>
              ))}
              
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/5 border border-dashed border-gray-200 mt-4">
                <Plus className="h-4 w-4" />
                Add Field
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Center - Canvas */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">Template Canvas</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded hover:bg-gray-100" title="Move">
                    <Move className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-gray-100" title="Settings">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Certificate Canvas Placeholder */}
              <div className="aspect-[1.414/1] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-gray-200 relative overflow-hidden">
                {/* Template Background */}
                <div className="absolute inset-4 bg-white rounded shadow-lg p-8">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="text-xs text-gray-400 tracking-widest mb-2">SCHOOL OF GENERAL STUDIES</div>
                      <div className="text-lg font-bold text-gray-800 mb-1">CERTIFICATE OF COMPLETION</div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <p className="text-xs text-gray-500 mb-1">This is to certify that</p>
                      <div 
                        className={`text-xl font-bold text-gray-800 mb-2 px-4 py-1 border-2 border-dashed rounded cursor-pointer ${
                          selectedField === 'recipient_name' ? 'border-primary bg-primary/5' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedField('recipient_name')}
                      >
                        [Recipient Name]
                      </div>
                      <p className="text-xs text-gray-500 mb-1">has successfully completed the</p>
                      <div 
                        className={`text-sm font-medium text-gray-700 px-4 py-1 border-2 border-dashed rounded cursor-pointer ${
                          selectedField === 'program_name' ? 'border-primary bg-primary/5' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedField('program_name')}
                      >
                        [Program Name]
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-end mt-auto">
                      <div className="text-center">
                        <div className="w-20 h-8 border-b border-gray-400 mb-1"></div>
                        <p className="text-xs text-gray-500">Dean</p>
                      </div>
                      <div 
                        className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center cursor-pointer ${
                          selectedField === 'qr_code' ? 'border-primary bg-primary/5' : 'border-gray-300'
                        }`}
                        onClick={() => setSelectedField('qr_code')}
                      >
                        <QrCode className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-8 border-b border-gray-400 mb-1"></div>
                        <p className="text-xs text-gray-500">Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Field Properties */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">Field Properties</h3>
            </CardHeader>
            <CardContent>
              {selectedFieldData ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Field Name</label>
                    <p className="font-medium text-text-dark">{selectedFieldData.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">X Position (%)</label>
                      <input
                        type="number"
                        value={selectedFieldData.x}
                        onChange={(e) => updateField(selectedFieldData.id, { x: parseInt(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Y Position (%)</label>
                      <input
                        type="number"
                        value={selectedFieldData.y}
                        onChange={(e) => updateField(selectedFieldData.id, { y: parseInt(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Width</label>
                      <input
                        type="number"
                        value={selectedFieldData.width}
                        onChange={(e) => updateField(selectedFieldData.id, { width: parseInt(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Height</label>
                      <input
                        type="number"
                        value={selectedFieldData.height}
                        onChange={(e) => updateField(selectedFieldData.id, { height: parseInt(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {selectedFieldData.type === 'text' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Font Size</label>
                        <input
                          type="number"
                          value={selectedFieldData.fontSize || 12}
                          onChange={(e) => updateField(selectedFieldData.id, { fontSize: parseInt(e.target.value) })}
                          className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Alignment</label>
                        <select
                          value={selectedFieldData.alignment || 'left'}
                          onChange={(e) => updateField(selectedFieldData.id, { alignment: e.target.value as 'left' | 'center' | 'right' })}
                          className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => removeField(selectedFieldData.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 border border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Field
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a field to edit its properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowSaveModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">Save Template</h3>
              <button onClick={() => setShowSaveModal(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Saving will create a new version (v2.2). Existing certificates will retain the version used at issuance.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Version Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe changes in this version..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowSaveModal(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as v2.2
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
