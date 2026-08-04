function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const orginalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method Name - ${propertyKey}`);
    console.log(`Arguements - ${JSON.stringify(args)}`);
    const returnValue = orginalMethod(...args);
    console.log(`Return Value - ${returnValue}`);
    return returnValue;
  };
  return descriptor;
}

@sealed
class User {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  private getTitle() {
    return this.title;
  }

  @log
  getReturnWithParams(param: any) {
    return `Some Value`;
  }
}

const user = new User("some title");
user.getReturnWithParams("some params");