// Framework
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// External
import { ExtractJwt, Strategy } from 'passport-jwt';

// Internal
import { VendorService } from '@/modules/vendor/vendor.service';

interface IJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly vendorService: VendorService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret') || 'secretKey',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.vendorService.findById(payload.sub);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}