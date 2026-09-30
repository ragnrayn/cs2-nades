import { Module } from '@nestjs/common';
import { NadesService } from './nades.service';
import { NadesUpdate } from './nades.update';

@Module({
  providers: [NadesService, NadesUpdate],
  exports: [NadesService],
})
export class NadesModule {}
