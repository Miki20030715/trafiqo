import { ShieldCheck, FlaskConical } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="rounded-2xl border border-line bg-white px-5 py-5 text-xs leading-relaxed text-ink-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2">
          <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-brand-green" />
          Decision-support on aggregated, anonymised data and synthetic populations — never named individuals or live person tracking. Human oversight by design; GDPR / DPIA-aware; aligned with the EU AI Act's risk-based approach.
        </p>
        <p className="flex flex-shrink-0 items-center gap-1.5 font-semibold text-[#9A6800]">
          <FlaskConical size={13} /> Simulation — illustrative only
        </p>
      </div>
    </footer>
  );
}
