export class UserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthEntity {
  user: Pick<UserEntity, 'name' | 'email'>;
  accessToken: string;
}
