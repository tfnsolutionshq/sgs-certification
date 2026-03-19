import { useState, useRef } from "react";
import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../context/auth/AuthContextProvider";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";

interface UploadHistory {
  id: number;
  fileName: string;
  cohort: string;
  uploadedBy: string;
  uploadedAt: string;
  totalRecords: number;
  created: number;
  updated: number;
  failed: number;
  status: "Completed" | "Processing" | "Failed";
}

const uploadHistory: UploadHistory[] = [
  {
    id: 1,
    fileName: "batch_2024a_students.xlsx",
    cohort: "Batch 2024-A",
    uploadedBy: "Admin User",
    uploadedAt: "2024-01-15 10:30 AM",
    totalRecords: 156,
    created: 150,
    updated: 4,
    failed: 2,
    status: "Completed",
  },
  {
    id: 2,
    fileName: "batch_2024b_import.csv",
    cohort: "Batch 2024-B",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2024-01-14 02:15 PM",
    totalRecords: 89,
    created: 89,
    updated: 0,
    failed: 0,
    status: "Completed",
  },
  {
    id: 3,
    fileName: "corrections_jan2024.xlsx",
    cohort: "Batch 2023-C",
    uploadedBy: "Mike Johnson",
    uploadedAt: "2024-01-13 11:45 AM",
    totalRecords: 12,
    created: 0,
    updated: 12,
    failed: 0,
    status: "Completed",
  },
  {
    id: 4,
    fileName: "new_enrollments.csv",
    cohort: "Batch 2024-A",
    uploadedBy: "Admin User",
    uploadedAt: "2024-01-12 09:00 AM",
    totalRecords: 25,
    created: 20,
    updated: 3,
    failed: 2,
    status: "Completed",
  },
];

const requiredFields = [
  {
    name: "email",
    description: "Learner email address (unique identifier)",
    required: true,
  },
  { name: "first_name", description: "Learner first name", required: true },
  {
    name: "last_name",
    description: "Learner surname/last name",
    required: true,
  },
  {
    name: "middle_name",
    description: "Learner middle name (optional)",
    required: false,
  },
  { name: "program", description: "Program name or code", required: true },
  { name: "cohort", description: "Cohort identifier", required: false },
  {
    name: "issue_date",
    description: "Certificate issue date (YYYY-MM-DD)",
    required: false,
  },
];

