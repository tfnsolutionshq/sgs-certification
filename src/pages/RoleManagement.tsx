import { useState, useEffect } from "react";
import { useAuth } from "../context/auth/AuthContextProvider";
import { Plus, Shield, Edit, Trash2, X, Users, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card, { CardHeader, CardContent } from "../components/Card";
import DataTable from "../components/DataTable";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: "super admin" | "admin" | "read-only admin";
  lastLogin: string;
  createdAt: string;
}

// ============================================================
// MOCK DATA — remove once the backend is ready
// ============================================================
const MOCK_ADMINS: Admin[] = [
  {
    id: 1,
    name: "Dr. James Mitchell",
    email: "j.mitchell@sgs.edu",
    role: "super admin",
    lastLogin: "2024-01-15 10:30 AM",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "s.chen@sgs.edu",
    role: "admin",
    lastLogin: "2024-01-15 09:15 AM",
    createdAt: "2023-03-15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "m.johnson@sgs.edu",
    role: "admin",
    lastLogin: "2024-01-14 04:45 PM",
    createdAt: "2023-06-20",
  },
  {
    id: 4,
    name: "Emily Watson",
    email: "e.watson@sgs.edu",
    role: "read-only admin",
    lastLogin: "2024-01-14 02:30 PM",
    createdAt: "2023-09-10",
  },
  {
    id: 5,
    name: "David Lee",
    email: "d.lee@sgs.edu",
    role: "admin",
    lastLogin: "2024-01-10 11:00 AM",
    createdAt: "2023-04-05",
  },
  {
    id: 6,
    name: "Amanda White",
    email: "a.white@sgs.edu",
    role: "read-only admin",
    lastLogin: "2023-12-20 03:00 PM",
    createdAt: "2023-07-15",
  },
];

// ============================================================
// ADMIN SERVICE
// Swap the mock implementations below for real fetch() calls
// once your backend endpoint is available. The component code
// never changes — only this block.
//
// Each method should match this shape when using a real API:
//
//   fetchAdmins: async () => {
//     const res = await fetch("/api/admins", {
//       headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     if (!res.ok) throw new Error("Failed to fetch admins");
//     return res.json() as Promise<Admin[]>;
//   },
//
//   createAdmin: async (payload) => {
//     const res = await fetch("/api/admins", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Failed to create admin");
//     return res.json() as Promise<Admin>;
//   },
//
//   updateAdmin: async (id, payload) => {
//     const res = await fetch(`/api/admins/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Failed to update admin");
//     return res.json() as Promise<Admin>;
//   },
//
//   deleteAdmin: async (id) => {
//     const res = await fetch(`/api/admins/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     if (!res.ok) throw new Error("Failed to delete admin");
//   },
// ============================================================
let _mockAdmins = [...MOCK_ADMINS]; // in-memory store for mock mutations

const adminService = {
  fetchAdmins: async (): Promise<Admin[]> => {
    // TODO: replace with → fetch("/api/admins")
    await new Promise((r) => setTimeout(r, 600)); // simulated network delay
    return [..._mockAdmins];
  },

  createAdmin: async (
    payload: Pick<Admin, "name" | "email" | "role">,
  ): Promise<Admin> => {
    // TODO: replace with → fetch("/api/admins", { method: "POST", body: ... })
    await new Promise((r) => setTimeout(r, 400));
    const created: Admin = {
      id:
        _mockAdmins.length > 0
          ? Math.max(..._mockAdmins.map((a) => a.id)) + 1
          : 1,
      ...payload,
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    };
    _mockAdmins = [..._mockAdmins, created];
    return created;
  },

  updateAdmin: async (
    id: number,
    payload: Partial<Pick<Admin, "name" | "email" | "role">>,
  ): Promise<Admin> => {
    // TODO: replace with → fetch(`/api/admins/${id}`, { method: "PATCH", body: ... })
    await new Promise((r) => setTimeout(r, 400));
    const existing = _mockAdmins.find((a) => a.id === id);
    if (!existing) throw new Error(`Admin with id ${id} not found`);
    const updated = { ...existing, ...payload };
    _mockAdmins = _mockAdmins.map((a) => (a.id === id ? updated : a));
    return updated;
  },

  deleteAdmin: async (id: number): Promise<void> => {
    // TODO: replace with → fetch(`/api/admins/${id}`, { method: "DELETE" })
    await new Promise((r) => setTimeout(r, 400));
    _mockAdmins = _mockAdmins.filter((a) => a.id !== id);
  },
};

