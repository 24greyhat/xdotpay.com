import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocsPage } from './pages/DocsPage';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { DashboardSetup } from './pages/DashboardSetup';
import { ApiSetup } from './pages/ApiSetup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocsPage />} />
        <Route path="/api-setup" element={<ApiSetup />} />
        <Route path="/dashboard-setup" element={<DashboardSetup />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}