export default function BulkUpload() {
  const [step, setStep] = useState<
    "upload" | "configure" | "preview" | "result"
  >("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [duplicateHandling, setDuplicateHandling] = useState<
    "merge" | "create" | "reject"
  >("merge");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [processing, setProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { user } = useAuth();

  // Simulated preview data
  const previewData = [
    {
      row: 1,
      email: "john.doe@email.com",
      first_name: "John",
      last_name: "Doe",
      program: "General Studies",
      status: "Valid",
    },
    {
      row: 2,
      email: "jane.smith@email.com",
      first_name: "Jane",
      last_name: "Smith",
      program: "General Studies",
      status: "Valid",
    },
    {
      row: 3,
      email: "invalid-email",
      first_name: "Mike",
      last_name: "Johnson",
      program: "General Studies",
      status: "Invalid Email",
    },
    {
      row: 4,
      email: "sarah.w@email.com",
      first_name: "",
      last_name: "Wilson",
      program: "General Studies",
      status: "Missing First Name",
    },
    {
      row: 5,
      email: "tom.brown@email.com",
      first_name: "Tom",
      last_name: "Brown",
      program: "General Studies",
      status: "Valid",
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setStep("configure");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setStep("configure");
    }
  };

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("result");
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setStep("upload");
    setSelectedCohort("");
  };

  return (
    <div>
      <PageHeader
        title="Bulk Upload"
        description="Import learners from CSV or XLSX files"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Button variant="secondary" onClick={() => {}}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          )
        }
      />

      {/* Progress Steps */}
      {(user?.role === "super admin" || user?.role === "admin") && (
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {["Upload", "Configure", "Preview", "Result"].map(
              (label, index) => {
                const stepNames = [
                  "upload",
                  "configure",
                  "preview",
                  "result",
                ] as const;
                const isActive = stepNames.indexOf(step) >= index;
                const isCurrent = step === stepNames[index];

                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`ml-2 text-sm ${isActive ? "text-text-dark font-medium" : "text-gray-500"}`}
                    >
                      {label}
                    </span>
                    {index < 3 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${isActive && stepNames.indexOf(step) > index ? "bg-primary" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(user?.role === "super admin" || user?.role === "admin") && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-text-dark">
                    Upload File
                  </h3>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-text-dark mb-2">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse (CSV, XLSX)
                    </p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      ref={fileInputRef}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        onClick={handleButtonClick}
                        className="cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div
            className={
              user?.role === "super admin" || user?.role === "admin"
                ? "lg:col-span-1"
                : "lg:col-span-3"
            }
          >
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-text-dark">
                  Required Fields
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {requiredFields.map((field) => (
                  <div key={field.name} className="flex items-start gap-2">
                    {field.required ? (
                      <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700">
                        REQ
                      </span>
                    ) : (
                      <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600">
                        OPT
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-medium text-text-dark">
                        {field.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {field.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Step 2: Configure */}
      {step === "configure" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-dark">
                Configure Upload
              </h3>
              <button
                onClick={resetUpload}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Change file
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FileText className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium text-text-dark">
                  {uploadedFile?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {uploadedFile?.size
                    ? `${(uploadedFile.size / 1024).toFixed(1)} KB`
                    : ""}
                </p>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Cohort
                </label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select a cohort</option>
                  <option value="batch-2024-a">Batch 2024-A</option>
                  <option value="batch-2024-b">Batch 2024-B</option>
                  <option value="batch-2023-c">Batch 2023-C</option>
                  <option value="new">Create New Cohort</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duplicate Handling
                </label>
                <select
                  value={duplicateHandling}
                  onChange={(e) =>
                    setDuplicateHandling(
                      e.target.value as "merge" | "create" | "reject",
                    )
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="merge">Merge with existing records</option>
                  <option value="create">Create separate entries</option>
                  <option value="reject">Reject duplicates</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {duplicateHandling === "merge" &&
                    "Update existing records if email matches"}
                  {duplicateHandling === "create" &&
                    "Create new records even if email exists"}
                  {duplicateHandling === "reject" &&
                    "Skip records with existing emails"}
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={resetUpload}>
                Cancel
              </Button>
              <Button onClick={() => setStep("preview")}>Preview Data</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preview */}
      {step === "preview" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-dark">
                  Preview & Validate
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Review data before importing
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">3 valid</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-gray-600">2 errors</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <DataTable
            columns={[
              { header: "Row", accessor: "row", className: "w-16" },
              { header: "Email", accessor: "email" },
              { header: "First Name", accessor: "first_name" },
              { header: "Last Name", accessor: "last_name" },
              { header: "Program", accessor: "program" },
              {
                header: "Status",
                accessor: (row) => (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.status === "Valid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
            data={previewData}
          />
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
                <span>
                  2 records have validation errors and will be skipped
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setStep("configure")}
                >
                  Back
                </Button>
                <Button
                  onClick={handleProcess}
                  variant={processing ? "loading" : "primary"}
                >
                  {processing ? "Processing..." : "Import 3 Records"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 4: Result */}
      {step === "result" && (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-dark mb-2">
              Import Completed
            </h3>
            <p className="text-gray-500 mb-6">
              Your data has been successfully imported
            </p>

            <div className="max-w-sm mx-auto bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Records Created</span>
                <span className="font-medium text-green-600">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Records Failed</span>
                <span className="font-medium text-red-600">2</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={() => {}}>
                <Download className="h-4 w-4 mr-2" />
                Download Error Report
              </Button>
              <Button onClick={resetUpload}>Upload Another File</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload History */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-dark">
              Upload History
            </h3>
          </CardHeader>
          <DataTable
            columns={[
              {
                header: "File",
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-text-dark">
                        {row.fileName}
                      </p>
                      <p className="text-xs text-gray-500">{row.cohort}</p>
                    </div>
                  </div>
                ),
              },
              { header: "Uploaded By", accessor: "uploadedBy" },
              { header: "Date", accessor: "uploadedAt" },
              {
                header: "Results",
                accessor: (row) => (
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-600">
                      {row.created} created
                    </span>
                    <span className="text-red-600">{row.failed} failed</span>
                  </div>
                ),
              },
              {
                header: "Status",
                accessor: (row) => (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
            data={uploadHistory}
          />
        </Card>
      </div>
    </div>
  );
}
