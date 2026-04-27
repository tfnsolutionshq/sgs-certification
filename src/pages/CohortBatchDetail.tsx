import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContextProvider";
import {
  ArrowLeft,
  Users,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Send,
  MoreVertical,
  Download,
  RefreshCw,
  FileText,
  X,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";

interface CohortUser {
  id: number;
  name: string;
  email: string;
  program: string;
  certificateStatus: "Generated" | "Pending" | "Error" | "Not Started";
  certificateNumber?: string;
}

const cohortData = {
  id: 1,
  name: "2024 Cohort - Batch A",
  program: "General Studies Diploma",
  description: "First batch of 2024 for the General Studies Diploma program",
  students: 156,
  startDate: "2024-01-15",
  endDate: "2024-06-30",
  status: "Active",
  certificateType: "Certificate of Completion",
  generationStatus: "Partial",
  generated: 142,
  pending: 10,
  errors: 4,
  createdAt: "2024-01-10",
  createdBy: "Admin User",
};

const cohortUsers: CohortUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    program: "General Studies",
    certificateStatus: "Generated",
    certificateNumber: "CERT-2024-00001",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    program: "General Studies",
    certificateStatus: "Generated",
    certificateNumber: "CERT-2024-00002",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    program: "General Studies",
    certificateStatus: "Pending",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    program: "General Studies",
    certificateStatus: "Error",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@email.com",
    program: "General Studies",
    certificateStatus: "Generated",
    certificateNumber: "CERT-2024-00003",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.d@email.com",
    program: "General Studies",
    certificateStatus: "Generated",
    certificateNumber: "CERT-2024-00004",
  },
  {
    id: 7,
    name: "Chris Lee",
    email: "chris.lee@email.com",
    program: "General Studies",
    certificateStatus: "Not Started",
  },
  {
    id: 8,
    name: "Amanda White",
    email: "amanda.w@email.com",
    program: "General Studies",
    certificateStatus: "Generated",
    certificateNumber: "CERT-2024-00005",
  },
];

export default function CohortDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const canManage = user?.role === "super admin" || user?.role === "admin";

  const handleGenerate = () => {
    setGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setShowGenerateModal(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to={`/cohorts/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <PageHeader
        title={cohortData.name}
        description={cohortData.description}
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <div className="flex gap-2">
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowGenerateModal(true)}>
                <Send className="h-4 w-4 mr-2" />
                Issue Certificates
              </Button>
            </div>
          )
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="text-center py-4">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-dark">
              {cohortData.students}
            </p>
            <p className="text-xs text-gray-500">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">
              {cohortData.generated}
            </p>
            <p className="text-xs text-gray-500">Generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <Clock className="h-5 w-5 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">
              {cohortData.pending}
            </p>
            <p className="text-xs text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <AlertCircle className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">
              {cohortData.errors}
            </p>
            <p className="text-xs text-gray-500">Errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-text-dark">
              {cohortData.startDate}
            </p>
            <p className="text-xs text-gray-500">Start Date</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-4">
            <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-text-dark">
              {cohortData.endDate}
            </p>
            <p className="text-xs text-gray-500">End Date</p>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-dark">
              Cohort Details
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="font-medium text-text-dark">
                  {cohortData.program}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Certificate Type</p>
                <p className="font-medium text-text-dark">
                  {cohortData.certificateType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    cohortData.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cohortData.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium text-text-dark">
                  {cohortData.createdAt} by {cohortData.createdBy}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-dark">
              Generation Progress
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-text-dark">
                  {Math.round(
                    (cohortData.generated / cohortData.students) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${(cohortData.generated / cohortData.students) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                {cohortData.generated} of {cohortData.students} certificates
                generated
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">Students</h3>
            <div className="flex gap-2">
              <select className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm">
                <option value="">All Status</option>
                <option value="generated">Generated</option>
                <option value="pending">Pending</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <DataTable
          columns={[
            {
              header: "Student",
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {row.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-dark">{row.name}</p>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </div>
              ),
            },
            { header: "Program", accessor: "program" },
            {
              header: "Certificate Number",
              accessor: (row) => row.certificateNumber || "-",
            },
            {
              header: "Status",
              accessor: (row) => (
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    row.certificateStatus === "Generated"
                      ? "bg-green-100 text-green-700"
                      : row.certificateStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : row.certificateStatus === "Error"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {row.certificateStatus}
                </span>
              ),
            },
            ...(canManage
              ? [
                  {
                    header: "Actions",
                    accessor: (row: CohortUser) => (
                      <div className="flex items-center gap-1">
                        {row.certificateStatus === "Error" && (
                          <button
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Retry"
                          >
                            <RefreshCw className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                        {row.certificateStatus === "Generated" && (
                          <button
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="View Certificate"
                          >
                            <FileText className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                        <button className="p-1.5 rounded hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    ),
                    className: "w-24",
                  },
                ]
              : []),
          ]}
          data={cohortUsers}
        />
      </Card>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => !generating && setShowGenerateModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Issue Certificates
              </h3>
              {!generating && (
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>

            {generating ? (
              <div className="space-y-4">
                <div className="text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="font-medium text-text-dark">
                    Issuing Certificates...
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please wait while we issue the certificates
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{generationProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  You are about to issue certificates for{" "}
                  <strong>
                    {cohortData.pending +
                      (cohortData.students -
                        cohortData.generated -
                        cohortData.pending -
                        cohortData.errors)}
                  </strong>{" "}
                  students in <strong>{cohortData.name}</strong>.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Certificate Type</span>
                    <span className="font-medium">
                      {cohortData.certificateType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Students to Process</span>
                    <span className="font-medium">
                      {cohortData.students - cohortData.generated}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    This will issue PDF certificates via email notifications to
                    all recipients.
                  </p>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowGenerateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleGenerate}>
                    <Send className="h-4 w-4 mr-2" />
                    Start Issuance
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
