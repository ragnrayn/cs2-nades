// Your content. Put video files into media/videos/ and reference them here.
export type NadeType = 'smoke' | 'flash' | 'molotov' | 'he';

export interface Nade {
  id: string;
  map: string;
  type: NadeType;
  title: string;
  video: string; // path inside media/, e.g. 'videos/mirage-jungle.mp4'
}

export const MAPS = [
  { id: 'mirage', name: 'Mirage' },
  { id: 'inferno', name: 'Inferno' },
  { id: 'dust2', name: 'Dust II' },
];

export const NADE_TYPES: { id: NadeType; label: string }[] = [
  { id: 'smoke', label: '💨 Smoke' },
  { id: 'flash', label: '⚡ Flash' },
  { id: 'molotov', label: '🔥 Molotov' },
  { id: 'he', label: '💥 HE' },
];

export const NADES: Nade[] = [
  { id: 'mir1', map: 'mirage', type: 'smoke', title: 'Smoke на Jungle з T spawn', video: 'videos/mirage-jungle.mp4' },
  { id: 'mir2', map: 'mirage', type: 'flash', title: 'Flash на A site', video: 'videos/mirage-a-flash.mp4' },
];
