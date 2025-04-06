import { ApiProperty } from '@nestjs/swagger';

export class LocationResponse {
  @ApiProperty({
    type: Number,
    description: 'firstName',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'firstName',
    example: 45,
  })
  longtitude: number;

  @ApiProperty({
    type: Number,
    description: 'firstName',
    example: -32,
  })
  latitude: number;

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
