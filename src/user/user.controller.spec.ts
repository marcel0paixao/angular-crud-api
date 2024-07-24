import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let prismaService: PrismaService;

  const createUserDto: CreateUserDto = {
    name: "test",
    email: "test@test.test",
    password: "Test@test"
  };

  const createdUser: User = {
    id: 1,
    name: createUserDto.name,
    email: createUserDto.email,
    password: createUserDto.password,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);
    
    const result = await controller.create(createUserDto);
    expect(result).toEqual({
      ...createdUser,
      password: undefined
    });
  });
});
