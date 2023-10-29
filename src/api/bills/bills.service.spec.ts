import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BillsService } from './bills.service';

describe('BillsService', () => {
  let billsService: BillsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsService, PrismaService],
    }).compile();

    billsService = module.get<BillsService>(BillsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of bills', async () => {
      const expectedBills = [
        {
          id: 1,
          amount: 100,
          due_at: new Date(),
          document_number: '1',
          status: 'SENT',
          contact_email: 'johndoe@testing.com',
          contact_name: 'John Doe',
          contact_phone: '1234567890',
          contact_address: '123 Main St',
          notes: 'This is a note',
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 1,
        },
      ];

      jest
        .spyOn(prismaService.bill, 'findMany')
        .mockResolvedValue(expectedBills);

      const actualBills = await billsService.findAll(1);

      expect(actualBills).toEqual(expectedBills);
    });
  });

  describe('findOne', () => {
    it('should return a bill with the given id and user_id', async () => {
      const expectedBill = {
        id: 1,
        amount: 100,
        due_at: new Date(),
        document_number: '1',
        status: 'SENT',
        contact_email: 'johndoe@testing.com',
        contact_name: 'John Doe',
        contact_phone: '1234567890',
        contact_address: '123 Main St',
        notes: 'This is a note',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 1,
      };

      jest
        .spyOn(prismaService.bill, 'findUnique')
        .mockResolvedValue(expectedBill);

      const actualBill = await billsService.findOne(1, 1);

      expect(actualBill).toEqual(expectedBill);
    });

    it('should return null if no bill is found', async () => {
      jest.spyOn(prismaService.bill, 'findUnique').mockResolvedValue(null);

      const actualBill = await billsService.findOne(1, 1);

      expect(actualBill).toBeNull();
    });
  });
});
