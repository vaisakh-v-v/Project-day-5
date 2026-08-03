"use strict";
class FormValidator {
    form;
    rules;
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }
    validate() {
        let valid = true;
        const errors = {};
        Object.keys(this.form).forEach((key) => {
            if (typeof this.rules[key] === "object") {
                Object.keys(this.rules[key]).forEach((rule) => {
                    if (rule === "required") {
                        if (typeof this.form[key] === "string") {
                            const value = this.form[key];
                            const error = this.required(value);
                            if (error) {
                                errors[key] = error;
                                valid = false;
                            }
                        }
                    }
                    if (rule === "minLength") {
                        if (typeof this.form[key] === "string") {
                            const value = this.form[key];
                            const error = this.minLength(value, this.rules[key]?.minLength);
                            if (error) {
                                errors[key] = error;
                                valid = false;
                            }
                        }
                    }
                    if (rule === "pattern") {
                        if (typeof this.form[key] === "string") {
                            const value = this.form[key];
                            const error = this.pattern(value, this.rules[key]?.pattern);
                            if (error) {
                                errors[key] = error;
                                valid = false;
                            }
                        }
                    }
                    if (rule === "custom") {
                        const error = this.custom(this.form[key], this.rules[key]?.custom);
                        if (error) {
                            errors[key] = error;
                            valid = false;
                        }
                    }
                });
            }
        });
        return { valid, errors };
    }
    required(value) {
        if (value === "")
            return "input is required";
        return null;
    }
    minLength(value, n) {
        if (!n)
            return null;
        if (value.length <= n)
            return `input is smaller than ${n}`;
        return null;
    }
    pattern(value, p) {
        if (!p)
            return null;
        if (!p.test(value))
            return `input missmatch`;
        return null;
    }
    custom(value, customFnc) {
        if (!customFnc)
            return null;
        return customFnc(value);
    }
}
const rules = {
    name: {
        required: true,
        minLength: 6,
    },
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
};
const form = {
    name: "",
    email: "3"
};
const formValidator = new FormValidator(form, rules);
console.log(formValidator.validate());
form.name = "Vaisakh";
form.email = "vaisakh@gmail.com";
console.log(formValidator.validate());
