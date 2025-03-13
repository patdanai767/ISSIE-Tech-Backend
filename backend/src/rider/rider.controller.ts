import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RiderService } from './rider.service';
import { Location, Rider } from '@prisma/client';
import { CreateRiderDto } from './dtos/create-rider.dto';
import { UpdateRiderDto } from './dtos/update-rider.dto';
import { LocationService } from '../location/location.service';
import { CreateLocationDto } from '../location/dtos/create-location.dto';
import { ApiResponse } from '@nestjs/swagger';
import { RiderLocationResponse } from './dtos/response-rider.dto';
import { LocationResponse } from '../location/dtos/response-location.dto';
import { RiderResponse } from './dtos/response-riderOnly.dto';

@Controller('riders')
export class RiderController {
  constructor(
    private readonly riderService: RiderService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Get all riders',
    isArray: true,
  })
  async getRiders(): Promise<Rider[]> {
    return this.riderService.getRiders();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Get rider',
    isArray: true,
  })
  @Get('/search')
  async searchRiders(
    @Query('latitude') latitude: string,
    @Query('longtitude') longtitude: string,
  ): Promise<Rider[]> {
    return this.riderService.searchRiders(
      parseFloat(latitude),
      parseFloat(longtitude),
    );
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Get rider',
  })
  async getRider(@Param('id') id: string): Promise<Rider | null> {
    return this.riderService.getRider({ id: Number(id) });
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Create Rider',
  })
  async createRider(@Body() createRiderDto: CreateRiderDto): Promise<Rider> {
    return this.riderService.createRider(createRiderDto);
  }

  @Patch('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Update Rider',
  })
  async updateRider(
    @Param('id') id: string,
    @Body() updateRiderDto: UpdateRiderDto,
  ): Promise<Rider> {
    return this.riderService.updateRider({
      where: { id: Number(id) },
      data: updateRiderDto,
    });
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderResponse,
    description: 'Delete Rider',
  })
  async deleteRider(@Param('id') id: string): Promise<Rider> {
    return this.riderService.deleteRider({ id: Number(id) });
  }

  @Get('/:riderId/locations')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RiderLocationResponse,
    description: 'Get all locations of RiderID',
  })
  async getRiderLocation(@Param('riderId') id: string): Promise<Rider | null> {
    return this.riderService.getRiderWithLocations(Number(id));
  }

  @Post('/:riderId/locations')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LocationResponse,
    description: 'Create location for Rider',
  })
  async createRiderLocation(
    @Param('riderId') id: string,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationService.createLocation(Number(id), createLocationDto);
  }
}
