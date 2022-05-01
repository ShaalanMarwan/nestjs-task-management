import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
  @Post('/signin')
  signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<string> {
    return this.authService.sigIn(authCredentialDto);
  }
}
