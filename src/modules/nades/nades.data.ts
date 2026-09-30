// Your content. Put video files into media/videos/ and reference them here.
export type NadeType = 'smoke' | 'flash' | 'molotov' | 'he';

function getVideo(nades: Nade[]): string {
  return nades
    .map((nade) => nade.video)
    .filter((v) => v)
    .join('\n');
}

export interface Nade {
  id: string;
  map: string;
  side: 'T' | 'CT';
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

export const NADES_SIDE = [
  { id: 'T', label: 'T side' },
  { id: 'CT', label: 'CT side' },
];

export const NADES: Nade[] = [
  {
    id: 'dust1',
    map: 'dust2',
    side: 'T',
    type: 'smoke',
    title: 'Smoke на Mid з T spawn',
    video: 'videos/dust2/smokes/TSide/mid-doors.mp4',
  },
  {
    id: 'dust2',
    map: 'dust2',
    side: 'CT',
    type: 'smoke',
    title: 'Smoke на Mid з CT spawn',
    video: 'videos/dust2/smokes/CTSide/mid-doors.mp4',
  }
];
