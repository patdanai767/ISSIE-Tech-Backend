import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    type: Number,
    description: 'Latitude',
    example: '0',
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: Number,
    description: 'Longtitude',
    example: '0',
  })
  @IsNumber()
  @IsNotEmpty()
  longtitude: number;
}
