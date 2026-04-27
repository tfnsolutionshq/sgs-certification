import { Plus, MoreVertical, Award, FileText, Star, X } from "lucide-react";
import { useAuth } from "../context/auth/AuthContextProvider";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardContent } from "../components/Card";
import { useState } from "react";

const certificateTypes = [
  {
    id: 1,
    name: "Certificate of Completion",
    description: "Awarded to learners who successfully complete a program",
    template: "Standard Completion",
    issuedCount: 1247,
    status: "Active",
    icon: Award,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    name: "Certificate of Achievement",
    description: "Awarded for outstanding performance in a program",
    template: "Achievement Gold",
    issuedCount: 342,
    status: "Active",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    name: "Certificate of Participation",
    description: "Awarded to participants of workshops and seminars",
    template: "Workshop Standard",
    issuedCount: 856,
    status: "Active",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    name: "Professional Certificate",
    description: "Awarded for completing professional development courses",
    template: "Professional Blue",
    issuedCount: 189,
    status: "Active",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    name: "Honours Certificate",
    description: "Awarded to top performers with distinction",
    template: "Honours Premium",
    issuedCount: 78,
    status: "Draft",
    icon: Star,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function CertificateTypes() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    program: "",
    description: "",
    template: "",
    signatureSet: "",
  });
  const { user } = useAuth();

  const certificateTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("the new certificate type: ", newCertificate);
  };

  return (
    <div>
      <PageHeader
        title="Certificate Types"
        description="Manage different types of certificates issued by the institution"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate Type
            </Button>
          )
        }
      />

      {/* Certificate Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificateTypes.map((type) => (
          <Card key={type.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${type.color}`}
                >
                  <type.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      type.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type.status}
                  </span>
                  {(user?.role === "super admin" || user?.role === "admin") && (
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-text-dark mb-2">{type.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{type.description}</p>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Template</span>
                  <span className="font-medium text-text-dark">
                    {type.template}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Issued</span>
                  <span className="font-medium text-text-dark">
                    {type.issuedCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        {(user?.role === "super admin" || user?.role === "admin") && (
          <Card
            className="border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
            onCardClick={() => setShowAddModal(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px] text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-600">Add New Type</h3>
              <p className="text-sm text-gray-400 mt-1">
                Create a new certificate type
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Certificate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Add a Certificate Type
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={certificateTypeSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program
                </label>
                <input
                  type="text"
                  value={newCertificate.program}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      program: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., General Studies Diploma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newCertificate.description}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter brief description of program here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <select
                  value={newCertificate.template}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      template: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select a template</option>
                  <option value="Standard Completion">
                    Standard Completion
                  </option>
                  <option value="Achievement Gold">Achievement Gold</option>
                  <option value="Workshop Standard">Workshop Standard</option>
                  <option value="Professional Blue">Professional Blue</option>
                  <option value="Honours Premium">Honours Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signature Set
                </label>
                <select
                  value={newCertificate.signatureSet}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      signatureSet: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select a signature set</option>
                  <option value="Dean + Director SGS">
                    Dean + Director SGS
                  </option>
                  <option value="Director Only">Director Only</option>
                  <option value="VC + Dean">VC + Dean</option>
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
                <Button className="flex-1" type="submit">
                  Create Certifcate Type
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
