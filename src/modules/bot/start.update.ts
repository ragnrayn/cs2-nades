import { UseFilters } from '@nestjs/common';
import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BTN, TEXT } from './bot.constants';
import { mainKeyboard } from './bot.keyboard';
import { BotExceptionFilter } from './filters/bot-exception.filter';

@Update()
@UseFilters(BotExceptionFilter)
export class StartUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(TEXT.START(ctx.from?.first_name ?? 'гравцю'), mainKeyboard());
  }

  // @Help()
  // @Hears(BTN.HELP)
  // async help(@Ctx() ctx: Context) {
  //   await ctx.reply(TEXT.HELP, mainKeyboard());
  // }
}
