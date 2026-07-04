/**
 * App.jsx — Root application component with routes.
 */

import { Routes, Route } from 'react-router-dom';
import MainLayout from './ui/layouts/MainLayout';
import Analytics from './ui/components/Analytics';
import JsonLd from './ui/components/JsonLd';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

const App = () => {
  return (
    <MainLayout>
      <Analytics />
      <JsonLd />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;