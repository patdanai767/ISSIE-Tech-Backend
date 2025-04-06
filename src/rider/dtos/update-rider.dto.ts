import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateRiderDto {
  @ApiPropertyOptional({
    type: String,
    description: 'firstName',
    example: 'Skibidi',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'firstName',
    example: 'Toilet',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Email',
    example: 'skibidi@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'LicensePlate',
    example: 'DOM-5678',
  })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Phone number',
    example: '0880000000',
  })
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
