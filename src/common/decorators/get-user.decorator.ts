// Framework
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Internal
import { Vendor } from '@/modules/vendor/vendor.schema';

interface RequestWithUser extends Request {
  user: Vendor;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Vendor => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
