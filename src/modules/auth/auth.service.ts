// Framework
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Internal
import { Vendor } from '@/modules/vendor/vendor.schema';
import { comparePassword } from '@/common/utils/hash.util';
import { VendorService } from '@/modules/vendor/vendor.service';
import { CreateVendorDto } from '@/modules/vendor/dto/create-vendor.dto';

export interface ILoginResponse {
  access: string;
  refresh: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly vendorService: VendorService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  login(user: Vendor): ILoginResponse {
    const payload = { sub: user._id, email: user.email };
    return {
      access: this.jwtService.sign(payload),
      refresh: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async register(createVendorDto: CreateVendorDto): Promise<ILoginResponse> {
    const user = await this.vendorService.create(createVendorDto);
    return this.login(user);
  }

  async refreshTokens(refreshToken: string): Promise<ILoginResponse> {
    try {
      const payload = this.jwtService.verify<{ sub: string }>(refreshToken);
      const user = await this.vendorService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');
      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, pass: string): Promise<Vendor | null> {
    const user = await this.vendorService.findByEmail(email);
    if (!user) return null;

    const isMatch = await comparePassword(pass, user.passwordHash);
    if (isMatch) return user;

    return null;
  }
}
