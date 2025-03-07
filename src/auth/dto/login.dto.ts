import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ConfigService } from 'src/config/config.service';


export class LoginDTO {
  @ApiProperty({
    description: 'Insira um e-mail existente',
    example: 'teste@teste.com',
  })
  @Matches(RegExp(new ConfigService().get("email_regex")), {
    message: 'E-mail inválido',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Insira a senha que corresponde ao E-mail',
    example: 'Senha@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
