import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const lng = i18n.language === 'en' ? 'en' : 'hu';
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white p-0.5 text-xs font-semibold">
      {!compact && <Languages size={14} className="mx-1.5 text-ink-soft" />}
      {(['hu', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => i18n.changeLanguage(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            lng === l ? 'bg-brand-blue text-white' : 'text-ink-soft hover:text-ink'
          }`}
          aria-pressed={lng === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
