import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreatePlantProductDto {
  @ApiProperty({
    description: 'Product Id',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  productId!: number;

  @ApiProperty({
    description: 'Plant Id',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  plantId!: number;
}
