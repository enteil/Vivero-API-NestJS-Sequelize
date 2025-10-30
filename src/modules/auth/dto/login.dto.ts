import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email address.',
    example: 'john.doe@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Password.',
    example: 'Str0ngP@ssw0rd!',
  })
  password!: string;
}
