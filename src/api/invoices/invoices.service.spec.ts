import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesService, PrismaService],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of invoices', async () => {
      const userId = 1;
      const expectedInvoices = [
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
        .spyOn(prismaService.invoice, 'findMany')
        .mockResolvedValue(expectedInvoices);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedInvoices);
      expect(prismaService.invoice.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
    });
  });

  describe('findOne', () => {
    it('should return an invoice with the given id and user_id', async () => {
      const id = 1;
      const userId = 1;
      const expectedInvoice = {
        id,
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
        user_id: userId,
      };
      jest
        .spyOn(prismaService.invoice, 'findUnique')
        .mockResolvedValue(expectedInvoice);

      const result = await service.findOne(id, userId);

      expect(result).toEqual(expectedInvoice);
      expect(prismaService.invoice.findUnique).toHaveBeenCalledWith({
        where: { id, user_id: userId },
      });
    });

    it('should return null if no invoice is found', async () => {
      const id = 1;
      const userId = 1;
      jest.spyOn(prismaService.invoice, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(id, userId);

      expect(result).toBeNull();
      expect(prismaService.invoice.findUnique).toHaveBeenCalledWith({
        where: { id, user_id: userId },
      });
    });
  });
});
