import type { ReactNode } from 'react';

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl border border-line bg-white ${className}`}>{children}</div>;
}

export function PanelHeader({
  icon,
  title,
  subtitle,
  right,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mist text-brand-blue">
            {icon}
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

// Single, clean label for the model panel (no repetitive disclaimers elsewhere).
export function ModelTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-magenta/25 bg-brand-magenta/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-magenta">
      {label}
    </span>
  );
}

export function SourceTag({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
      {source}
    </span>
  );
}

export function StatusDot({ tone }: { tone: 'good' | 'warn' | 'crit' }) {
  const map = { good: 'bg-status-good', warn: 'bg-status-warn', crit: 'bg-status-crit' };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[tone]}`} />;
}
