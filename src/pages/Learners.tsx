import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MoreVertical,
  Download,
  Upload,
  Eye,
  Send,
  Edit,
  X,
} from "lucide-react";
import { useAuth } from "../context/auth/AuthContextProvider";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card from "../components/Card";
import DataTable from "../components/DataTable";

const learners = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    cohort: "Batch 2024-A",
    program: "General Studies Diploma",
    status: "Active",
    joined: "2024-01-10",
    certificates: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    cohort: "Batch 2024-A",
    program: "General Studies Diploma",
    status: "Active",
    joined: "2024-01-10",
    certificates: 1,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    cohort: "Batch 2024-B",
    program: "Advanced Certificate",
    status: "Active",
    joined: "2024-02-01",
    certificates: 0,
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@email.com",
    cohort: "Batch 2023-C",
    program: "General Studies Diploma",
    status: "Inactive",
    joined: "2023-07-01",
    certificates: 1,
  },
  {
    id: 7,
    name: "Chris Lee",
    email: "chris.lee@email.com",
    cohort: "Batch 2024-A",
    program: "General Studies Diploma",
    status: "Active",
    joined: "2024-01-10",
    certificates: 1,
  },
];

type Learner = (typeof learners)[number];

export default function Learners() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cohortFilter, setCohortFilter] = useState("");

  const canManage = user?.role === "super admin" || user?.role === "admin";

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setProgramFilter("");
    setStatusFilter("");
    setCohortFilter("");
  };

  const hasActiveFilters =
    searchQuery || programFilter || statusFilter || cohortFilter;

  // Filtering logic
  const filteredLearners = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return learners.filter((learner) => {
      // Search: match against name, email, cohort, program
      if (q) {
        const matchesSearch =
          learner.name.toLowerCase().includes(q) ||
          learner.email.toLowerCase().includes(q) ||
          learner.cohort.toLowerCase().includes(q) ||
          learner.program.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Program filter
      if (
        programFilter &&
        learner.program.toLowerCase() !== programFilter.toLowerCase()
      ) {
        return false;
      }

      // Cohort filter — compare against the select value (e.g. "batch-2024-a")
      if (cohortFilter) {
        const normalizedCohort = learner.cohort
          .toLowerCase()
          .replace(/\s+/g, "-");
        if (normalizedCohort !== cohortFilter) return false;
      }

      // Status filter
      if (
        statusFilter &&
        learner.status.toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, programFilter, statusFilter, cohortFilter]);

  return (
    <div>
      <PageHeader
        title="Eligible Learners"
        description="Manage learners and their certificate eligibility"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <div className="flex gap-2">
              <Link to="/bulk-upload">
                <Button variant="secondary">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
              </Link>
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          )
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email, name, cohort, or program..."
              className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Programs</option>
              <option value="General Studies Diploma">
                General Studies Diploma
              </option>
              <option value="Advanced Certificate">Advanced Certificate</option>
              <option value="Professional Certificate">
                Professional Certificate
              </option>
            </select>

            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Cohorts</option>
              <option value="batch-2024-a">Batch 2024-A</option>
              <option value="batch-2024-b">Batch 2024-B</option>
              <option value="batch-2023-c">Batch 2023-C</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Clear all filters — only shown when something is active */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {searchQuery && (
              <FilterChip
                label={`Search: "${searchQuery}"`}
                onRemove={() => setSearchQuery("")}
              />
            )}
            {programFilter && (
              <FilterChip
                label={`Program: ${capitalize(programFilter)}`}
                onRemove={() => setProgramFilter("")}
              />
            )}
            {cohortFilter && (
              <FilterChip
                label={`Cohort: ${formatCohort(cohortFilter)}`}
                onRemove={() => setCohortFilter("")}
              />
            )}
            {statusFilter && (
              <FilterChip
                label={`Status: ${capitalize(statusFilter)}`}
                onRemove={() => setStatusFilter("")}
              />
            )}
          </div>
        )}
      </Card>

      {/* Learners Table */}
      <Card>
        <DataTable
          columns={[
            {
              header: "User",
              accessor: (row: Learner) => (
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
                    <Link
                      to={`/learners/${row.id}`}
                      className="font-medium text-text-dark hover:text-primary"
                    >
                      {row.name}
                    </Link>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </div>
              ),
            },
            { header: "Cohort", accessor: "cohort" },
            { header: "Program", accessor: "program" },
            {
              header: "Certificates",
              accessor: "certificates",
              className: "w-24",
            },
            {
              header: "Status",
              accessor: (row: Learner) => (
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            { header: "Joined", accessor: "joined" },
            ...(canManage
              ? [
                  {
                    header: "Actions",
                    accessor: (row: Learner) => (
                      <div className="flex items-center gap-1">
                        <Link to={`/learners/${row.id}`}>
                          <button
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="View Profile"
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </button>
                        </Link>
                        <button
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>

                        <button
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="Send Magic Link"
                        >
                          <Send className="h-4 w-4 text-gray-500" />
                        </button>

                        <button className="p-1.5 rounded hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    ),
                    className: "w-32",
                  },
                ]
              : []),
          ]}
          data={filteredLearners}
        />

        {filteredLearners.length === 0 && (
          <div className="py-16 text-center">
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">
              No learners found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="mt-4 text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredLearners.length} of {learners.length} learners
            {hasActiveFilters && " (filtered)"}
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm rounded border border-primary bg-primary text-white">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** "batch-2024-a" → "Batch 2024-A" */
function formatCohort(value: string) {
  return value
    .split("-")
    .map((part) => part.toUpperCase())
    .join(" ")
    .replace(/^BATCH/, "Batch");
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 hover:text-primary/70 transition-colors"
        aria-label={`Remove filter: ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
