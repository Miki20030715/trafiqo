import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Plus } from 'lucide-react';
import { Card } from '../lib/ui';

export default function TrustSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  const statements = [1, 2, 3, 4, 5, 6].map((i) => t(`trust.s${i}`));
  const faqs = [1, 2, 3, 4, 5, 6, 7].map((i) => ({ q: t(`trust.q${i}`), a: t(`trust.a${i}`) }));

  return (
    <Card className="p-6 sm:p-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">{t('trust.headline')}</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{t('trust.subheadline')}</p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {statements.map((s, i) => (
          <div key={i} className="flex gap-2.5 rounded-xl border border-line bg-mist p-4">
            <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-brand-green" />
            <p className="text-sm leading-relaxed text-ink">{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-ink">{t('trust.faqTitle')}</h3>
        <div className="mt-3 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-ink">{f.q}</span>
                <Plus size={18} className={`flex-shrink-0 text-brand-blue transition-transform ${open === i ? 'rotate-45' : ''}`} />
              </button>
              {open === i && <p className="pb-4 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
