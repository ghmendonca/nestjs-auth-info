import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: '1234',
      name: 'session',
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        httpOnly: true,
        signed: false,
        secure: true,
      },
      proxy: true,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser('1234'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    credentials: true,
  });

  await app.listen(9000);
}
bootstrap();
