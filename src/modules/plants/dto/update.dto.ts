import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlantDto {
  @ApiProperty({
    description: 'Plant name.',
    example: 'Monstera Deliciosa 8"',
  })
  name!: string;

  @ApiProperty({
    description: 'Short plant description.',
    example: 'Indoor tropical plant, easy care.',
  })
  description!: string;

  @ApiProperty({
    description: 'Available units in stock (integer, ≥ 0).',
    example: 25,
    minimum: 0,
  })
  stock!: number;
}
