import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

describe('BillsController', () => {
  let billsController: BillsController;
  let billsService: BillsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BillsController],
      providers: [BillsService],
    }).compile();

    billsService = moduleRef.get<BillsService>(BillsService);
    billsController = moduleRef.get<BillsController>(BillsController);
  });

  describe('findAll', () => {
    it('should return an array of bills', async () => {
      const result = [
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
        {
          id: 2,
          amount: 200,
          due_at: new Date(),
          document_number: '2',
          status: 'PENDING',
          contact_email: 'johndoe@testing.com',
          contact_name: 'John Doe',
          contact_phone: '1234567890',
          contact_address: '123 Main St',
          notes: 'This is a note',
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 2,
        },
      ];
      jest
        .spyOn(billsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result) as any);

      expect(await billsController.findAll(1)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a bill', async () => {
      const result = {
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
        .spyOn(billsService, 'findOne')
        .mockImplementation(() => Promise.resolve(result) as any);

      expect(await billsController.findOne(1, 1)).toBe(result);
    });

    it('should throw NotFoundException when bill is not found', async () => {
      jest.spyOn(billsService, 'findOne').mockImplementation(() => null);

      await expect(billsController.findOne(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
