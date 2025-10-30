import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { PlantsService } from '../services/plants.service';
import { CreatePlantDto } from '../dto/create.dto';
import { UpdatePlantDto } from '../dto/update.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  async getPlants(): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.plantsService.list(nurseryId);
  }

  @Get(':id')
  async getPlantById(@Param('id') id: string) {
    const nurseryId = 1;
    return await this.plantsService.getById(+id, nurseryId);
  }

  @Post()
  createPlant(@Body() data: CreatePlantDto) {
    const nurseryId = 1;
    return this.plantsService.create(data, nurseryId);
  }

  @Put(':id')
  updatePlant(@Param('id') id: string, @Body() data: UpdatePlantDto) {
    const nurseryId = 1;
    return this.plantsService.update(+id, data, nurseryId);
  }

  @Delete(':id')
  deletePlant(@Param('id') id: string) {
    const nurseryId = 1;
    return this.plantsService.delete(+id, nurseryId);
  }
}
