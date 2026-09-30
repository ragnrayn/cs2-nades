import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf, Telegram } from 'telegraf';

type SendMessageExtra = Parameters<Telegram['sendMessage']>[2];

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger = new Logger(BotService.name);

  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  // Commands shown in the "/" menu in Telegram
  async onModuleInit() {
    await this.bot.telegram
      .setMyCommands([{ command: 'start', description: 'Головне меню' }])
      .catch((e) => this.logger.warn(`setMyCommands failed: ${e.message}`));
  }

  // Other modules use this to message users without touching Telegraf directly
  async sendMessage(chatId: number, text: string, extra?: SendMessageExtra) {
    try {
      return await this.bot.telegram.sendMessage(chatId, text, { parse_mode: 'HTML', ...extra });
    } catch (e: any) {
      this.logger.warn(`Cannot send to ${chatId}: ${e?.description ?? e?.message}`);
      return null;
    }
  }
}
