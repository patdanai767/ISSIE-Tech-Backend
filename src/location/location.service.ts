import { Injectable } from '@nestjs/common';
import { Prisma, Location } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from '../location/dtos/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prismaService: PrismaService) {}

  async getLocations(): Promise<Location[]> {
    return this.prismaService.location.findMany();
  }

  async getLocation(
    riderUniqueInput: Prisma.LocationWhereUniqueInput,
  ): Promise<Location | null> {
    return this.prismaService.location.findUnique({
      where: riderUniqueInput,
    });
  }

  async createLocation(
    riderId: number,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.prismaService.location.create({
      data: {
        latitude: createLocationDto.latitude,
        longtitude: createLocationDto.longtitude,
        rider: { connect: { id: riderId } },
      },
    });
  }

  async updateLocation(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { where, data } = params;
    return this.prismaService.location.update({ data, where });
  }

  async deleteLocation(
    where: Prisma.LocationWhereUniqueInput,
  ): Promise<Location> {
    return this.prismaService.location.delete({
      where,
    });
  }
}
