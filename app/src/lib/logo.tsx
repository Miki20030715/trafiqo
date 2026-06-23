// Interim, on-brand SVG logos built from the official artwork.
// Replace with the official files once attached to /context (see README).

export function TrafiqoLogo({ className = '', showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} aria-label="Trafiqo">
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 36 24" className="h-[1.1em] w-auto" aria-hidden="true">
          <circle cx="8" cy="12" r="5" fill="#1E63D6" />
          <circle cx="19" cy="12" r="4" fill="#F5821F" />
          <circle cx="29" cy="12" r="3" fill="#2BA24A" />
        </svg>
        <span className="font-extrabold tracking-tight">
          <span style={{ color: '#1E63D6' }}>Traf</span>
          <span style={{ color: '#2BA24A' }}>i</span>
          <span style={{ color: '#1E63D6' }}>q</span>
          <span style={{ color: '#F5821F' }}>o</span>
        </span>
      </span>
      {showTagline && (
        <span className="mt-1 text-[0.5em] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Smarter choices. Smoother cities.
        </span>
      )}
    </span>
  );
}

export function MtaiLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Miracle Traffic AI">
      <span className="font-extrabold tracking-tight">
        <span style={{ color: '#1E63D6' }}>MT</span>
        <span style={{ color: '#2BA24A' }}>A</span>
        <span style={{ color: '#E0342A' }}>I</span>
      </span>
      <span className="text-[0.7em] font-semibold uppercase tracking-wide text-ink-soft">
        Miracle Traffic AI
      </span>
    </span>
  );
}
