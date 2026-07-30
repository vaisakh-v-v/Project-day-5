export {};
interface User{
    id: string;
    name: string;
    createdAt: string;
    avatar: string;
}

async function updateUser(id: string, changes: Partial<User>): Promise<User>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
    });
    return res.json();
}
function createRequiredUser(data: Required<User>): User{
    return data;
}

type UserPreview = Pick<User, "id" | "name" | "avatar">;

type UserInput = Omit<User, "id" | "createdAt">;

type ConfigKey = "key1" | "key2" | "key3" | "key4";

const config: Record<ConfigKey, string> = {
    key1: "Hi this is vaisakh from palakkad",
    key2: "213",
    key3: "12312",
    key4: "randomstrin3"
};

const user: UserInput = {
    name: "Vaiskah",
    avatar: "Spiderman no way home",
}

