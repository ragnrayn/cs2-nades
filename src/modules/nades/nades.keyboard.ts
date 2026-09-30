import { Markup } from 'telegraf';
import { Nade } from './nades.data';

// Inline buttons under the message. Everything starts with "nades:"
export const mapsKeyboard = (maps: { id: string; name: string }[]) =>
  Markup.inlineKeyboard(
    maps.map((m) => [Markup.button.callback(m.name, `nades:map:${m.id}`)]),
  );

export const typesKeyboard = (map: string, types: { id: string; label: string }[]) =>
  Markup.inlineKeyboard([
    types.map((t) => Markup.button.callback(t.label, `nades:map:${map}:${t.id}`)),
    [Markup.button.callback('⬅️ До карт', 'nades:maps')],
  ]);

export const nadesKeyboard = (map: string, nades: Nade[]) =>
  Markup.inlineKeyboard([
    ...nades.map((n) => [Markup.button.callback(n.title, `nades:show:${n.id}`)]),
    [Markup.button.callback('⬅️ Назад', `nades:map:${map}`)],
  ]);
