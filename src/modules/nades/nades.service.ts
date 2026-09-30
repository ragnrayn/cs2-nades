import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { MAPS, NADE_TYPES, NADES, NADES_SIDE } from './nades.data';

// Pure logic, no Telegram here — later the Mini App API can reuse it
@Injectable()
export class NadesService {
  getMaps() {
    return MAPS;
  }

  getMap(id: string) {
    return MAPS.find((m) => m.id === id);
  }
  
  getSides() {
    return NADES_SIDE;
  }

  getSide(side: string) {
    return NADES_SIDE.find((s) => s.id === side);
  }

  getTypes() {
    return NADE_TYPES;
  }

  getNades(map: string, type: string) {
    return NADES.filter((n) => n.map === map && n.type === type);
  }

  getById(id: string) {
    return NADES.find((n) => n.id === id);
  }

  // Absolute path to the video file, or null if it's missing
  getVideoPath(video: string): string | null {
    const path = join(process.cwd(), 'media', video);
    return existsSync(path) ? path : null;
  }

  sendNadeMessage(nade: { title: string; video: string }) {
    return `<b>${nade.title}</b>\n\n<video src="${process.env.MEDIA_URL}/${nade.video}" controls></video>`;
  }
}
