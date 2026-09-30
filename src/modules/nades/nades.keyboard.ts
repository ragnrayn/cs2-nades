import { Markup } from 'telegraf';
import { Nade } from './nades.data';

// Inline buttons under the message. Everything starts with "nades:"
export const mapsKeyboard = (maps: { id: string; name: string }[]) =>
  Markup.inlineKeyboard(
    maps.map((m) => [Markup.button.callback(m.name, `nades:map:${m.id}`)]),
  );

export const sideKeyboard = (map: string) =>
  Markup.inlineKeyboard([
    [Markup.button.callback('T', `nades:map:${map}:side:T`)],
    [Markup.button.callback('CT', `nades:map:${map}:side:CT`)],
    [Markup.button.callback('⬅️ До карт', 'nades:maps')],
  ]);

export const typesKeyboard = (
  map: string,
  types: { id: string; label: string }[],
  side: 'T' | 'CT',
) =>
  Markup.inlineKeyboard([
    types.map((t) =>
      Markup.button.callback(
        t.label,
        `nades:map:${map}:side:${side}:${t.id}`,
      ),
    ),
    [Markup.button.callback('⬅️ До сторон', `nades:map:${map}`)],
  ]);

export const nadesKeyboard = (
  map: string,
  side: 'T' | 'CT',
  nades: Nade[],
) =>
  Markup.inlineKeyboard([
    ...nades.filter((n) => n.map === map && n.side === side).map((n) => [
      Markup.button.callback(n.title, `nades:show:${n.id}`),
    ]),
    [Markup.button.callback('⬅️ Назад', `nades:map:${map}:side:${side}`)],
  ]);
