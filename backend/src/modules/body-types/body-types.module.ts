import { Module } from '@nestjs/common';

import { BodyTypesController } from './body-types.controller';
import { BodyTypesService } from './body-types.service';

@Module({
  controllers: [BodyTypesController],
  providers: [BodyTypesService],
})
export class BodyTypesModule {}