// ============================================================

const roles = [
  {
    name: "Super Admin",
    description:
      "Full access to all features including user management and security settings",
    permissions: [
      "Manage Admins",
      "Security Settings",
      "All Certificate Operations",
      "Template Activation",
      "Audit Logs",
      "System Configuration",
    ],
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Admin",
    description:
      "Can manage certificates, users, and templates but cannot modify security settings",
    permissions: [
      "Certificate Operations",
      "User Management",
      "Template Management",
      "Bulk Uploads",
      "View Audit Logs",
    ],
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Read-only Admin",
    description:
      "View-only access for monitoring operations without editing capabilities",
    permissions: [
      "View Certificates",
      "View Users",
      "View Templates",
      "View Audit Logs",
      "View Reports",
    ],
    color: "bg-gray-100 text-gray-700",
  },
];

export default function RoleManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "admin" as Admin["role"],
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingAdmin, setIsDeletingAdmin] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState<Admin | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "admin" as Admin["role"],
  });

  const { user } = useAuth();
  const canManage = user?.role === "super admin" || user?.role === "admin";

  // Derived stats
  const totalAdmins = admins.length;
  const superAdmins = admins.filter((a) => a.role === "super admin").length;

  // ── Load admins on mount ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingAdmins(true);
        setFetchError(null);
        const data = await adminService.fetchAdmins();
        if (!cancelled) setAdmins(data);
      } catch (err) {
        if (!cancelled)
          setFetchError(
            err instanceof Error ? err.message : "Failed to load admins.",
          );
      } finally {
        if (!cancelled) setLoadingAdmins(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Create ────────────────────────────────────────────────
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmittingAdd(true);
      const created = await adminService.createAdmin(newAdmin);
      setAdmins((prev) => [...prev, created]);
      setNewAdmin({ name: "", email: "", role: "admin" });
      setShowAddModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create admin.");
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────
  const openDeleteModal = (admin: Admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!adminToDelete) return;
    try {
      setIsDeletingAdmin(true);
      await adminService.deleteAdmin(adminToDelete.id);
      setAdmins((prev) => prev.filter((a) => a.id !== adminToDelete.id));
      setShowDeleteModal(false);
      setAdminToDelete(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete admin.");
    } finally {
      setIsDeletingAdmin(false);
    }
  };

  const cancelDelete = () => {
    if (isDeletingAdmin) return;
    setShowDeleteModal(false);
    setAdminToDelete(null);
  };

  // ── Edit ──────────────────────────────────────────────────
  const openEditModal = (admin: Admin) => {
    setAdminToEdit(admin);
    setEditForm({ name: admin.name, email: admin.email, role: admin.role });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToEdit) return;
    try {
      setIsSubmittingEdit(true);
      const updated = await adminService.updateAdmin(adminToEdit.id, editForm);
      setAdmins((prev) =>
        prev.map((a) => (a.id === adminToEdit.id ? updated : a)),
      );
      setShowEditModal(false);
      setAdminToEdit(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update admin.");
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const cancelEdit = () => {
    if (isSubmittingEdit) return;
    setShowEditModal(false);
    setAdminToEdit(null);
  };

  return (
    <div>
      <PageHeader
        title="Role Management"
        description="Manage admin accounts and role permissions"
        action={
          canManage && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">{totalAdmins}</p>
              <p className="text-sm text-gray-500">Total Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-dark">{superAdmins}</p>
              <p className="text-sm text-gray-500">Super Admins</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${role.color}`}
                >
                  {role.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Permissions:
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="inline-flex px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admins Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-text-dark">
            Admin Accounts
          </h3>
        </CardHeader>

        {loadingAdmins ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading admins…</span>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <p className="text-sm text-red-500">{fetchError}</p>
            <Button
              variant="secondary"
              onClick={async () => {
                try {
                  setLoadingAdmins(true);
                  setFetchError(null);
                  const data = await adminService.fetchAdmins();
                  setAdmins(data);
                } catch (err) {
                  setFetchError(
                    err instanceof Error
                      ? err.message
                      : "Failed to load admins.",
                  );
                } finally {
                  setLoadingAdmins(false);
                }
              }}
            >
              Retry
            </Button>
          </div>
        ) : (
          <DataTable
            columns={[
              {
                header: "Admin",
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {row.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-text-dark">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                  </div>
                ),
              },
              {
                header: "Role",
                accessor: (row) => (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.role === "super admin"
                        ? "bg-purple-100 text-purple-700"
                        : row.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
                  </span>
                ),
              },
              { header: "Last Login", accessor: "lastLogin" },
              { header: "Created", accessor: "createdAt" },
              ...(canManage
                ? [
                    {
                      header: "Actions",
                      accessor: (row: Admin) => (
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Edit"
                            onClick={() => openEditModal(row)}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </button>
                          {row.role !== "super admin" && (
                            <button
                              className="p-1.5 rounded hover:bg-gray-100"
                              title="Delete"
                              onClick={() => openDeleteModal(row)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </button>
                          )}
                        </div>
                      ),
                      className: "w-24",
                    },
                  ]
                : []),
            ]}
            data={admins}
          />
        )}
      </Card>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => !isSubmittingAdd && setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Add New Admin
              </h3>
              <button
                onClick={() => !isSubmittingAdd && setShowAddModal(false)}
                className="p-1 rounded hover:bg-gray-100"
                disabled={isSubmittingAdd}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAdmin.name}
                  required
                  disabled={isSubmittingAdd}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  required
                  disabled={isSubmittingAdd}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                  placeholder="admin@sgs.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newAdmin.role}
                  disabled={isSubmittingAdd}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      role: e.target.value as Admin["role"],
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                >
                  <option value="super admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="read-only admin">Read-only Admin</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                  disabled={isSubmittingAdd}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  type="submit"
                  disabled={isSubmittingAdd}
                >
                  {isSubmittingAdd ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Adding…
                    </span>
                  ) : (
                    "Add Admin"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && adminToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={cancelDelete} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-dark">
                Delete Admin
              </h3>
              <button
                onClick={cancelDelete}
                className="p-1 rounded hover:bg-gray-100"
                disabled={isDeletingAdmin}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">
                  {adminToDelete.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-dark text-sm">
                  {adminToDelete.name}
                </p>
                <p className="text-xs text-gray-500">{adminToDelete.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this admin account? This action
              cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={cancelDelete}
                disabled={isDeletingAdmin}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 !bg-red-600 hover:!bg-red-700"
                onClick={confirmDelete}
                disabled={isDeletingAdmin}
              >
                {isDeletingAdmin ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Deleting…
                  </span>
                ) : (
                  "Delete Account"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && adminToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={cancelEdit} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-dark">
                Edit Admin
              </h3>
              <button
                onClick={cancelEdit}
                className="p-1 rounded hover:bg-gray-100"
                disabled={isSubmittingEdit}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  required
                  disabled={isSubmittingEdit}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  required
                  disabled={isSubmittingEdit}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                  placeholder="admin@sgs.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={editForm.role}
                  disabled={isSubmittingEdit}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      role: e.target.value as Admin["role"],
                    })
                  }
                  className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                >
                  <option value="super admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="read-only admin">Read-only Admin</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={cancelEdit}
                  disabled={isSubmittingEdit}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  type="submit"
                  disabled={isSubmittingEdit}
                >
                  {isSubmittingEdit ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
