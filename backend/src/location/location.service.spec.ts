import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dtos/create-location.dto';

describe('LocationService', () => {
  let service: LocationService;
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

  const mockPrismaService = {
    location: {
      findMany: jest.fn().mockResolvedValue([LocationStub]),
      findUnique: jest.fn().mockResolvedValue(LocationStub),
      create: jest.fn().mockResolvedValue(LocationStub),
      update: jest.fn().mockResolvedValue(LocationStub),
      delete: jest.fn().mockResolvedValue(LocationStub),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('getLocations', () => {
    it('should return Locations', async () => {
      const result = await service.getLocations();

      expect(prismaService.location.findMany).toHaveBeenCalledWith();
      expect(result).toEqual([LocationStub]);
    });
  });

  describe('getLocation', () => {
    it('should return Location', async () => {
      const result = await service.getLocation({ id: LocationStub.id });

      expect(prismaService.location.findUnique).toHaveBeenCalledWith({
        where: { id: LocationStub.id },
      });
      expect(result).toEqual(LocationStub);
    });
  });

  describe('createLocation', () => {
    it('should create Location', async () => {
      const mockDto: CreateLocationDto = {
        ...LocationStub,
      };
      const result = await service.createLocation(RiderStub.id, mockDto);

      expect(prismaService.location.create).toHaveBeenCalledWith({
        data: {
          latitude: LocationStub.latitude,
          longtitude: LocationStub.longtitude,
          rider: { connect: { id: RiderStub.id } },
        },
      });
      expect(result).toEqual(LocationStub);
    });
  });

  describe('updateLocation', () => {
    it('should update Location', async () => {
      const result = await service.updateLocation({
        data: LocationStub,
        where: { id: LocationStub.id },
      });

      expect(prismaService.location.update).toHaveBeenCalledWith({
        data: LocationStub,
        where: { id: LocationStub.id },
      });
      expect(result).toEqual(LocationStub);
    });
  });

  describe('deleteLocation', () => {
    it('should delete Location', async () => {
      const result = await service.deleteLocation({ id: LocationStub.id });

      expect(prismaService.location.delete).toHaveBeenCalledWith({
        where: { id: LocationStub.id },
      });
      expect(result).toEqual(LocationStub);
    });
  });
});
