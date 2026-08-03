type IsArray<T> = T extends any[]? true:false;
type TestArray = IsArray<string[]>;
let isDummyArr: TestArray = true;
console.log(isDummyArr);
type Flatten<T> = T extends Array<infer Item>? Item: T;
type DummyNestedArr = Array<Array<number>>;
const dummyNestedArr: DummyNestedArr = [[1,2,3,4,5]];
const secondDummy: Flatten<DummyNestedArr> = dummyNestedArr.flat();

console.log(secondDummy);
type MyAwaited<T> = T extends Promise<infer U>? MyAwaited<U>:T;