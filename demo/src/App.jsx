import { useState } from 'react';
import { Info } from 'lucide-react';
import TopBar from './components/TopBar.jsx';
import KpiRow from './components/KpiRow.jsx';
import ScenarioPanel from './components/ScenarioPanel.jsx';
import ComparisonPanel from './components/ComparisonPanel.jsx';
import ZoneFlowMap from './components/ZoneFlowMap.jsx';
import InsightsPanel from './components/InsightsPanel.jsx';
import ControlCenter from './components/ControlCenter.jsx';
import Footer from './components/Footer.jsx';

function IntroLine() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-extrabold tracking-tight text-ink">
          City Mobility Decision-Support — live demo
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Aggregated, anonymised inputs · synthetic populations · recommendations reviewed by city operators — never auto-executed.
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-line bg-mist px-3 py-1 text-xs font-medium text-ink-soft sm:self-auto">
        <Info size={13} /> Every value on this page is simulated
      </span>
    </div>
  );
}

export default function App() {
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  // Scenario levers (wired to the simulation after layout approval).
  const [scenario, setScenario] = useState({ pricing: 2, event: 0, peak: 60 });
  const setLever = (key) => (value) =>
    setScenario((s) => ({ ...s, [key]: value }));

  return (
    <div className="min-h-screen">
      <TopBar
        controlCenterOpen={controlCenterOpen}
        onToggleControlCenter={() => setControlCenterOpen((v) => !v)}
      />

      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6">
        <IntroLine />

        <KpiRow />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <ScenarioPanel scenario={scenario} setLever={setLever} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ComparisonPanel />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ZoneFlowMap />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <InsightsPanel />
          </div>
        </div>

        {controlCenterOpen && <ControlCenter />}

        <Footer />
      </main>
    </div>
  );
}
