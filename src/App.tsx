import { Routes, Route } from "react-router-dom";
import PublicRouteGuard from "./components/RoutingComponents/PublicRouteGuard";
import ProtectedRouteGuard from "./components/RoutingComponents/ProtectedRouteGuard";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Cohorts from "./pages/Cohorts";
import CohortDetail from "./pages/CohortDetail";
import CohortBatchDetail from "./pages/CohortBatchDetail";
import Learners from "./pages/Learners";
import LearnerProfile from "./pages/LearnerProfile";
import BulkUpload from "./pages/BulkUpload";
import CertificateTypes from "./pages/CertificateTypes";
import CertificateTypeDetail from "./pages/CertificateTypeDetail";
import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";
import Signatories from "./pages/Signatories";
import SignatureSets from "./pages/SignatureSets";
import CertificateRecords from "./pages/CertificateRecords";
import CertificateDetail from "./pages/CertificateDetail";
import GenerationJobs from "./pages/GenerationJobs";
import VerificationLogs from "./pages/VerificationLogs";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import RoleManagement from "./pages/RoleManagement";
import SecuritySettings from "./pages/SecuritySettings";
import SupportRequests from "./pages/SupportRequests";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import LearnerPortal from "./pages/LearnerPortal";
import CertificateViewer from "./pages/CertificateViewer";
import PublicVerification from "./pages/PublicVerification";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRouteGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/learner" element={<LearnerPortal />} />
        <Route path="/certificate/:id" element={<CertificateViewer />} />
        <Route path="/verify" element={<PublicVerification />} />
        <Route path="/verify/:token" element={<PublicVerification />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRouteGuard />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cohorts" element={<Cohorts />} />
          <Route path="cohorts/:id" element={<CohortDetail />} />
          <Route path="cohorts/batch/:id" element={<CohortBatchDetail />} />
          <Route path="learners" element={<Learners />} />
          <Route path="learners/:id" element={<LearnerProfile />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
          <Route path="certificate-types" element={<CertificateTypes />} />
          {/* <Route path="certificate-types/:id" element={<CertificateTypeDetail />} /> */}
          <Route path="templates" element={<Templates />} />
          {/* <Route path="templates/:id" element={<TemplateEditor />} /> */}
          <Route path="signatories" element={<Signatories />} />
          <Route path="signature-sets" element={<SignatureSets />} />
          {/* <Route path="certificates" element={<CertificateRecords />} />
        <Route path="certificates/:id" element={<CertificateDetail />} />
          <Route path="generation-jobs" element={<GenerationJobs />} />
          <Route path="verification-logs" element={<VerificationLogs />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} /> */}
          <Route path="role-management" element={<RoleManagement />} />
          {/* <Route path="security-settings" element={<SecuritySettings />} /> */}
          {/* <Route path="support-requests" element={<SupportRequests />} />
        <Route path="reports" element={<Reports />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
