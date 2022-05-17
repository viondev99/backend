import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createNewUser(payload: SignUpDto) {
    return this.userRepo.create(payload).save();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ email });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = {
      email: user.email,
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      address1: user.address1,
      address2: user.address2,
    };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user?.lastname,
      address1: user?.address1,
      address2: user?.address2,
    };
  }
}
