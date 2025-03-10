import { ApiProperty } from '@nestjs/swagger';

export class RiderResponse {
  @ApiProperty({
    type: Number,
    description: 'firstName',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'firstName',
    example: 'Skibidi',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'firstName',
    example: 'Toilet',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'skibidi@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'LicensePlate',
    example: 'DOM-5678',
  })
  licensePlate: string;

  @ApiProperty({
    type: String,
    description: 'Phone number',
    example: '0880000000',
  })
  phoneNumber: string;

  @ApiProperty({
    type: Date,
    description: 'Created At',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated At',
    example: new Date(),
  })
  updatedAt: Date;
}
