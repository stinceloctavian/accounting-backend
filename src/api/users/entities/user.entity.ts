import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: UserEntity) {
    Object.assign(this, partial);
  }

  id: number;

  email: string;

  password: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}
