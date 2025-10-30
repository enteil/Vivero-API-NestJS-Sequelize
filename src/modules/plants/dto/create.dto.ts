// src/products/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePlantDto {
  @ApiProperty({
    description: 'Product name.',
    example: 'Monstera Deliciosa 8"',
    minLength: 2,
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(120)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @ApiProperty({
    description: 'Short plant description.',
    example: 'Indoor tropical plant, easy care.',
    minLength: 3,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description!: string;

  @ApiProperty({
    description: 'Available units in stock (integer, ≥ 0).',
    example: 25,
    minimum: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty({
    description: 'Owning nursery identifier (positive integer).',
    example: 15,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  nurseryId!: number;
}
