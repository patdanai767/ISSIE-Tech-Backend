import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateRiderDto {
  @ApiProperty({
    type: String,
    description: 'firstName',
    example: 'Skibidi',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'firstName',
    example: 'Toilet',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'skibidi@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'LicensePlate',
    example: 'DOM-5678',
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    type: String,
    description: 'Phone number',
    example: '0880000000',
  })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
