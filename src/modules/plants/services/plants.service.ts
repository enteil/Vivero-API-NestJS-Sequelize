import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MODELS } from 'src/database/database.module';
import { Plant } from 'src/database/entities/init-models';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { CreatePlantDto } from '../dto/create.dto';
import { UpdatePlantDto } from '../dto/update.dto';

@Injectable()
export class PlantsService {
  constructor(
    @Inject(MODELS)
    private readonly models: { Plant: typeof Plant },
  ) {}

  async list(nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: {
        nurseryId,
      },
      attributes: ['id', 'name', 'description', 'stock'],
    };
    const result = await this.models.Plant.findAll(queryBuilder);
    return ResponseDto.ok(result);
  }

  async getById(id: number, nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: {
        id,
        nurseryId,
      },
      attributes: ['id', 'name', 'description', 'stock'],
    };
    const result = await this.models.Plant.findOne(queryBuilder);
    if (!result) {
      return ResponseDto.error('Plant not found', HttpStatus.NOT_FOUND);
    } else {
      return ResponseDto.ok(result);
    }
  }

  async create(data: CreatePlantDto, nurseryId: number): Promise<ResponseDto> {
    const result = await this.models.Plant.create({ ...data, nurseryId });
    return ResponseDto.ok(result);
  }

  async update(
    id: number,
    data: UpdatePlantDto,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const plant = await this.models.Plant.findOne({ where: { id, nurseryId } });
    if (!plant) {
      return ResponseDto.error('Plant not found', HttpStatus.NOT_FOUND);
    }
    const result = await plant.update(data, {
      where: { id, nurseryId },
    });
    return ResponseDto.ok(result);
  }

  async delete(id: number, nurseryId: number): Promise<ResponseDto> {
    const plant = await this.models.Plant.findOne({ where: { id, nurseryId } });
    if (!plant) {
      return ResponseDto.error('Plant not found', HttpStatus.NOT_FOUND);
    }
    await plant.destroy();
    return ResponseDto.ok({});
  }
}
