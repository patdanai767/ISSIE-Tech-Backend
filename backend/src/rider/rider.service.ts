import { Injectable } from '@nestjs/common';
import { Prisma, Rider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RiderService {
  constructor(private prismaService: PrismaService) {}

  async getRiders(): Promise<Rider[]> {
    return this.prismaService.rider.findMany();
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
