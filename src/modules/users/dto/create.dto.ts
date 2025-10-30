import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user.',
    example: 'John',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @ApiProperty({
    description: 'Last name (surname) of the user.',
    example: 'Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  lastName!: string;

  @ApiProperty({
    description: 'Valid email address used for login and notifications.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email!: string;

  @ApiProperty({
    description:
      'User password. Minimum 8 characters. Consider mixing letters, numbers, and symbols.',
    example: 'Str0ngP@ssw0rd!',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiProperty({
    description: 'Identifier of the role assigned to the user.',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  roleId!: number;

  @ApiProperty({
    description: 'Identifier of the nursery the user belongs to.',
    example: 15,
  })
  @IsInt()
  @IsPositive()
  nurseryId!: number;

  @ApiProperty({
    description: 'Document number of the user.',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  documentNumber!: string;
}
