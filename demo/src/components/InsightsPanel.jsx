import { Lightbulb, TrendingDown, Route, Clock, Wind } from 'lucide-react';
import { Card, PanelHeader, SimTag, ReviewTag } from './ui.jsx';

const INSIGHTS = [
  { icon: TrendingDown, text: 'A small peak-hour charge on the core corridor is projected to ease congestion without overloading parallel routes.' },
  { icon: Clock, text: 'Roughly a fifth of peak trips could shift to off-peak if pricing and messaging are aligned.' },
  { icon: Route, text: 'Two alternative corridors have spare capacity to absorb rerouted demand at midday.' },
  { icon: Wind, text: 'Smoother, less stop-go driving is associated with lower emissions intensity across the district.' },
];

export default function InsightsPanel() {
  return (
    <Card>
      <PanelHeader
        icon={Lightbulb}
        title="Decision-support insights"
        subtitle="Plain-language recommendations for city operators."
        right={<SimTag />}
      />
      <ul className="divide-y divide-line">
        {INSIGHTS.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={i} className="flex gap-3 px-5 py-4">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-mist text-brand-blue">
                <Icon size={16} strokeWidth={1.9} />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-ink">{it.text}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <SimTag />
                  <ReviewTag />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
