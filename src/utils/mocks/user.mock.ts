import User from 'src/users/entities/user.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';

export const mockedUser: User = {
  id: 1,
  email: 'mateo.galic3@burza.hr',
  name: 'Mateo',
  password: 'pass1234',
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<User> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<User> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<User> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<User> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
