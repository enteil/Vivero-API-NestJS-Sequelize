import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class CreateProductDto {
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
    description: 'Available units in stock (integer, ≥ 0).',
    example: 25,
    minimum: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty({
    description: 'Price',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  price!: number;

  @ApiProperty({
    description: 'Duration',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  duration!: number;
}
