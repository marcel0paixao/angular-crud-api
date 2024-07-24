import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

describe('UserService', () => {
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
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual({
      ...createdUser,
      password: undefined,
    });
  });

  it('create user should return right values', async () => {  
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);

    expect(result.id).toBe(createdUser.id);
    expect(result.name).toBe(createdUser.name);
    expect(result.email).toBe(createdUser.email);
    expect(result.password).toBeUndefined(); 
  });

  it('should find a user by email', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(createdUser);

    const foundUser = await service.findByEmail(createdUser.email);
    expect(foundUser).toEqual(createdUser);
  });
});
