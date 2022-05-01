import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { UsersRepository } from 'src/auth/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return await this.usersRepository.createUser(authCredentialDto);
    }

    async sigIn(authCredentialDto: AuthCredentialDto): Promise<JwtPayload> {
        const { password, username } = authCredentialDto;
        const user = await this.usersRepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return {
                username,
                accessToken,
            };
        } else {
            throw new UnauthorizedException('please check your credential ');
        }
    }
}
