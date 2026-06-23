// Real, citable Budapest figures from /context (budapest_mobilitas_2024_2026).
// These are genuine, sourced data — shown with a source tag, never as model output.

export type SourcedStat = {
  id: string;
  value: string; // pre-formatted display value
  unit?: string;
  source: string; // e.g. "TomTom, 2025"
  scope?: 'budapest' | 'eu' | 'national';
};

export const BUDAPEST_STATS: SourcedStat[] = [
  { id: 'congestion', value: '61.9', unit: '%', source: 'TomTom, 2025', scope: 'budapest' },
  { id: 'timeLost', value: '131', unit: 'h/driver/yr', source: 'TomTom, 2025', scope: 'budapest' },
  { id: 'travel10km', value: '26:33', unit: 'min/10 km', source: 'TomTom, 2024', scope: 'budapest' },
  { id: 'avgSpeed', value: '22.6', unit: 'km/h', source: 'TomTom, 2024', scope: 'budapest' },
  { id: 'co2Transport', value: '29.6', unit: '% of energy-CO₂', source: 'Budapest, 2022', scope: 'budapest' },
  { id: 'euCost', value: '0.5–1.1', unit: '% of GDP', source: 'EU-level estimate', scope: 'eu' },
];

// Worsening time-lost trend (TomTom) — for a small trend chart.
export const TIME_LOST_TREND: { year: string; hours: number }[] = [
  { year: '2023', hours: 85 },
  { year: '2024', hours: 110 },
  { year: '2025', hours: 131 },
];

// Additional sourced facts referenced in copy (not invented).
export const BUDAPEST_FACTS = {
  cashlessParking: { value: 'summer 2026', source: 'City of Budapest' },
  bkkFares: { value: '+~10%', since: 'June 2025', source: 'BKK' },
  m2Boardings: { value: '+16% vs 2022', source: 'BKK, 2025' },
  peakAm: { value: '31:28 min/10 km', source: 'TomTom, 2024' },
  peakPm: { value: '34:03 min/10 km', source: 'TomTom, 2024' },
};

// Budapest map center.
export const BUDAPEST_CENTER: [number, number] = [47.4979, 19.0402];
