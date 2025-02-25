import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'email@example.com',
  })
  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$'), {
    message: 'E-mail inválido',
  })
  email: string;
  @IsStrongPassword({
    minLength: 8
  })
  @ApiProperty({
    type: String,
    description:
      'senha do usuário. minLength: 8',
    example: 'Senha@123',
  })
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'William Henry Harrison',
  })
  @IsNotEmpty()
  name: string;
}
