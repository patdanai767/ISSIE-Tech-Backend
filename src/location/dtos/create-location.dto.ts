import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    type: Number,
    description: 'Latitude',
    example: '0',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    type: Number,
    description: 'Longtitude',
    example: '0',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  longtitude: number;
}
