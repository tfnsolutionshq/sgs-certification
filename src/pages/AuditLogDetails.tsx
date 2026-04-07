import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  Settings,
  Shield,
  PlayCircle,
  RefreshCcw,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Hash,
  Tag,
  Layers,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";

// ── Types ────────────────────────────────────────────────────────────────────

interface FieldChange {
  field: string;
  previousValue: string;
  newValue: string;
}

interface AuditLogEntry {
  id: number;
  action: string;
  type: "Action" | "Change";
  description: string;
  performedBy: string;
  performedByRole: string;
  category: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  status: "Success" | "Failed" | "Pending";
  targetEntity?: string;
  targetEntityId?: string;
  changes?: FieldChange[];
  notes?: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const auditLogDetails: Record<number, AuditLogEntry> = {
  1: {
    id: 1,
    action: "Certificate Issued",
    type: "Action",
    description: "Certificate CERT-2024-00847 issued to John Doe",
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "Certificate",
    timestamp: "2024-01-15 10:30:25 AM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "Certificate",
    targetEntityId: "CERT-2024-00847",
    notes:
      "Certificate generated using the Standard Completion template with Dean + Director signature set.",
  },
  2: {
    id: 2,
    action: "User Created",
    type: "Action",
    description: "New learner account created for jane.smith@email.com",
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "User",
    timestamp: "2024-01-15 09:45:12 AM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "User",
    targetEntityId: "USR-2024-0298",
    notes: "User imported manually. Assigned to Batch 2024-B cohort.",
  },
  3: {
    id: 3,
    action: "Template Modified",
    type: "Change",
    description: 'Template "Standard Completion" updated',
    performedBy: "Mike Johnson",
    performedByRole: "Editor",
    category: "Template",
    timestamp: "2024-01-14 04:30:00 PM",
    ipAddress: "10.0.0.22",
    userAgent: "Firefox 121.0 / macOS Sonoma",
    sessionId: "sess_4d7n1q0yz8",
    status: "Success",
    targetEntity: "Template",
    targetEntityId: "TMPL-0003",
    changes: [
      {
        field: "Font Family",
        previousValue: "Georgia",
        newValue: "Playfair Display",
      },
      {
        field: "Footer Text",
        previousValue: "© 2023 Institute of General Studies",
        newValue: "© 2024 Institute of General Studies",
      },
      {
        field: "Border Colour",
        previousValue: "#1A3C5E",
        newValue: "#21618C",
      },
    ],
  },
  4: {
    id: 4,
    action: "Settings Changed",
    type: "Change",
    description: "Email notification settings updated",
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "Settings",
    timestamp: "2024-01-14 02:15:30 PM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "System Settings",
    targetEntityId: "SETTINGS-NOTIFICATIONS",
    changes: [
      {
        field: "Certificate Issued Notification",
        previousValue: "Disabled",
        newValue: "Enabled",
      },
      {
        field: "Notification Delay",
        previousValue: "Immediate",
        newValue: "15 minutes",
      },
    ],
  },
  5: {
    id: 5,
    action: "Cohort Created",
    type: "Action",
    description: 'New cohort "Batch 2024-B" created with 89 students',
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "Cohort",
    timestamp: "2024-01-14 11:00:00 AM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "Cohort",
    targetEntityId: "COHORT-2024-B",
    notes:
      "Cohort created for the second intake of the 2024 academic session. 89 learners pre-enrolled via bulk CSV import.",
  },
  6: {
    id: 6,
    action: "Signatory Added",
    type: "Action",
    description: "Dr. Emily Watson added as signatory",
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "Signatory",
    timestamp: "2024-01-13 03:45:00 PM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "Signatory",
    targetEntityId: "SIG-0005",
    notes:
      "Dr. Emily Watson (Head of Department) added to the system as a signatory. Pending signature upload.",
  },
  7: {
    id: 7,
    action: "Certificate Revoked",
    type: "Action",
    description: "Certificate CERT-2023-00521 revoked - Duplicate issuance",
    performedBy: "Mike Johnson",
    performedByRole: "Editor",
    category: "Certificate",
    timestamp: "2024-01-13 10:20:15 AM",
    ipAddress: "10.0.0.22",
    userAgent: "Firefox 121.0 / macOS Sonoma",
    sessionId: "sess_4d7n1q0yz8",
    status: "Success",
    targetEntity: "Certificate",
    targetEntityId: "CERT-2023-00521",
    notes:
      "Revoked due to duplicate issuance. Original certificate CERT-2023-00498 remains active. Learner notified via email.",
  },
  8: {
    id: 8,
    action: "Bulk Import",
    type: "Action",
    description: "156 learners imported to Batch 2024-A",
    performedBy: "Admin User",
    performedByRole: "Administrator",
    category: "User",
    timestamp: "2024-01-10 09:00:00 AM",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0 / Windows 11",
    sessionId: "sess_8f3k2m9xp1",
    status: "Success",
    targetEntity: "Cohort",
    targetEntityId: "COHORT-2024-A",
    notes:
      "156 of 160 records imported successfully. 4 records skipped due to duplicate email addresses.",
  },
};

// ── Helper functions (mirrors AuditLogs.tsx) ──────────────────────────────────

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Certificate":
      return <FileText className="h-4 w-4" />;
    case "User":
    case "Cohort":
      return <User className="h-4 w-4" />;
    case "Settings":
      return <Settings className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Certificate":
      return "bg-blue-100 text-blue-600";
    case "User":
      return "bg-green-100 text-green-600";
    case "Template":
      return "bg-purple-100 text-purple-600";
    case "Settings":
      return "bg-orange-100 text-orange-600";
    case "Cohort":
      return "bg-teal-100 text-teal-600";
    case "Signatory":
      return "bg-pink-100 text-pink-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusConfig = (status: AuditLogEntry["status"]) => {
  switch (status) {
    case "Success":
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        className: "bg-green-100 text-green-700",
        label: "Success",
      };
    case "Failed":
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        className: "bg-red-100 text-red-700",
        label: "Failed",
      };
    case "Pending":
      return {
        icon: <Clock className="h-4 w-4" />,
        className: "bg-yellow-100 text-yellow-700",
        label: "Pending",
      };
  }
};

