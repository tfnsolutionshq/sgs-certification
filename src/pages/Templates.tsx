import { useRef, useState } from "react";
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  X,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { useAuth } from "../context/auth/AuthContextProvider";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardContent, CardHeader } from "../components/Card";

type TemplateCategory =
  | "Completion"
  | "Achievement"
  | "Participation"
  | "Professional"
  | "Honours"
  | "General";

type FilterOption = "All Templates" | TemplateCategory;

const FILTER_OPTIONS: FilterOption[] = [
  "All Templates",
  "Completion",
  "Achievement",
  "Participation",
  "Professional",
];

const templates: {
  id: number;
  name: string;
  description: string;
  category: TemplateCategory;
  lastModified: string;
  status: string;
  previewColor: string;
}[] = [
  {
    id: 1,
    name: "Standard Completion",
    description: "Classic completion certificate with institution branding",
    category: "Completion",
    lastModified: "2024-01-10",
    status: "Active",
    previewColor: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    name: "Achievement Gold",
    description: "Premium gold-themed template for achievements",
    category: "Achievement",
    lastModified: "2024-01-08",
    status: "Active",
    previewColor: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    name: "Workshop Standard",
    description: "Simple template for workshop participation",
    category: "Participation",
    lastModified: "2024-01-05",
    status: "Active",
    previewColor: "from-green-500 to-teal-500",
  },
  {
    id: 4,
    name: "Professional Blue",
    description: "Modern professional certificate design",
    category: "Professional",
    lastModified: "2023-12-20",
    status: "Active",
    previewColor: "from-indigo-500 to-purple-500",
  },
  {
    id: 5,
    name: "Honours Premium",
    description: "Elegant design for honours and distinctions",
    category: "Honours",
    lastModified: "2023-12-15",
    status: "Draft",
    previewColor: "from-purple-500 to-pink-500",
  },
  {
    id: 6,
    name: "Minimalist Modern",
    description: "Clean and simple modern design",
    category: "General",
    lastModified: "2023-12-01",
    status: "Active",
    previewColor: "from-gray-600 to-gray-800",
  },
];

export default function Templates() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState<{
    uploadedFile: File | null;
    name: string;
    description: string;
    category: string;
  }>({
    uploadedFile: null,
    name: "",
    description: "",
    category: "",
  });
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] =
    useState<FilterOption>("All Templates");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates =
    activeFilter === "All Templates"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewTemplate({ ...newTemplate, uploadedFile: e.target.files[0] });
    }
  };

  const handleButtonClick = (e: React.FormEvent) => {
    console.log(newTemplate.uploadedFile);
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div>
      <PageHeader
        title="Templates"
        description="Design and manage certificate templates"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          )
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeFilter === filter
                ? "bg-primary text-text-light"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No templates found</p>
          <p className="text-sm mt-1">
            No templates are tagged under "{activeFilter}" yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Preview Area */}
              <div
                className={`h-40 bg-gradient-to-br ${template.previewColor} relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                    <p className="text-xs text-gray-500 mb-1">CERTIFICATE</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {template.name}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      template.status === "Active"
                        ? "bg-white/90 text-green-700"
                        : "bg-white/90 text-gray-700"
                    }`}
                  >
                    {template.status}
                  </span>
                </div>
              </div>

              <CardContent>
                <h3 className="font-semibold text-text-dark mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{template.category}</span>
                  <span>Modified {template.lastModified}</span>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  {(user?.role === "super admin" || user?.role === "admin") && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Template Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 h-[70%] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Create a New Template
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Template
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Standard Completion"
                />
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <p className="font-semibold text-text-dark">Upload File</p>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-xl p-12 text-center transition-colors">
                      {newTemplate.uploadedFile ? (
                        <>
                          <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-500 mb-4">
                            {newTemplate.uploadedFile.name}
                          </p>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            ref={fileInputRef}
                          />
                          <label htmlFor="file-upload">
                            <Button
                              onClick={(e) => handleButtonClick(e)}
                              className="cursor-pointer"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Change File
                            </Button>
                          </label>
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-500 mb-4">
                            Click to upload a template (JPG, PNG, JPEG)
                          </p>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            ref={fileInputRef}
                          />
                          <label htmlFor="file-upload">
                            <Button
                              onClick={(e) => handleButtonClick(e)}
                              className="cursor-pointer"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </Button>
                          </label>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newTemplate.description}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter a brief description here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newTemplate.category}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      category: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select a category</option>
                  <option value="Completion">Completion</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Participation">Participation</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Create Template
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
