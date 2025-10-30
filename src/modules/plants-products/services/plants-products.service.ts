import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { MODELS } from 'src/database/database.module';
import {
  Plant,
  PlantProduct,
  Product,
} from 'src/database/entities/init-models';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import moment from 'moment';
import { CreatePlantProductDto } from '../dto/create.dto';

@Injectable()
export class PlantsProductsService {
  constructor(
    @Inject(MODELS)
    private readonly models: {
      PlantProduct: typeof PlantProduct;
      Product: typeof Product;
      Plant: typeof Plant;
    },
  ) {}

  async getPlantProductsByPlantId(plantId: number, nurseryId: number) {
    const queryBuilder = {
      where: { plantId, nurseryId },
      attributes: ['id', 'plantId', 'productId', 'nurseryId', 'expirationDate'],
      include: [
        {
          model: this.models.Product,
          attributes: ['id', 'name', 'duration'],
        },
      ],
      raw: true,
    };

    const result = await this.models.PlantProduct.findAll(queryBuilder);
    if (!result) {
      return ResponseDto.error('Plant product not found', HttpStatus.NOT_FOUND);
    }

    const newResult = result.map((item: any) => ({
      id: item.id,
      expirationDate: item.expirationDate,
      product: {
        id: item['Product.id'],
        name: item['Product.name'],
        duration: +item['Product.duration'],
      },
    }));

    return ResponseDto.ok(newResult);
  }

  async create(
    data: CreatePlantProductDto,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const product: any = await this.models.Product.findOne({
      where: { id: data.productId, nurseryId },
      raw: true,
    });
    if (!product) {
      return ResponseDto.error('Product not found', HttpStatus.NOT_FOUND);
    }

    const plant: any = await this.models.Plant.findOne({
      where: { id: data.plantId, nurseryId },
      raw: true,
    });
    if (!plant) {
      return ResponseDto.error('Plant not found', HttpStatus.NOT_FOUND);
    }

    const plantProductAlreadyExists = await this.models.PlantProduct.findOne({
      where: {
        plantId: data.plantId,
        productId: data.productId,
        nurseryId,
        expirationDate: { [Op.gte]: moment().format('YYYY-MM-DD') },
      },
      raw: true,
    });

    if (plantProductAlreadyExists) {
      return ResponseDto.error(
        'Plant product already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const expirationDate = moment()
      .add(+product.duration, 'days')
      .format('YYYY-MM-DD');

    await this.models.PlantProduct.create({
      ...data,
      expirationDate,
      nurseryId,
    });
    return ResponseDto.ok({});
  }
}
