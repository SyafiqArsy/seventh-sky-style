import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { StylesModule } from './modules/styles/styles.module';
import { ColorsModule } from './modules/colors/colors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OccasionsModule } from './modules/occasions/occasions.module';
import { BodyTypesModule } from './modules/body-types/body-types.module';
import { FashionItemsModule } from './modules/fashion-items/fashion-items.module';
import { OutfitsModule } from './modules/outfits/outfits.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { JwtModule } from '@nestjs/jwt';
import { RecommendationFeedbacksModule } from './modules/recommendation-feedbacks/recommendation-feedbacks.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    StylesModule,
    ColorsModule,
    CategoriesModule,
    OccasionsModule,
    BodyTypesModule,
    FashionItemsModule,
    OutfitsModule,
    RecommendationsModule,
    RecommendationFeedbacksModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}