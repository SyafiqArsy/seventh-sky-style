import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard
    implements CanActivate
{

    async canActivate(
        context: ExecutionContext,
    ) {
        const request =
        context.switchToHttp().getRequest();

        const authHeader =
        request.headers.authorization;

        if (!authHeader) {
        throw new UnauthorizedException(
            'Token missing',
        );
        }

        const [type, token] =
        authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException(
            'Invalid token',
        );
        }

        try {
        const payload = jwt.verify(
        token,
        process.env.JWT_SECRET!,
        );

        request.user = payload;

        return true;
        } catch {
        throw new UnauthorizedException(
            'Invalid token',
        );
        }
    }
}