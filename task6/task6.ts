type Rule<T = unknown> = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?:(v: T) => string | null;
};
 class FormValidator<T extends Record<string, unknown>>{
    constructor(
        private form: T,
        private rules: {[K in keyof T]?: Rule<T[K]>}
    ) {}


    validate(): { valid: boolean; errors: Partial<Record<keyof T, string>> } {
    let valid: boolean = true;
    const errors: Partial<Record<keyof T, string>> = {};
    Object.keys(this.form).forEach((key) => {
      if (typeof this.rules[key] === "object") {
        Object.keys(this.rules[key]).forEach((rule) => {
          if (rule === "required") {
            if (typeof this.form[key] === "string") {
              const value = this.form[key];
              const error: string | null = this.required(value);
              if (error) {
                errors[key as keyof T] = error;
                valid = false;
              }
            }
          }
          if (rule === "minLength") {
            if (typeof this.form[key] === "string") {
              const value = this.form[key];
              const error: string | null = this.minLength(
                value,
                this.rules[key]?.minLength,
              );

              if (error) {
                errors[key as keyof T] = error;
                valid = false;
              }
            }
          }
          if (rule === "pattern") {
            if (typeof this.form[key] === "string") {
              const value = this.form[key];
              const error: string | null = this.pattern(
                value,
                this.rules[key]?.pattern,
              );

              if (error) {
                errors[key as keyof T] = error;
                valid = false;
              }
            }
          }
          if (rule === "custom") {
            const error: string | null = this.custom(
              this.form[key] as T[string],
              this.rules[key]?.custom,
            );

            if (error) {
              errors[key as keyof T] = error;
              valid = false;
            }
          }
        });
      }
    });
    return { valid, errors };
  }


  private required(value: string): string | null{
    if(value === "") return "input is required";
    return null;
  }
  private minLength(value: string, n: number | undefined): string | null{
    if(!n) return null;
    if(value.length <= n) return `input is smaller than ${n}`;
    return null;
  }

  private pattern(value: string, p: RegExp | undefined): string | null{
    if(!p) return null;
    if(!p.test(value)) return  `input missmatch`;
    return null;
  } 

  private custom(
    value: T[string],
    customFnc: undefined | ((v: T[string]) => string | null),): string | null{
        if(!customFnc) return null;
        return customFnc(value);
    }
}

type Form = {
    name: string;
    email: string;
};

const rules: Partial<Record<keyof Form, Rule>> = {
    name: {
        required: true,
        minLength: 6,
    },
    email:{
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
};

const form: Form = {
    name: "",
    email: "3"
}

const formValidator = new FormValidator<Form>(form,rules);
console.log(formValidator.validate());

form.name = "Vaisakh";
form.email = "vaisakh@gmail.com";
console.log(formValidator.validate());
export{};

