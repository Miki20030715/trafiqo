import type { AppNotification } from '../types';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', severityKey: 'warning', titleKey: 'notif.nCongestionT', bodyKey: 'notif.nCongestionB', delayKey: 'notif.nCongestionD', altKey: 'notif.nCongestionA', minutesAgo: 3, read: false },
  { id: 'n2', severityKey: 'critical', titleKey: 'notif.nAccidentT', bodyKey: 'notif.nAccidentB', delayKey: 'notif.nAccidentD', altKey: 'notif.nAccidentA', minutesAgo: 8, read: false },
  { id: 'n3', severityKey: 'info', titleKey: 'notif.nWeatherT', bodyKey: 'notif.nWeatherB', delayKey: 'notif.nWeatherD', altKey: 'notif.nWeatherA', minutesAgo: 20, read: false },
  { id: 'n4', severityKey: 'critical', titleKey: 'notif.nEmergencyT', bodyKey: 'notif.nEmergencyB', altKey: 'notif.nEmergencyA', minutesAgo: 35, read: true },
  { id: 'n5', severityKey: 'warning', titleKey: 'notif.nDisruptionT', bodyKey: 'notif.nDisruptionB', delayKey: 'notif.nDisruptionD', altKey: 'notif.nDisruptionA', minutesAgo: 50, read: true },
];
