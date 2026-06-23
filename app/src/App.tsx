import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

// Toolchain verification shell — replaced by the real skeleton next.
const trend = [
  { n: '2023', v: 85 },
  { n: '2024', v: 110 },
  { n: '2025', v: 131 },
];

export default function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold text-brand-blue">{t('app.title')}</h1>
      <p className="text-ink-soft">{t('app.tagline')}</p>
      <button
        className="mt-2 rounded bg-brand-blue px-3 py-1 text-sm font-semibold text-white"
        onClick={() => i18n.changeLanguage(i18n.language === 'hu' ? 'en' : 'hu')}
      >
        {i18n.language.toUpperCase()}
      </button>
      <div className="mt-4 h-64 overflow-hidden rounded-xl border border-line">
        <MapContainer center={[47.4979, 19.0402]} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
        </MapContainer>
      </div>
      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trend}>
            <XAxis dataKey="n" />
            <Bar dataKey="v" fill="#1E63D6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
