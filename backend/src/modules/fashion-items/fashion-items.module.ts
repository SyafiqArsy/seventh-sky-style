import { Module } from '@nestjs/common';

import { FashionItemsController } from './fashion-items.controller';
import { FashionItemsService } from './fashion-items.service';

@Module({
  controllers: [
    FashionItemsController,
  ],

  providers: [
    FashionItemsService,
  ],
})
export class FashionItemsModule {}