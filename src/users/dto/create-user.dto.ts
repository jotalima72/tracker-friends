import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator";
import { ConfigService } from "src/config/config.service";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'email@example.com',
  })
  @IsNotEmpty()
  @Matches(RegExp(new ConfigService().get('email_regex')), {
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
