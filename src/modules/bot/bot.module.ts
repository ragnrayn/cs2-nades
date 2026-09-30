import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { StartUpdate } from './start.update';
import { loggerMiddleware } from './middlewares/logger.middleware';

@Global() // BotService is available in every module without importing
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.getOrThrow<string>('BOT_TOKEN'),
        middlewares: [loggerMiddleware],
      }),
    }),
  ],
  providers: [BotService, StartUpdate],
  exports: [BotService],
})
export class BotModule {}
