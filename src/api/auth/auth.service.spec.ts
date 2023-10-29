import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterEntity } from './entity/register.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('register', () => {
    it('should create a new user and return a success message', async () => {
      const dto: RegisterDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const expectedResponse: RegisterEntity = {
        message: 'User created',
      };

      const hash = await argon.hash(dto.password);

      jest.spyOn(argon, 'hash').mockResolvedValue(hash);

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(dto as any);

      const response = await authService.register(dto);

      expect(response).toEqual(expectedResponse);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      });
    });
  });
});
