import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterEntity } from './entity/register.entity';
import { UserEntity, AuthEntity } from './entity/auth.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterEntity> {
    const hash = await argon.hash(dto.password);

    try {
      await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      });

      return { message: 'User created' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return await this.signToken(user);
  }

  private async signToken(user: UserEntity): Promise<AuthEntity> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: '1d', secret },
    );

    const { name, email } = user;

    return {
      user: { name, email },
      accessToken: token,
    };
  }
}
