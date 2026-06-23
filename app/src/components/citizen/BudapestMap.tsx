import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LTooltip } from 'react-leaflet';
import { Map as MapIcon } from 'lucide-react';
import { Card, PanelHeader, ModelTag } from '../../lib/ui';
import { BUDAPEST_CENTER } from '../../data/budapest';

const tomtomKey = import.meta.env.VITE_TOMTOM_KEY;

const ZONES: { pos: [number, number]; level: 0 | 1 | 2; name: string }[] = [
  { pos: [47.5009, 19.0588], level: 2, name: 'Centre' },
  { pos: [47.5300, 19.0700], level: 1, name: 'North' },
  { pos: [47.4720, 19.0600], level: 1, name: 'South' },
  { pos: [47.4900, 19.0300], level: 2, name: 'Buda inner' },
  { pos: [47.5100, 19.1050], level: 0, name: 'East' },
  { pos: [47.4750, 19.0250], level: 1, name: 'Gellért' },
];
const tone = ['#1FA86B', '#F59E0B', '#E0342A'];

export default function BudapestMap() {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden">
      <PanelHeader
        icon={<MapIcon size={18} />}
        title={t('map.title')}
        subtitle={t('common.aggregated')}
        right={<ModelTag label={tomtomKey ? t('map.tomtomLayer') : t('map.behaviourLayer')} />}
      />
      <div className="relative h-[360px] w-full">
        <MapContainer center={BUDAPEST_CENTER} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          {tomtomKey && (
            <TileLayer
              url={`https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${tomtomKey}`}
              opacity={0.7}
            />
          )}
          {!tomtomKey &&
            ZONES.map((z, i) => (
              <CircleMarker
                key={i}
                center={z.pos}
                radius={18}
                pathOptions={{ color: tone[z.level], fillColor: tone[z.level], fillOpacity: 0.35, weight: 2 }}
              >
                <LTooltip>{z.name} · {t('common.aggregated')}</LTooltip>
              </CircleMarker>
            ))}
        </MapContainer>
        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] flex items-center gap-3 rounded-lg border border-line bg-white/90 px-3 py-1.5 text-[11px] font-medium text-ink-soft backdrop-blur">
          <span>{t('map.legend')}:</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: tone[0] }} /> {t('map.low')}</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: tone[1] }} /> {t('map.moderate')}</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: tone[2] }} /> {t('map.high')}</span>
        </div>
      </div>
    </Card>
  );
}
