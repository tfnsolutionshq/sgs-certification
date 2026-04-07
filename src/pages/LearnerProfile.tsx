import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  GraduationCap,
  Award,
  Edit,
  Save,
  X,
  FileText,
  Download,
  Send,
  RefreshCw,
  Clock,
  CheckCircle,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";
import { useAuth } from "../context/auth/AuthContextProvider";

interface Certificate {
  id: number;
  number: string;
  type: string;
  issueDate: string;
  status: "Active" | "Revoked" | "Expired";
  version: number;
}

const learnerData = {
  id: 1,
  firstName: "John",
  middleName: "Michael",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 234 567 8900",
  cohort: "Batch 2024-A",
  program: "General Studies Diploma",
  status: "Active",
  joinedDate: "2024-01-10",
  lastActivity: "2024-01-15 10:30 AM",
};

const learnerCertificates: Certificate[] = [
  {
    id: 1,
    number: "CERT-2024-00001",
    type: "Certificate of Completion",
    issueDate: "2024-01-15",
    status: "Active",
    version: 1,
  },
  {
    id: 2,
    number: "CERT-2024-00050",
    type: "Certificate of Achievement",
    issueDate: "2024-01-20",
    status: "Active",
    version: 1,
  },
];

const activityLog = [
  {
    id: 1,
    action: "Certificate Retrieved",
    details: "CERT-2024-00001 downloaded via magic link",
    timestamp: "2024-01-15 10:30 AM",
  },
  {
    id: 2,
    action: "Magic Link Sent",
    details: "Access link sent to john.doe@email.com",
    timestamp: "2024-01-15 10:25 AM",
  },
  {
    id: 3,
    action: "Certificate Issued",
    details: "CERT-2024-00001 generated successfully",
    timestamp: "2024-01-15 09:00 AM",
  },
  {
    id: 4,
    action: "Profile Updated",
    details: "Name corrected by Admin User",
    timestamp: "2024-01-12 02:30 PM",
  },
  {
    id: 5,
    action: "User Created",
    details: "Imported via bulk upload",
    timestamp: "2024-01-10 09:00 AM",
  },
];

export default function LearnerProfile() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(learnerData);
  const [showResendModal, setShowResendModal] = useState(false);
  const { user } = useAuth();

  const handleSave = () => {
    console.log("Here is the edited data: ", editData);
    // In real app, save to backend with audit trail
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/users"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>
      </div>

      <PageHeader
        title={`${learnerData.firstName} ${learnerData.lastName}`}
        description={`${learnerData.program} - ${learnerData.cohort}`}
        action={
          <div className="flex gap-2">
            {(user?.role === "super admin" || user?.role === "admin") && (
              <Button
                variant="secondary"
                onClick={() => setShowResendModal(true)}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Magic Link
              </Button>
            )}
            <Button variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">
                  Profile Details
                </h3>
                {(user?.role === "super admin" || user?.role === "admin") &&
                  (!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 rounded hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="p-1.5 rounded hover:bg-gray-100"
                      >
                        <Save className="h-4 w-4 text-green-500" />
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="p-1.5 rounded hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary">
                    {learnerData.firstName[0]}
                    {learnerData.lastName[0]}
                  </span>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    learnerData.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {learnerData.status}
                </span>
              </div>

              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={editData.middleName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            middleName: e.target.value,
                          })
                        }
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) =>
                          setEditData({ ...editData, lastName: e.target.value })
                        }
                        className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-text-dark">
                          {learnerData.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Program</p>
                        <p className="text-sm font-medium text-text-dark">
                          {learnerData.program}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Cohort</p>
                        <p className="text-sm font-medium text-text-dark">
                          {learnerData.cohort}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-sm font-medium text-text-dark">
                          {learnerData.joinedDate}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center py-3">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text-dark">2</p>
                  <p className="text-xs text-gray-500">Certificates</p>
                </div>
                <div className="text-center py-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text-dark">2</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certificates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark">
                  Certificates
                </h3>
                {(user?.role === "super admin" || user?.role === "admin") && (
                  <Button size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Issue Certificate
                  </Button>
                )}
              </div>
            </CardHeader>
            <DataTable
              columns={[
                {
                  header: "Certificate",
                  accessor: (row) => (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-dark">
                          {row.number}
                        </p>
                        <p className="text-xs text-gray-500">{row.type}</p>
                      </div>
                    </div>
                  ),
                },
                { header: "Issue Date", accessor: "issueDate" },
                { header: "Version", accessor: (row) => `v${row.version}` },
                {
                  header: "Status",
                  accessor: (row) => (
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Revoked"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
                {
                  header: "Actions",
                  accessor: (row) => (
                    <div className="flex items-center gap-1">
                      <Link to={`/certificates/${row.id}`}>
                        <button
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="View"
                        >
                          <FileText className="h-4 w-4 text-gray-500" />
                        </button>
                      </Link>
                      <button
                        className="p-1.5 rounded hover:bg-gray-100"
                        title="Download"
                      >
                        <Download className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-gray-100"
                        title="Regenerate"
                      >
                        <RefreshCw className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  ),
                  className: "w-28",
                },
              ]}
              data={learnerCertificates}
            />
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">
                Activity Log
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-dark">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.details}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resend Magic Link Modal */}
      {showResendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowResendModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Send Magic Link
              </h3>
              <button
                onClick={() => setShowResendModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Send a secure access link to{" "}
                <strong>{learnerData.email}</strong> so they can retrieve their
                certificates.
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">
                  Link will expire in
                </p>
                <p className="font-medium text-text-dark">15 minutes</p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowResendModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setShowResendModal(false)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
