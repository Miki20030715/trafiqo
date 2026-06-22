import { FlaskConical, ShieldCheck, Building2, LayoutDashboard } from 'lucide-react';

export default function TopBar({ controlCenterOpen, onToggleControlCenter }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        {/* Logo (placeholder wordmark — swap for official asset) */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 36 24" className="h-4 w-auto" aria-hidden="true">
            <circle cx="8" cy="12" r="5" fill="#1E63D6" />
            <circle cx="19" cy="12" r="4" fill="#F4B400" />
            <circle cx="29" cy="12" r="3" fill="#2BA24A" />
          </svg>
          <span className="text-base font-extrabold tracking-tight text-ink">Trafiqo</span>
          <span className="hidden text-xs font-medium text-ink-soft sm:inline">· City Mobility Decision-Support</span>
        </div>

        {/* Persistent SIMULATION badge — always visible */}
        <span className="order-last inline-flex w-full items-center gap-1.5 rounded-full border border-status-warn/30 bg-status-warn/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#9A6800] sm:order-none sm:w-auto">
          <FlaskConical size={13} />
          Simulation · illustrative data — not a validated pilot result
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-mist px-2.5 py-1 text-xs font-medium text-ink-soft md:inline-flex">
            <ShieldCheck size={13} className="text-brand-green" /> Human oversight: ON
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink-soft sm:inline-flex">
            <Building2 size={13} /> Budapest · District demo
          </span>
          <button
            onClick={onToggleControlCenter}
            aria-pressed={controlCenterOpen}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              controlCenterOpen
                ? 'bg-brand-blue text-white'
                : 'border border-line bg-white text-ink hover:bg-mist'
            }`}
          >
            <LayoutDashboard size={14} /> Control Center
          </button>
        </div>
      </div>
    </header>
  );
}
