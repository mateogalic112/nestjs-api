import User from 'src/users/entities/user.entity';

export const mockedUser: User = {
  id: 1,
  email: 'mateo.galic@burza.hr',
  name: 'John',
  password: 'pass1234',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
  hasId() {
    throw new Error('Function not implemented.');
  },
  save(): Promise<User> {
    throw new Error('Function not implemented.');
  },
  remove() {
    throw new Error('Function not implemented.');
  },
  softRemove(): Promise<User> {
    throw new Error('Function not implemented.');
  },
  recover(): Promise<User> {
    throw new Error('Function not implemented.');
  },
  reload(): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
