import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { UsersRepository } from 'src/auth/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialDto);
  }

  async sigIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { password, username } = authCredentialDto;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('please check your credential ');
    }
  }
}
