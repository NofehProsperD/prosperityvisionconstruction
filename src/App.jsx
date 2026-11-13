 import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./Pages/JobsPage";
import ServicesPage from "./Pages/ServicePage";
import CompaniesPage from "./Pages/CompaniesPage";
import RecommendCompanyPage from "./Pages/RecomendCompanyPage";
import AboutPage from "./Pages/AboutPage";
import EcosystemPage from "./Pages/EcosystemPage";
import PrivacyPage from "./Pages/PrivacyPage";
import TermsPage from "./Pages/TermsPage";
import CompanyTermsPage from "./Pages/companyTerms";
import VisitorAnalyticsNotice from "./Pages/VisitorAnaliticsNotice";
import ContactPage from "./Pages/ContactPage";
import VisitorAdminPage from "./Pages/VisitorAdminPage";
import AdminOverview from "./Pages/AdminOverview/AdminOverview";
import AdminShell from "./Pages/AdminShell/AdminShell";
import SubmissionCenter from "./Pages/SubmissionCenter/SubmissionCenter";
import JobDetails from "./Pages/jobdetails/JobDetails";
import VisionEngineer from "./components/VisionEngineer";

function ComingSoon({ name }) {
  return (
    <main className="pvc-coming-soon">
      <h1>{name}</h1>
      <p>This page is currently being developed.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/jobs" element={<JobsPage/>} />
        <Route path="/jobs/:id" element={<JobDetails/>} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/recommendations" element={<RecommendCompanyPage/>} />
        <Route path="/about" element={< AboutPage/>} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/login" element={<ComingSoon name="Login" />} />
        <Route path="/register" element={<ComingSoon name="Register" />} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/companyterms" element={<CompanyTermsPage/>} />
        <Route path="/privacy" element={< PrivacyPage/>} />
        <Route path="/visitor" element={< VisitorAnalyticsNotice/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/adminvipage" element={<VisitorAdminPage/>} />
        <Route path="/adminoverview" element={<AdminOverview/>} />
        <Route path="/adminshell" element={<AdminShell/>} />
        <Route path="/submationCenter" element={<SubmissionCenter/>} />
        <Route path="/assistant" element={<VisionEngineer/>} />

        <Route path="*" element={<ComingSoon name="Page Not Found" />} />
      </Routes>
    </>
  );
}