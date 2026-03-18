import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContextProvider";
import logo from "../images/sgs_logo_x.jpg";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  FileCheck,
  PenTool,
  Search,
  ClipboardList,
  Settings,
  X,
  User,
  Upload,
  Layers,
  FileBadge,
  PlayCircle,
  Shield,
  UserCog,
  HelpCircle,
  BarChart3,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cohorts", href: "/cohorts", icon: GraduationCap },
  { name: "Learners", href: "/learners", icon: Users },
  { name: "Bulk Upload", href: "/bulk-upload", icon: Upload },
  // { name: "Certificate Types", href: "/certificate-types", icon: FileText },
  // { name: "Templates", href: "/templates", icon: FileCheck },
  // { name: "Signatories", href: "/signatories", icon: PenTool },
  // { name: "Signature Sets", href: "/signature-sets", icon: Layers },
  // { name: "Certificates", href: "/certificates", icon: FileBadge },
  // { name: "Generation Jobs", href: "/generation-jobs", icon: PlayCircle },
  // { name: "Verification Logs", href: "/verification-logs", icon: Search },
  // { name: "Audit Logs", href: "/audit-logs", icon: ClipboardList },
  // { name: "Support Requests", href: "/support-requests", icon: HelpCircle },
  // { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Role Management", href: "/role-management", icon: UserCog },
  // { name: "Security Settings", href: "/security-settings", icon: Shield },
  // { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 mx-auto">
                <img src={logo} alt="School of General Studies Logo" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-text-light">
                  SGS Portal
                </h1>
                <p className="text-xs text-text-light/70">
                  Certificate Management
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-text-light/70 hover:text-text-light hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/20 text-text-light"
                          : "text-text-light/70 hover:bg-white/10 hover:text-text-light"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-lg bg-white/10 p-3 flex items-center">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-text-light mr-3">
                <User className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-white">{user?.emailAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