// ── Page Component ────────────────────────────────────────────────────────────

export default function AuditLogDetail() {
  const { id } = useParams();
  const log = auditLogDetails[Number(id)];

  // Graceful fallback if ID not found
  if (!log) {
    return (
      <div>
        <div className="mb-6">
          <Link
            to="/audit-logs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Audit Logs
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
            <Info className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-text-dark mb-1">
            Log entry not found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The audit log entry you're looking for doesn't exist or may have
            been removed.
          </p>
          <Link to="/audit-logs">
            <Button variant="secondary">Return to Audit Logs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(log.status);

  return (
    <div>
      {/* Back navigation */}
      <div className="mb-6">
        <Link
          to="/audit-logs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Audit Logs
        </Link>
      </div>

      <PageHeader
        title={log.action}
        description={log.description}
        action={
          <div className="flex items-center gap-2">
            {/* Action type badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${
                log.type === "Action"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {log.type === "Action" ? (
                <PlayCircle className="h-3.5 w-3.5" />
              ) : (
                <RefreshCcw className="h-3.5 w-3.5" />
              )}
              {log.type}
            </span>

            {/* Status badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${statusConfig.className}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left column: summary card ───────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-dark">
                Log Summary
              </h3>
            </CardHeader>
            <CardContent>
              {/* Category icon */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl mb-3 ${getCategoryColor(log.category)}`}
                >
                  <span className="scale-150">
                    {getCategoryIcon(log.category)}
                  </span>
                </div>
                <span
                  className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(log.category)}`}
                >
                  {log.category}
                </span>
              </div>

              {/* Summary fields */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                  <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Performed By</p>
                    <p className="text-sm font-medium text-text-dark">
                      {log.performedBy}
                    </p>
                    <p className="text-xs text-gray-400">
                      {log.performedByRole}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <p className="text-sm font-medium text-text-dark">
                      {log.timestamp}
                    </p>
                  </div>
                </div>

                {log.targetEntity && (
                  <div className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                    <Tag className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="text-sm font-medium text-text-dark">
                        {log.targetEntity}
                      </p>
                      <p className="text-xs text-gray-400">
                        {log.targetEntityId}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                  <Hash className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Log ID</p>
                    <p className="text-sm font-medium text-text-dark font-mono">
                      #{String(log.id).padStart(6, "0")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5">
                  <Layers className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Session ID</p>
                    <p className="text-sm font-medium text-text-dark font-mono break-all">
                      {log.sessionId}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right column: changes + notes ───────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Changes diff table — only shown for "Change" type logs */}
          {log.type === "Change" && log.changes && log.changes.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-text-dark">
                    Fields Changed
                  </h3>
                  <span className="ml-auto inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {log.changes.length}{" "}
                    {log.changes.length === 1 ? "change" : "changes"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {log.changes.map((change, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-100 overflow-hidden"
                    >
                      {/* Field name header */}
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          {change.field}
                        </p>
                      </div>

                      {/* Before / After */}
                      <div className="grid grid-cols-2 divide-x divide-gray-100">
                        <div className="px-4 py-3">
                          <p className="text-xs text-gray-400 mb-1 font-medium">
                            Before
                          </p>
                          <p className="text-sm text-red-600 bg-red-50 rounded px-2 py-1 font-mono break-all">
                            {change.previousValue}
                          </p>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-xs text-gray-400 mb-1 font-medium">
                            After
                          </p>
                          <p className="text-sm text-green-700 bg-green-50 rounded px-2 py-1 font-mono break-all">
                            {change.newValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action details card — for non-change action logs */}
          {log.type === "Action" && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-text-dark">
                    Action Details
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                      Description
                    </p>
                    <p className="text-sm text-text-dark">{log.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-100 p-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Action Type
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                        <PlayCircle className="h-3 w-3" />
                        Action
                      </span>
                    </div>

                    <div className="rounded-lg border border-gray-100 p-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Outcome
                      </p>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusConfig.className}`}
                      >
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
