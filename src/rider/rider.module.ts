import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [PrismaModule, LocationModule],
  providers: [RiderService],
  controllers: [RiderController],
})
export class RiderModule {}
