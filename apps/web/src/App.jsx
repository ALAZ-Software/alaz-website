import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ArchivePage from '@/pages/ArchivePage.jsx';
import CaseStudyPage from '@/pages/CaseStudyPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import IntakePage from '@/pages/IntakePage.jsx';
import LegalPage from '@/pages/LegalPage.jsx';
import BlogIndexPage from '@/pages/BlogIndexPage.jsx';
import BlogPostPage from '@/pages/BlogPostPage.jsx';
import HomePageTR from '@/pages/tr/HomePage.jsx';
import ArchivePageTR from '@/pages/tr/ArchivePage.jsx';
import CaseStudyPageTR from '@/pages/tr/CaseStudyPage.jsx';
import AboutPageTR from '@/pages/tr/AboutPage.jsx';
import IntakePageTR from '@/pages/tr/IntakePage.jsx';
import LegalPageTR from '@/pages/tr/LegalPage.jsx';
import BlogIndexPageTR from '@/pages/tr/BlogIndexPage.jsx';
import BlogPostPageTR from '@/pages/tr/BlogPostPage.jsx';
import StructuredData from '@/components/StructuredData.jsx';

function Layout() {
  const location = useLocation();
  const lang = location.pathname.startsWith('/tr') ? 'tr' : 'en';
  return <>
    <Header lang={lang} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/case-studies" element={<ArchivePage />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/start-project" element={<IntakePage />} />
      <Route path="/legal" element={<LegalPage type="legal" />} />
      <Route path="/privacy" element={<LegalPage type="privacy" />} />

      <Route path="/tr" element={<HomePageTR />} />
      <Route path="/tr/case-studies" element={<ArchivePageTR />} />
      <Route path="/tr/case-studies/:slug" element={<CaseStudyPageTR />} />
      <Route path="/tr/about" element={<AboutPageTR />} />
      <Route path="/tr/blog" element={<BlogIndexPageTR />} />
      <Route path="/tr/blog/:slug" element={<BlogPostPageTR />} />
      <Route path="/tr/start-project" element={<IntakePageTR />} />
      <Route path="/tr/legal" element={<LegalPageTR type="legal" />} />
      <Route path="/tr/privacy" element={<LegalPageTR type="privacy" />} />

      <Route path="*" element={<LegalPage type="not-found" />} />
    </Routes>
    <Footer lang={lang} />
  </>;
}

function App() {
  return <Router>
    <ScrollToTop />
    <StructuredData />
    <Layout />
  </Router>;
}

export default App;
