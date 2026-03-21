import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContextProvider";
import {
  Plus,
  MoreVertical,
  Users,
  Calendar,
  GraduationCap,
  Play,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardContent } from "../components/Card";

const cohorts = [
  {
    id: 1,
    name: "2024 Cohort",
    program: "General Studies Diploma",
    batches: 3,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "Active",
    generated: 142,
    pending: 10,
    errors: 4,
  },
  {
    id: 2,
    name: "2023 Cohort",
    program: "Advanced Certificate",
    batches: 2,
    startDate: "2024-02-01",
    endDate: "2024-07-15",
    status: "Active",
    generated: 0,
    pending: 89,
    errors: 0,
  },
  {
    id: 3,
    name: "2022 Cohort",
    program: "General Studies Diploma",
    batches: 2,
    startDate: "2023-07-01",
    endDate: "2023-12-15",
    status: "Completed",
    generated: 142,
    pending: 0,
    errors: 0,
  },
  {
    id: 4,
    name: "2021 Cohort",
    program: "Professional Certificate",
    batches: 2,
    startDate: "2023-04-01",
    endDate: "2023-09-30",
    status: "Completed",
    generated: 78,
    pending: 0,
    errors: 0,
  },
  {
    id: 5,
    name: "2020 Cohort",
    program: "General Studies Diploma",
    batches: 0,
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    status: "Completed",
    generated: 134,
    pending: 0,
    errors: 0,
  },
];

export default function Cohorts() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCohort, setNewCohort] = useState({
    name: "",
    program: "",
    startDate: "",
    endDate: "",
  });
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title="Cohorts"
        description="Manage student cohorts and batches"
        action={
          (user?.role === "super admin" || user?.role === "admin") && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Cohort
            </Button>
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">5</p>
              <p className="text-sm text-gray-500">Total Cohorts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">2</p>
              <p className="text-sm text-gray-500">Active Cohorts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cohorts.map((cohort) => (
          <Card key={cohort.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <Link
                  to={`/cohorts/${cohort.id}`}
                  className="hover:text-primary"
                >
                  <h3 className="font-semibold text-text-dark">
                    {cohort.name}
                  </h3>
                </Link>
                {(user?.role === "super admin" || user?.role === "admin") && (
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Batches</span>
                  <span className="font-medium text-text-dark">
                    {cohort.batches === 1 && `${cohort.batches} batch`}
                    {cohort.batches === 0 && "No batches"}
                    {cohort.batches > 1 && `${cohort.batches} batches`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      cohort.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cohort.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <Link to={`/cohorts/${cohort.id}`} className="flex-1">
                  <Button variant="secondary" className="w-full" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Cohort Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Create New Cohort
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
                  Cohort Name
                </label>
                <input
                  type="text"
                  value={newCohort.name}
                  onChange={(e) =>
                    setNewCohort({ ...newCohort, name: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., 2026 Cohort"
                />
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
                  Create Cohort
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
