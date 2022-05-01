import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }
    @Post('/signin')
    signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<JwtPayload> {
        return this.authService.sigIn(authCredentialDto);
    }
}
