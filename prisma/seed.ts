import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Create two dummy users
  const passwordJohnDoe = await argon.hash('password-john-doe');
  const passwordJaneDoe = await argon.hash('password-jane-doe');

  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@testing.com' },
    update: {
      password: passwordJohnDoe,
    },
    create: {
      name: 'John Doe',
      email: 'johndoe@testing.com',
      password: passwordJohnDoe,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'janedoe@testing.com' },
    update: {
      password: passwordJaneDoe,
    },
    create: {
      name: 'Jane Doe',
      email: 'janedoe@testing.com',
      password: passwordJaneDoe,
    },
  });

  // Create three dummy bills and invoices
  const bill1 = await prisma.bill.upsert({
    where: { id: 1 },
    update: {
      user_id: user1.id,
    },
    create: {
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
      user_id: user1.id,
    },
  });

  const bill2 = await prisma.bill.upsert({
    where: { id: 2 },
    update: {
      user_id: user1.id,
    },
    create: {
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
      user_id: user1.id,
    },
  });

  const bill3 = await prisma.bill.upsert({
    where: { id: 3 },
    update: {
      user_id: user2.id,
    },
    create: {
      id: 3,
      amount: 300,
      due_at: new Date(),
      document_number: '3',
      status: 'CANCELLED',
      contact_email: 'janedoe@testing.com',
      contact_name: 'Jane Doe',
      contact_phone: '1234567890',
      contact_address: '123 Main St',
      notes: 'This is a note',
      user_id: user2.id,
    },
  });

  const invoice1 = await prisma.invoice.upsert({
    where: { id: 1 },
    update: {
      user_id: user1.id,
    },
    create: {
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
      user_id: user1.id,
    },
  });

  const invoice2 = await prisma.invoice.upsert({
    where: { id: 2 },
    update: {
      user_id: user2.id,
    },
    create: {
      id: 2,
      amount: 200,
      due_at: new Date(),
      document_number: '2',
      status: 'SENT',
      contact_email: 'janedoe@testing.com',
      contact_name: 'Jane Doe',
      contact_phone: '1234567890',
      contact_address: '123 Main St',
      notes: 'This is a note',
      user_id: user2.id,
    },
  });

  const invoice3 = await prisma.invoice.upsert({
    where: { id: 3 },
    update: {
      user_id: user2.id,
    },
    create: {
      id: 3,
      amount: 300,
      due_at: new Date(),
      document_number: '3',
      status: 'SENT',
      contact_email: 'janedoe@testing.com',
      contact_name: 'Jane Doe',
      contact_phone: '1234567890',
      contact_address: '123 Main St',
      notes: 'This is a note',
      user_id: user2.id,
    },
  });

  console.log({
    user1,
    user2,
    bill1,
    bill2,
    bill3,
    invoice1,
    invoice2,
    invoice3,
  });
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client at the end
    await prisma.$disconnect();
  });
