import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlantsProductsService } from '../services/plants-products.service';
import { CreatePlantProductDto } from '../dto/create.dto';

@Controller('plants-products')
export class PlantsProductsController {
  constructor(private readonly plantsProductsService: PlantsProductsService) {}
  @Get(':plantId')
  getPlantProductsByPlantId(@Param('plantId') plantId: string) {
    const nurseryId = 1;
    return this.plantsProductsService.getPlantProductsByPlantId(
      +plantId,
      nurseryId,
    );
  }

  @Post()
  createPlantProduct(@Body() data: CreatePlantProductDto) {
    const nurseryId = 1;
    return this.plantsProductsService.create(data, nurseryId);
  }
}
