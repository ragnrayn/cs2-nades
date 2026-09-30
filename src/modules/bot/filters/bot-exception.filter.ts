import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TEXT } from '../bot.constants';

// Catches errors in any handler so the bot never crashes
@Catch()
export class BotExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BotExceptionFilter.name);

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = TelegrafArgumentsHost.create(host).getContext<Context>();
    const description: string = exception?.response?.description ?? exception?.message ?? '';

    // User pressed the same button twice — not a real error
    if (description.includes('message is not modified')) {
      await ctx.answerCbQuery().catch(() => {});
      return;
    }

    this.logger.error(description, exception?.stack);

    if (ctx.callbackQuery) {
      await ctx.answerCbQuery(TEXT.ERROR, { show_alert: true }).catch(() => {});
    } else {
      await ctx.reply(TEXT.ERROR).catch(() => {});
    }
  }
}
