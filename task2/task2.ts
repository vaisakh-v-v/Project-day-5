interface Serializable{
    toJSON(): string;
    fromJSON(data: string): Serializable;
}

interface Printable{
    print(): void;
    getDisplayName(): string;
}

type ValidationResult = true | false;
interface Validatabel{
    validate(): ValidationResult;
}

class DocumentClass implements Serializable, Printable, Validatabel {
  data!: object;
  value: { name: string; msg: string } = {
    name: "Vaisakh",
    msg: "Greatest Actor of all time",
  };
  fromJSON(data: string) {
    this.data = JSON.parse(data);
    return this;
  }
  toJSON(): string {
    return JSON.stringify(this.data);
  }
  print(): void {
    console.log(this.value);
  }
  getDisplayName(): string {
    return this.value.name;
  }
  validate(): ValidationResult {
    return Math.random() > 0.5 ? true : false;
  }
}