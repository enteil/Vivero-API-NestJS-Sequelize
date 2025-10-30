import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MODELS } from 'src/database/database.module';
import { Product } from 'src/database/entities/init-models';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { CreateProductDto } from '../dto/create.dto';
import { UpdateProductDto } from '../dto/update.dto';
@Injectable()
export class ProductsService {
  constructor(
    @Inject(MODELS)
    private readonly models: { Product: typeof Product },
  ) {}
  async list(nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: {
        nurseryId,
      },
      attributes: ['id', 'name', 'price', 'stock', 'duration', 'amount'],
    };
    const result = await this.models.Product.findAll(queryBuilder);
    return ResponseDto.ok(result);
  }

  async getById(id: number, nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: { id, nurseryId },
      attributes: ['id', 'name', 'price', 'stock', 'duration', 'amount'],
    };
    const result = await this.models.Product.findOne(queryBuilder);
    if (!result) {
      return ResponseDto.error('Product not found', HttpStatus.NOT_FOUND);
    }
    return ResponseDto.ok(result);
  }

  async create(
    data: CreateProductDto,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const result = await this.models.Product.create({ ...data, nurseryId });
    return ResponseDto.ok(result);
  }

  async update(
    id: number,
    data: UpdateProductDto,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const product = await this.models.Product.findOne({
      where: { id, nurseryId },
    });
    if (!product) {
      return ResponseDto.error('Product not found', HttpStatus.NOT_FOUND);
    }
    await product.update(data, {
      where: { id, nurseryId },
    });
    return ResponseDto.ok(product);
  }

  async delete(id: number, nurseryId: number): Promise<ResponseDto> {
    const product = await this.models.Product.findOne({
      where: { id, nurseryId },
    });
    if (!product) {
      return ResponseDto.error('Product not found', HttpStatus.NOT_FOUND);
    }
    await product.destroy();
    return ResponseDto.ok({});
  }
}
