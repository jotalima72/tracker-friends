import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './providers/local.strategy';
import { JwtStrategy } from './providers/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guards';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      //Descomentar quando for usar todas as rotas protegidas
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },],
  imports: [UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: new ConfigService().get('jwt_secret'),
      signOptions: { expiresIn: '24h' },
    }),]
})
export class AuthModule { }
