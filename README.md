Accounting Backend
==================

This is the backend for the accounting application. It is written in NestJs and uses a Postgres database.

Installation
-------------

1. Install all dependencies with `npm install`
2. Run `npm run prisma:generate` to generate the Prisma Client
3. Run `npm run prisma:migrate` to migrate the database
4. Run `npm run prisma:studio` to open the Prisma Studio
5. Seed the database with dummy data with `npm run seed`
6. Run `npm run start:dev` to start the app in development mode
7. Run `docker-compose up -d` to start the database
