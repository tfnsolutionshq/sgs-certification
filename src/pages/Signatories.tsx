import { Plus, MoreVertical, Upload, X, FileSpreadsheet } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardContent, CardHeader } from "../components/Card";
import DataTable from "../components/DataTable";
import { useRef, useState } from "react";
import { useAuth } from "../context/auth/AuthContextProvider";

const signatories = [
  {
    id: 1,
    name: "Dr. James Mitchell",
    title: "Dean, School of General Studies",
    email: "j.mitchell@sgs.edu",
    signatureUploaded: true,
    status: "Active",
  },
  {
    id: 2,
    name: "Prof. Sarah Chen",
    title: "Academic Director",
    email: "s.chen@sgs.edu",
    signatureUploaded: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    title: "Head of Certification",
    email: "m.brown@sgs.edu",
    signatureUploaded: true,
    status: "Active",
  },
  {
    id: 4,
    name: "Prof. David Lee",
    title: "Former Dean",
    email: "d.lee@sgs.edu",
    signatureUploaded: true,
    status: "Inactive",
  },
];

export default function Signatories() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSignatory, setNewSignatory] = useState<{
    signatoryName: string;
    email: string;
    signature: File | null;
  }>({
    signatoryName: "",
    email: "",
    signature: null,
  });

  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewSignatory({ ...newSignatory, signature: e.target.files[0] });
    }
  };

  const handleButtonClick = (e: React.FormEvent) => {
    console.log(newSignatory.signature);
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div>
      <PageHeader
        title="Signatories"
        description="Manage authorized certificate signatories"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Signatory
            </Button>
          )
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
              header: "Signatory",
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {row.name
                        .split(" ")
                        .slice(1)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.title}</p>
                  </div>
                </div>
              ),
            },
            { header: "Email", accessor: "email" },
            {
              header: "Signature",
              accessor: (row) =>
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
                ),
            },
            {
              header: "Status",
              accessor: (row) => (
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              header: "",
              accessor: () => (
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              ),
              className: "w-10",
            },
          ]}
          data={signatories}
        />
      </Card>

      {/* Add Signatory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 h-[70%] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Add a New Signatory
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
                  Name of Signatory
                </label>
                <input
                  type="text"
                  value={newSignatory.signatoryName}
                  onChange={(e) =>
                    setNewSignatory({
                      ...newSignatory,
                      signatoryName: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Standard Completion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={newSignatory.email}
                  onChange={(e) =>
                    setNewSignatory({
                      ...newSignatory,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter a brief description here..."
                />
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <p className="font-semibold text-text-dark">
                      Upload Signature
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-xl p-12 text-center transition-colors">
                      {newSignatory.signature ? (
                        <>
                          <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-500 mb-4">
                            {newSignatory.signature.name}
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
                            Click to upload signature (JPG, PNG, JPEG)
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
                  Add Signatory
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
