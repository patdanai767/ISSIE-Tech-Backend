import { Test, TestingModule } from '@nestjs/testing';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { LocationService } from '../location/location.service';
import { CreateRiderDto } from './dtos/create-rider.dto';
import { UpdateRiderDto } from './dtos/update-rider.dto';
import { CreateLocationDto } from 'src/location/dtos/create-location.dto';

describe('RiderController', () => {
  let controller: RiderController;
  let service: RiderService;
  let locationService: LocationService;

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

  const mockRiderService = {
    getRiders: jest.fn().mockResolvedValue([RiderStub]),
    getRider: jest.fn().mockResolvedValue(RiderStub),
    getRiderWithLocations: jest.fn().mockResolvedValue(RiderLocationStub),
    createRider: jest.fn().mockResolvedValue(RiderStub),
    updateRider: jest.fn().mockResolvedValue(RiderStub),
    deleteRider: jest.fn().mockResolvedValue(RiderStub),
  };

  const mockLocationService = {
    getLocations: jest.fn().mockResolvedValue([LocationStub]),
    getLocation: jest.fn().mockResolvedValue(LocationStub),
    createLocation: jest.fn().mockResolvedValue(LocationStub),
    updateLocation: jest.fn().mockResolvedValue(LocationStub),
    deleteLocation: jest.fn().mockResolvedValue(LocationStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiderController],
      providers: [
        {
          provide: RiderService,
          useValue: mockRiderService,
        },
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<RiderController>(RiderController);
    service = module.get<RiderService>(RiderService);
    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('locationService should be defined', () => {
    expect(locationService).toBeDefined();
  });

  describe('getRiders', () => {
    it('should return riders', async () => {
      const result = await controller.getRiders();

      expect(service.getRiders).toHaveBeenCalledWith();
      expect(result).toEqual([RiderStub]);
    });
  });

  describe('getRider', () => {
    it('should return rider', async () => {
      const result = await controller.getRider(String(RiderStub.id));

      expect(service.getRider).toHaveBeenCalledWith({
        id: RiderStub.id,
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('createRider', () => {
    it('should create rider', async () => {
      const mockDto: CreateRiderDto = {
        ...RiderStub,
      };
      const result = await controller.createRider(mockDto);

      expect(service.createRider).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(RiderStub);
    });
  });

  describe('updateRider', () => {
    it('should update rider', async () => {
      jest.spyOn(service, 'updateRider').mockResolvedValueOnce(RiderStub);
      const result = await controller.updateRider(
        String(RiderStub.id),
        RiderStub,
      );

      expect(service.updateRider).toHaveBeenCalledWith({
        data: RiderStub,
        where: { id: RiderStub.id },
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('deleteRider', () => {
    it('should delete rider', async () => {
      const result = await controller.deleteRider(String(RiderStub.id));

      expect(service.getRider).toHaveBeenCalledWith({
        id: RiderStub.id,
      });
      expect(result).toEqual(RiderStub);
    });
  });

  describe('getRiderLocation', () => {
    it('should return rider', async () => {
      const result = await controller.getRiderLocation(String(RiderStub.id));

      expect(service.getRiderWithLocations).toHaveBeenCalledWith(RiderStub.id);
      expect(result).toEqual(RiderLocationStub);
    });
  });

  describe('createRiderLocation', () => {
    it('should create rider location', async () => {
      const mockLocationDto: CreateLocationDto = {
        ...LocationStub,
      };
      const result = await controller.createRiderLocation(
        String(RiderStub.id),
        mockLocationDto,
      );

      expect(locationService.createLocation).toHaveBeenCalledWith(
        RiderStub.id,
        mockLocationDto,
      );
      expect(result).toEqual(LocationStub);
    });
  });
});
