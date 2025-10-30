import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
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
      'User password. Minimum 8 characters; consider mixing letters, numbers, and symbols.',
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
    description:
      'National ID / document number (kept as string to preserve leading zeros). Alphanumeric, dots and dashes allowed.',
    example: '1037654321',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^[A-Za-z0-9.\-]{5,30}$/, {
    message:
      'documentNumber must be 5-30 characters and only contain letters, numbers, dot or dash',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  documentNumber!: string;
}
