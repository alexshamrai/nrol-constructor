import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <Header />

      {/* Main content — offset by header height (h-14 = 3.5rem) */}
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 pt-20">
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center py-20"
              style={{ color: 'var(--text-muted)' }}
            >
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
