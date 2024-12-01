import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe(`${PrismaService.name}`, () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should module rendered without errors', () => {
    expect(prismaService).toBeDefined();
  });
});
