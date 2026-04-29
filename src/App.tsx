import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AutomationPage from './pages/AutomationPage';
import AIPage from './pages/AIPage';
import ArchitecturePage from './pages/ArchitecturePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';

const pageVariants: any = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
        <Route path="/projects/:slug" element={<AnimatedPage><ProjectDetailPage /></AnimatedPage>} />
        <Route path="/automation" element={<AnimatedPage><AutomationPage /></AnimatedPage>} />
        <Route path="/ai" element={<AnimatedPage><AIPage /></AnimatedPage>} />
        <Route path="/architecture" element={<AnimatedPage><ArchitecturePage /></AnimatedPage>} />
        <Route path="/articles" element={<AnimatedPage><ArticlesPage /></AnimatedPage>} />
        <Route path="/articles/:slug" element={<AnimatedPage><ArticleDetailPage /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ReactLenis>
  );
}
