import { Injectable } from '@nestjs/common';
import { Prisma, Rider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RiderService {
  constructor(private prismaService: PrismaService) {}

  async getRiders(): Promise<Rider[]> {
    return this.prismaService.rider.findMany();
  }

  async searchRiders(latitude: number, longtitude: number): Promise<Rider[]> {
    const radius = 5;
    const latDiff = radius / 111;
    const location = this.prismaService.location.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: latitude - latDiff,
              lte: latitude + latDiff,
            },
          },
          {
            longtitude: {
              gte: longtitude - latDiff / Math.cos(latitude * (Math.PI / 180)),
              lte: longtitude + latDiff / Math.cos(latitude * (Math.PI / 180)),
            },
          },
        ],
      },
    });
    const riderIds = (await location).map(
      (riderLocation) => riderLocation.riderId,
    );
    return this.prismaService.rider.findMany({
      where: { id: { in: riderIds } },
    });
  }

  async getRider(
    riderUniqueInput: Prisma.RiderWhereUniqueInput,
  ): Promise<Rider | null> {
    return this.prismaService.rider.findUnique({
      where: riderUniqueInput,
    });
  }

  async getRiderWithLocations(riderId: number): Promise<Rider | null> {
    return this.prismaService.rider.findUnique({
      where: { id: riderId },
      include: { Location: true },
    });
  }

  async createRider(data: Prisma.RiderCreateInput): Promise<Rider> {
    return this.prismaService.rider.create({
      data,
    });
  }

  async updateRider(params: {
    where: Prisma.RiderWhereUniqueInput;
    data: Prisma.RiderUpdateInput;
  }): Promise<Rider> {
    const { where, data } = params;
    return this.prismaService.rider.update({ data, where });
  }

  async deleteRider(where: Prisma.RiderWhereUniqueInput): Promise<Rider> {
    return this.prismaService.rider.delete({
      where,
    });
  }
}
