// Framework
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

// Internal
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthService, ILoginResponse } from './auth.service';
import { CreateVendorDto } from '@/modules/vendor/dto/create-vendor.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }

  @Post('signup')
  async register(
    @Body() createVendorDto: CreateVendorDto,
  ): Promise<ILoginResponse> {
    return this.authService.register(createVendorDto);
  }

  @Post('token/refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ILoginResponse> {
    return this.authService.refreshTokens(refreshTokenDto.refresh);
  }
}
