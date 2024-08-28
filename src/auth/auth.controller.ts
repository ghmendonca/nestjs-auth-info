import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guards/google.guard';
import { Request as ExpressRequest } from 'express';
import { Authenticated } from './decorators/authenticated.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('/auth')
export class AuthController {
  @UseGuards(GoogleGuard)
  @Get('/google')
  async googleLogin() {}

  @UseGuards(GoogleGuard)
  @Get('/google/callback')
  async googleCallback(
    @Request()
    request: ExpressRequest,
  ) {
    console.log('request.authInfo', request.authInfo); // This is undefined, it should log {test: '1234'}

    // Here I need the authInfo because depending on its value, I need
    // to redirect to a different url. If it's a new user, redirect to
    // /welcome but if it's an existing user, redirect to /home for example

    // if (request.authInfo.newUser) {
    //   response.redirect('/welcome');
    // } else {
    //   response.redirect('/home');
    // }

    return 'OK';
  }

  @Authenticated()
  @Get('/me')
  async me(
    @CurrentUser()
    user: any,
  ) {
    return user;
  }
}
