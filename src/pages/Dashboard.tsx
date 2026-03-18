import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContextProvider";
import {
  Award,
  Users,
  CheckCircle,
  TrendingUp,
  PlayCircle,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";
import Button from "../components/Button";

const recentCertificates = [
  {
    id: 1,
    recipient: "John Doe",
    type: "Diploma",
    cohort: "Batch 2024-A",
    date: "2024-03-15",
    status: "Issued",
  },
  {
    id: 2,
    recipient: "Jane Smith",
    type: "Certificate",
    cohort: "Batch 2024-A",
    date: "2024-03-14",
    status: "Pending",
  },
  {
    id: 3,
    recipient: "Mike Johnson",
    type: "Transcript",
    cohort: "Batch 2023-C",
    date: "2024-03-13",
    status: "Issued",
  },
  {
    id: 4,
    recipient: "Sarah Wilson",
    type: "Diploma",
    cohort: "Batch 2024-B",
    date: "2024-03-12",
    status: "Processing",
  },
  {
    id: 5,
    recipient: "Tom Brown",
    type: "Certificate",
    cohort: "Batch 2023-B",
    date: "2024-03-11",
    status: "Issued",
  },
];

const recentVerifications = [
  {
    id: 1,
    certificateId: "CERT-2024-001234",
    verifier: "ABC Company",
    method: "Link",
    date: "2024-03-15 10:30 AM",
    status: "Valid",
  },
  {
    id: 2,
    certificateId: "CERT-2024-001235",
    verifier: "XYZ Corp",
    method: "QR",
    date: "2024-03-15 09:15 AM",
    status: "Valid",
  },
  {
    id: 3,
    certificateId: "CERT-2023-000150",
    verifier: "Tech Inc",
    method: "ID",
    date: "2024-03-14 04:45 PM",
    status: "Valid",
  },
  {
    id: 4,
    certificateId: "CERT-2023-000789",
    verifier: "Unknown",
    method: "Link",
    date: "2024-03-14 02:30 PM",
    status: "Revoked",
  },
];

const activeJobs = [
  {
    id: "JOB-001",
    name: "Batch 2024-A Diplomas",
    progress: 67,
    total: 156,
    status: "processing",
  },
  {
    id: "JOB-002",
    name: "Batch 2024-B Certificates",
    progress: 0,
    total: 89,
    status: "queued",
  },
];

const issuanceTrends = [
  { month: "Oct", count: 145 },
  { month: "Nov", count: 178 },
  { month: "Dec", count: 134 },
  { month: "Jan", count: 189 },
  { month: "Feb", count: 156 },
  { month: "Mar", count: 212 },
];

export default function Dashboard() {
  const { user } = useAuth();

  const maxIssuance = Math.max(...issuanceTrends.map((i) => i.count));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your certificate management system"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Link to="#">
              <Button>
                <PlayCircle className="h-4 w-4 mr-2" />
                New Generation Job
              </Button>
            </Link>
          )
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Certificates"
          value="1,247"
          icon={Award}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Learners"
          value="599"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Verifications Today"
          value="47"
          icon={CheckCircle}
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value="98.4%"
          icon={TrendingUp}
          trend={{ value: 0.8, isPositive: true }}
        />
      </div>

      {/* Active Jobs Alert */}
      {activeJobs.length > 0 && (
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <PlayCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-dark">
                    Active Generation Jobs
                  </h3>
                  <p className="text-sm text-gray-500">
                    {activeJobs.filter((j) => j.status === "processing").length}{" "}
                    processing,{" "}
                    {activeJobs.filter((j) => j.status === "queued").length}{" "}
                    queued
                  </p>
                </div>
              </div>
              <Link to="#">
                <Button variant="secondary" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-dark">
                        {job.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${job.status === "processing" ? "bg-primary" : "bg-gray-300"}`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      job.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {job.status === "processing" ? "Processing" : "Queued"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-dark">
                Certificate Issuance
              </h3>
              <span className="text-sm text-gray-500">Last 6 months</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {issuanceTrends.map((item) => {
                const height = (item.count / maxIssuance) * 100;
                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    <span className="text-xs text-gray-500 mb-1">
                      {item.count}
                    </span>
                    <div
                      className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Total this period:{" "}
                <span className="font-semibold text-text-dark">1,014</span>
              </span>
              <Link
                to="#"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View detailed report <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-dark">
                Cohort Overview
              </h3>
              <Link
                to="/cohorts"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Batch 2024-A",
                  program: "General Studies",
                  students: 156,
                  issued: 142,
                  color: "bg-green-500",
                },
                {
                  name: "Batch 2024-B",
                  program: "Advanced Certificate",
                  students: 89,
                  issued: 0,
                  color: "bg-yellow-500",
                },
                {
                  name: "Batch 2023-C",
                  program: "General Studies",
                  students: 142,
                  issued: 142,
                  color: "bg-green-500",
                },
              ].map((cohort) => {
                const progress = (cohort.issued / cohort.students) * 100;
                return (
                  <div key={cohort.name} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text-dark">
                          {cohort.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {cohort.issued}/{cohort.students}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${cohort.color}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">
              Recent Certificates
            </h3>
            <Link to="#" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <DataTable
            columns={[
              { header: "Recipient", accessor: "recipient" },
              { header: "Type", accessor: "type" },
              { header: "Cohort", accessor: "cohort" },
              {
                header: "Status",
                accessor: (row) => (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.status === "Issued"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : row.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
            data={recentCertificates}
          />
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">
              Recent Verifications
            </h3>
            <Link to="#" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <DataTable
            columns={[
              { header: "Certificate ID", accessor: "certificateId" },
              { header: "Verifier", accessor: "verifier" },
              { header: "Method", accessor: "method" },
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
            data={recentVerifications}
          />
        </Card>
      </div>
    </div>
  );
}
