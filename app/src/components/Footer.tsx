import { useTranslation } from 'react-i18next';
import { TrafiqoLogo, MtaiLogo } from '../lib/logo';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <TrafiqoLogo className="text-lg" />
          <p className="mt-3 text-sm font-medium text-ink-soft">{t('footer.tagline')}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t('footer.governance')}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('footer.partnerLabel')}</p>
            <div className="mt-2">
              <MtaiLogo className="text-base" />
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex w-max items-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1850b8]"
          >
            {t('footer.requestDemo')}
          </a>
        </div>
      </div>
      <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">
        © {new Date().getFullYear()} Trafiqo. {t('footer.rights')}
      </p>
    </footer>
  );
}
