import { Test, TestingModule } from '@nestjs/testing';
import { RiderService } from './rider.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRiderDto } from './dtos/create-rider.dto';

describe('RiderService', () => {
  let service: RiderService;
  let prismaService: PrismaService;

  const RiderStub = {
    id: 1,
    firstName: 'Skibidi',
    lastName: 'Toilet',
    email: 'skibidi@gmail.com',
    licensePlate: 'DOM-5678',
    phoneNumber: '0880000000',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const LocationStub = {
    id: 1,
    longtitude: 45,
    latitude: -32,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const RiderLocationStub = {
    id: 1,
    firstName: 'Skibidi',
    lastName: 'Toilet',
    email: 'skibidi@gmail.com',
    licensePlate: 'DOM-5678',
    phoneNumber: '0880000000',
    createdAt: new Date(),
    updatedAt: new Date(),
    location: LocationStub,
  };

  const mockPrismaService = {
    rider: {
      findMany: jest.fn().mockResolvedValue([RiderStub]),
      findUnique: jest.fn().mockResolvedValue(RiderStub),
      create: jest.fn().mockResolvedValue(RiderStub),
      update: jest.fn().mockResolvedValue(RiderStub),
      delete: jest.fn().mockResolvedValue(RiderStub),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiderService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RiderService>(RiderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('getRiders', () => {
    it('should return Riders', async () => {
      const result = await service.getRiders();

      expect(prismaService.rider.findMany).toHaveBeenCalledWith();
      expect(result).toEqual([RiderStub]);
    });
  });

  describe('getRider', () => {
    it('should return Rider', async () => {
      const result = await service.getRider({ id: RiderStub.id });

      expect(prismaService.rider.findUnique).toHaveBeenCalledWith({
        where: { id: RiderStub.id },
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('getRiderWithLocations', () => {
    it('should return RiderWithLocation', async () => {
      jest
        .spyOn(prismaService.rider, 'findUnique')
        .mockResolvedValueOnce(RiderLocationStub);
      const result = await service.getRiderWithLocations(RiderStub.id);

      expect(prismaService.rider.findUnique).toHaveBeenCalledWith({
        where: { id: RiderStub.id },
        include: { Location: true },
      });
      expect(result).toEqual(RiderLocationStub);
    });
  });

  describe('createRider', () => {
    it('should create Rider', async () => {
      const mockDto: CreateRiderDto = {
        ...RiderStub,
      };
      const result = await service.createRider(mockDto);

      expect(prismaService.rider.create).toHaveBeenCalledWith({
        data: RiderStub,
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('updateRider', () => {
    it('should update Rider', async () => {
      const result = await service.updateRider({
        data: RiderStub,
        where: { id: RiderStub.id },
      });

      expect(prismaService.rider.update).toHaveBeenCalledWith({
        data: RiderStub,
        where: { id: RiderStub.id },
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('deleteRider', () => {
    it('should delete Rider', async () => {
      const result = await service.deleteRider({ id: RiderStub.id });

      expect(prismaService.rider.delete).toHaveBeenCalledWith({
        where: { id: RiderStub.id },
      });
      expect(result).toEqual(RiderStub);
    });
  });
});
