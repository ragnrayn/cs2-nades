import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';
import { NadesModule } from './modules/nades/nades.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    NadesModule,
  ],
})
export class AppModule {}
