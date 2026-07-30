interface User {
  id: string;
  name: string;
  age: number;
}

const users: Array<User> = [];

function findById(id: string): User | undefined {
  return users.find((user: User) => user.id === id);
}

function findFirst(): User | undefined{
    return users[23];
}