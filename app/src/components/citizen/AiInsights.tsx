import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';
import { Card, PanelHeader, ModelTag } from '../../lib/ui';
import type { Role } from '../../types';

const roleKey: Record<Role, string> = {
  driver: 'iDriver',
  taxi: 'iTaxi',
  transit: 'iTransit',
  cyclist: 'iCyclist',
  logistics: 'iLogistics',
};

export default function AiInsights({ role }: { role: Role }) {
  const { t } = useTranslation();
  const items = [t(`insights.${roleKey[role]}`), t('insights.i1'), t('insights.i2'), t('insights.i3'), t('insights.i4')];
  return (
    <Card>
      <PanelHeader icon={<Lightbulb size={18} />} title={t('insights.title')} subtitle={t('insights.subtitle')} right={<ModelTag label={t('insights.tag')} />} />
      <ul className="divide-y divide-line">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 px-5 py-3.5">
            <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-brand-orange" />
            <p className="text-sm leading-relaxed text-ink">{it}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
