import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { Public } from './providers/public.decorator';
import { User } from './providers/user.decorator';
import { LocalAuthGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ summary: 'Faz login com email e senha' })
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @ApiOperation({ summary: 'futura rota de registro' })
  @Post('register')
  async register(@Req() req) {
    //return this.authService.register(req.user);
    return 'not implemented yet';
  }
  @ApiOperation({ summary: 'teste como funciona o JWT vai' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    return user;
  }
}
