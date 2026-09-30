import { UseFilters } from '@nestjs/common';
import { Action, Ctx, Hears, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BTN } from '../bot/bot.constants';
import { BotExceptionFilter } from '../bot/filters/bot-exception.filter';
import { NadesService } from './nades.service';
import { mapsKeyboard, nadesKeyboard, typesKeyboard } from './nades.keyboard';

type MatchCtx = Context & { match: RegExpExecArray };

@Update()
@UseFilters(BotExceptionFilter)
export class NadesUpdate {
  constructor(private readonly nades: NadesService) {}

  // "💣 Гранати" in the bottom menu → new message with the map list
  @Hears(BTN.NADES)
  async open(@Ctx() ctx: Context) {
    await ctx.reply('🗺 Обери карту:', mapsKeyboard(this.nades.getMaps()));
  }

  // "⬅️ До карт" → edit the same message back to the map list
  @Action('nades:maps')
  async maps(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    await ctx.editMessageText('🗺 Обери карту:', mapsKeyboard(this.nades.getMaps()));
  }

  // nades:map:mirage → choose grenade type
  @Action(/^nades:map:([a-z0-9]+)$/)
  async map(@Ctx() ctx: MatchCtx) {
    const map = this.nades.getMap(ctx.match[1]);
    await ctx.answerCbQuery();
    if (!map) return;
    await ctx.editMessageText(`${map.name} — обери тип гранати:`, typesKeyboard(map.id, this.nades.getTypes()));
  }

  // nades:map:mirage:smoke → list of grenades
  @Action(/^nades:map:([a-z0-9]+):([a-z]+)$/)
  async byType(@Ctx() ctx: MatchCtx) {
    const [, mapId, type] = ctx.match;
    const list = this.nades.getNades(mapId, type);
    await ctx.answerCbQuery();

    if (!list.length) {
      await ctx.editMessageText('Тут поки нічого немає 🤷', typesKeyboard(mapId, this.nades.getTypes()));
      return;
    }
    await ctx.editMessageText('Обери гранату:', nadesKeyboard(mapId, list));
  }

  // nades:show:mir1 → send the video as a new message
  @Action(/^nades:show:(.+)$/)
  async show(@Ctx() ctx: MatchCtx) {
    const nade = this.nades.getById(ctx.match[1]);
    await ctx.answerCbQuery();
    if (!nade) return;

    const path = this.nades.getVideoPath(nade.video);
    if (!path) {
      await ctx.reply(`🎬 ${nade.title}\n\n(відео ще не додано: media/${nade.video})`);
      return;
    }
    await ctx.replyWithVideo({ source: path }, { caption: nade.title });
  }
}
