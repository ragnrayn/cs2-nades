import { Logger } from '@nestjs/common';
import { Context, MiddlewareFn } from 'telegraf';

const logger = new Logger('Bot');

// Logs every update: who did what and how long it took
export const loggerMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  const start = Date.now();
  const user = ctx.from ? `${ctx.from.id} (@${ctx.from.username ?? '-'})` : 'unknown';
  const action =
    ctx.callbackQuery && 'data' in ctx.callbackQuery
      ? `button: ${ctx.callbackQuery.data}`
      : ctx.message && 'text' in ctx.message
        ? `text: ${ctx.message.text}`
        : ctx.updateType;

  await next();
  logger.log(`${user} → ${action} (${Date.now() - start}ms)`);
};
