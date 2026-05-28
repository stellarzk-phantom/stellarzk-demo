import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen">
      <nav className="border-b border-white/10 bg-slate-950/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-teal-600 shadow-lg shadow-cyan-500/30">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  StellarZK
                </h1>
                <p className="text-xs text-slate-400">Zero-Knowledge Demo</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[
                { path: '/', label: 'Demo' },
                { path: '/proofs', label: 'Proofs' },
                { path: '/circuits', label: 'Circuits' },
                { path: '/privacy', label: 'Privacy' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
