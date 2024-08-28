import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = await request.isAuthenticated();

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    return isAuthenticated;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const Authenticated = (): (<TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void) => {
  return applyDecorators(UseGuards(AuthenticatedGuard));
};
