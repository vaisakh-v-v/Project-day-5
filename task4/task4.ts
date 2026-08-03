type MyReadOnly<T> = { readonly [K in keyof T]: T[K] };

type MyPartial<T> = { [K in keyof T]?: T[K] };

type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

const User = {
    id: "random id",
    name: "random name",
    createdAt: "today",
    avatar: "some url",
};

function getProperty<T extends typeof User, K extends keyof typeof User>(
    obj: T,
    key: K,
): T[K]{
    return obj[key];
}

console.log(getProperty(User, "id"));
