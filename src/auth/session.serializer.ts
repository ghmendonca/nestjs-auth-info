import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, data: any) => void): void {
    done(null, { user });
  }

  async deserializeUser(
    user: any,
    done: (err: Error | null, payload: any) => void,
  ): Promise<void> {
    if (!user) {
      throw new Error('User not found');
    }

    done(null, { user });
  }
}
