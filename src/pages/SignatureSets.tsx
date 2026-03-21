import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Users,
  Edit,
  Trash2,
  X,
  Check,
  Layers,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";

interface SignatureSet {
  id: number;
  name: string;
  description: string;
  signatories: string[];
  certificateTypes: string[];
  status: "Active" | "Inactive";
  createdAt: string;
  lastUsed: string;
}

const signatureSets: SignatureSet[] = [
  {
    id: 1,
    name: "Dean + Director SGS",
    description: "Standard signature set for completion certificates",
    signatories: ["Dr. James Mitchell (Dean)", "Prof. Sarah Chen (Director)"],
    certificateTypes: ["Completion", "Achievement"],
    status: "Active",
    createdAt: "2023-01-15",
    lastUsed: "2024-01-15",
  },
  {
    id: 2,
    name: "Director Only",
    description: "Single signature for participation certificates",
    signatories: ["Prof. Sarah Chen (Director)"],
    certificateTypes: ["Participation"],
    status: "Active",
    createdAt: "2023-03-20",
    lastUsed: "2024-01-10",
  },
  {
    id: 3,
    name: "VC + Dean",
    description: "Executive signatures for honours certificates",
    signatories: [
      "Prof. David Lee (Vice Chancellor)",
      "Dr. James Mitchell (Dean)",
    ],
    certificateTypes: ["Honours", "Professional"],
    status: "Active",
    createdAt: "2023-06-01",
    lastUsed: "2024-01-08",
  },
  {
    id: 4,
    name: "Legacy Set (2023)",
    description: "Previous year signature configuration",
    signatories: [
      "Dr. Robert Wilson (Former Dean)",
      "Prof. Sarah Chen (Director)",
    ],
    certificateTypes: [],
    status: "Inactive",
    createdAt: "2022-01-01",
    lastUsed: "2023-12-31",
  },
];

const availableSignatories = [
  {
    id: 1,
    name: "Dr. James Mitchell",
    title: "Dean, School of General Studies",
  },
  { id: 2, name: "Prof. Sarah Chen", title: "Academic Director" },
  { id: 3, name: "Dr. Michael Brown", title: "Head of Certification" },
  { id: 4, name: "Prof. David Lee", title: "Vice Chancellor" },
];

export default function SignatureSets() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSet, setNewSet] = useState({
    name: "",
    description: "",
    signatories: [] as number[],
  });

  const toggleSignatory = (id: number) => {
    setNewSet((prev) => ({
      ...prev,
      signatories: prev.signatories.includes(id)
        ? prev.signatories.filter((s) => s !== id)
        : [...prev.signatories, id],
    }));
  };

  return (
    <div>
      <PageHeader
        title="Signature Sets"
        description="Create and manage signature combinations for certificates"
        action={
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Signature Set
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">4</p>
              <p className="text-sm text-gray-500">Total Sets</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">3</p>
              <p className="text-sm text-gray-500">Active Sets</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">4</p>
              <p className="text-sm text-gray-500">Signatories</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signature Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {signatureSets.map((set) => (
          <Card key={set.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-dark">{set.name}</h3>
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        set.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {set.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{set.description}</p>
                </div>
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Signatories
                  </p>
                  <div className="space-y-1">
                    {set.signatories.map((sig, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-700">{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {set.certificateTypes.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      Used In
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {set.certificateTypes.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Last used: {set.lastUsed}</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-gray-100">
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                    {set.status === "Inactive" && (
                      <button className="p-1.5 rounded hover:bg-gray-100">
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Signature Set Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Create Signature Set
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
                  Set Name
                </label>
                <input
                  type="text"
                  value={newSet.name}
                  onChange={(e) =>
                    setNewSet({ ...newSet, name: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Dean + Director"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newSet.description}
                  onChange={(e) =>
                    setNewSet({ ...newSet, description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Describe when this set should be used..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Signatories
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableSignatories.map((sig) => (
                    <label
                      key={sig.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        newSet.signatories.includes(sig.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newSet.signatories.includes(sig.id)}
                        onChange={() => toggleSignatory(sig.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-medium text-text-dark">{sig.name}</p>
                        <p className="text-xs text-gray-500">{sig.title}</p>
                      </div>
                    </label>
                  ))}
                </div>
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
                  Create Set
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
