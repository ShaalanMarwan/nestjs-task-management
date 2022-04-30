import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credentials.dto';
import { UsersRepository } from 'src/auth/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signup(authCredentialDto: AuthCredentialDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialDto);
  }
}
