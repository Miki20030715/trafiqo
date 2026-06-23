import { useState } from 'react';
import { useAuth } from './lib/auth';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import BudapestMap from './components/citizen/BudapestMap';
import DataCards from './components/citizen/DataCards';
import RoleSelector from './components/citizen/RoleSelector';
import BehaviourModel from './components/citizen/BehaviourModel';
import Gamification from './components/citizen/Gamification';
import AiInsights from './components/citizen/AiInsights';
import ControlCenter from './components/control/ControlCenter';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import { INITIAL_NOTIFICATIONS } from './data/notifications';
import type { Mode, Role, AppNotification, Redemption } from './types';

export default function App() {
  const { user, ready } = useAuth();
  const [mode, setMode] = useState<Mode>('citizen');
  const [role, setRole] = useState<Role>('driver');
  const [points, setPoints] = useState(120);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  if (!ready) return null;
  if (!user) return <AuthScreen />;

  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications((ns) => ns.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen">
      <Header
        mode={mode}
        setMode={setMode}
        points={points}
        notifications={notifications}
        onMarkAllRead={markAllRead}
        onDismiss={dismiss}
      />

      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6">
        {mode === 'citizen' ? (
          <>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <BudapestMap />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <DataCards />
              </div>
            </div>
            <RoleSelector role={role} setRole={setRole} />
            <BehaviourModel />
            <Gamification
              role={role}
              points={points}
              setPoints={setPoints}
              redemptions={redemptions}
              setRedemptions={setRedemptions}
            />
            <AiInsights role={role} />
          </>
        ) : (
          <ControlCenter />
        )}

        <TrustSection />
        <Footer />
      </main>
    </div>
  );
}
