import { useTranslation } from 'react-i18next';
import { Car, Navigation, Bus, Bike, Truck } from 'lucide-react';
import { Card, PanelHeader } from '../../lib/ui';
import type { Role } from '../../types';

const ROLES: { id: Role; icon: typeof Car }[] = [
  { id: 'driver', icon: Car },
  { id: 'taxi', icon: Navigation },
  { id: 'transit', icon: Bus },
  { id: 'cyclist', icon: Bike },
  { id: 'logistics', icon: Truck },
];

export default function RoleSelector({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  const { t } = useTranslation();
  return (
    <Card>
      <PanelHeader title={t('roles.title')} subtitle={t('roles.subtitle')} />
      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5">
        {ROLES.map(({ id, icon: Icon }) => {
          const active = role === id;
          return (
            <button
              key={id}
              onClick={() => setRole(id)}
              className={`rounded-xl border p-4 text-left transition ${
                active ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue' : 'border-line bg-white hover:bg-mist'
              }`}
            >
              <Icon size={22} className={active ? 'text-brand-blue' : 'text-ink-soft'} />
              <p className="mt-2 text-sm font-bold text-ink">{t(`roles.${id}`)}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-soft">{t(`roles.${id}Desc`)}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
