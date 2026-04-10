import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ExercisesPage = lazy(() => import('./pages/ExercisesPage'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const PlannerPage = lazy(() => import('./pages/PlannerPage'));
function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/programs" element={<ProgramPage />} />
          <Route path="/programs/:programId" element={<ProgramPage />} />
          <Route path="/planner" element={<PlannerPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
