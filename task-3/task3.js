const frozenEmail = ["vai@gmail.com", "vai2@gmail.com", "vai3@gmail.com"];
const activeUsers = [];

function createUser({ name, email, role = "viewer", createdAt = Date.now() }) {
  const users = {
    name,
    email,
    role,
    createdAt,
  };
  if (frozenEmail.includes(users.email)) {
    const frozenId = crypto.randomUUID();
    return `This user is Frozen - with userId ${frozenId}`;
  } else {
    activeUsers.push(users);
    return activeUsers;
  }
}
obj1 = { name: "vaisakh", email: "vaisakh@gmail.com" };
const result1 = createUser(obj1);
console.log(result1);

obj2 = { name: "megha", email: "vai2@gmail.com" };
const result2 = createUser(obj2);
console.log(result2);

class QuerryBuilder {
  constructor(data = []) {
    this.data = data;
    this.filters = [];
    this.fields = [];
    this.limitCount = null;
  }

  where(condition) {
    this.filters.push(condition);
    return this;
  }

  select(...fields) {
    this.fields = fields;
    return this;
  }

  limit(number) {
    this.limitCount = number;
    return this;
  }

  execute() {
    let result = this.data.filter((item) =>
      this.filters.every((fn) => fn(item)),
    );
    if (this.fields.length > 0) {
      result = result.map((item) => {
        const projected = {};
        this.fields.forEach((field) => {
          if (field in item) projected[field] = item[field];
        });
        return projected;
      });
    }
    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    return result;
  }
}

const users = [
  { id: 1, name: "Alice", age: 25, role: "Admin" },
  { id: 2, name: "Bob", age: 30, role: "User" },
  { id: 3, name: "Charlie", age: 35, role: "Admin" },
  { id: 4, name: "David", age: 22, role: "User" },
];

const quey = new QuerryBuilder(users);
console.log(quey);
const result = quey
  .where((user) => user.role === "Admin")
  .where((user) => user.age > 20)
  .select("name", "role")
  .limit(1)
  .execute();
console.log(quey);
console.log(result);

const createNotification = ({
  type = "info",
  message = "default notification message",
  duration = "3000",
  dismissible = true,
} = {}) => ({
  type,
  message,
  duration,
  dismissible,
});
const defaultAlert = createNotification();
const customAlert = createNotification({ type: "success", message: "saved" });

console.log(defaultAlert);
console.log(customAlert);
