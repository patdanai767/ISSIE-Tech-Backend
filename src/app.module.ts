import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { LocationModule } from './location/location.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RiderModule, LocationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
