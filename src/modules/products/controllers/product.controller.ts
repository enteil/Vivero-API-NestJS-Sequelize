import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { CreateProductDto } from '../dto/create.dto';
import { UpdateProductDto } from '../dto/update.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.productsService.list(nurseryId);
  }
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.productsService.getById(+id, nurseryId);
  }
  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.productsService.create(data, nurseryId);
  }
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.productsService.update(+id, data, nurseryId);
  }
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.productsService.delete(+id, nurseryId);
  }
}
