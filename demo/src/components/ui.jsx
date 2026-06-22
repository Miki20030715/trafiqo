// Small shared presentational primitives (kept deliberately light for the skeleton).

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-line bg-white ${className}`}>{children}</div>
  );
}

export function PanelHeader({ icon: Icon, title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mist text-brand-blue">
            <Icon size={18} strokeWidth={1.9} />
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold tracking-tight text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}

export function SimTag({ children = 'Simulated' }) {
  return (
    <span className="inline-flex items-center rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
      {children}
    </span>
  );
}

export function ReviewTag() {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
      Pending operator review
    </span>
  );
}

// Status pill: tone ∈ good | warn | crit | neutral
export function StatusPill({ tone = 'neutral', children }) {
  const map = {
    good: 'bg-status-good/10 text-status-good',
    warn: 'bg-status-warn/10 text-[#9A6800]',
    crit: 'bg-status-crit/10 text-status-crit',
    neutral: 'bg-mist text-ink-soft',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}
