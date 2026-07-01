// Build FormValidator(form, rules) - rules maps field names to arrays of rule objects
// 378. Support: required, minLength(n), maxLength(n), pattern(regex), email, match(otherField),
// custom(fn)
// 379. Validate on blur (individual field) and on submit (all fields)
// 380. Show inline errors in span.field-error. Add/remove is-invalid and is-valid CSS classes.
// 381. Apply to the registration form from Week 1
rules = {
  name: { required: true, minLength: 2, maxLength: 10 },
  email: { required: true, email: true },
  phone: { required: true },
  keyAchievements: { required: false },
  role: {
    required: true,
    custom: { fn: (value) => value.toLowerCase() === "admin" },
  },
  linkedin: { required: true },
  company: { required: true },
  experience: { required: true },
  coverletter: { required: true },
  url: { required: true },
  password: { required: true },
  repassword: { required: true, match: "password" },
};

class FormValidator {
  constructor(form, rules) {
    this.rules = rules;
    this.form = form;
  }

  validate(field) {
    console.log(field.name);
    console.log(this.rules);
    if (!this.rules[field.name]) 
        {return;}
    console.log(field);
    const fieldRules = this.rules[field.name];
    let flag = 0;
    const span = field.nextElementSibling;
    for (let fieldRule in fieldRules) {
      switch (fieldRule) {
        case "required": {
          if (fieldRules[fieldRule]) {
            if (field.value.trim() == "") {
              span.textContent = "error:" + field.name + "field is required";
              flag = 1;
            }
          }
          break;
        }
        case "minLength": {
          if (fieldRules[fieldRule] > field.value.length) {
            span.textContent = "minimum length is" + fieldRules[fieldRule];
            flag = 1;
          }
          break;
        }
        case "maxLength": {
          if (fieldRules[fieldRule] < field.value.length) {
            span.textContent =
              "maximum allowed length is" + fieldRules[fieldRules];
            flag = 1;
          }
          break;
        }
        case "pattern": {
          if (!fieldRules[fieldRule].test(field.value)) {
            span.textContent = "pattern doesnt match";
          }
        }
        case "email": {
          const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
          if (!pattern.test(field.value)) {
            span.textContent = "email format is wrong";
            flag = 1;
          }
          break;
        }
        case "match": {
          const otherField = fieldRule[fieldRule];
          const element = document.querySelector(`[name ="${otherField}"]`);
          if (element.value !== field.value) {
            span.textContent = "not matching";
            flag = 1;
          }
          break;
        }
        case "custom": {
          if (!fieldRules[fieldRule].fn(field.value)) {
            span.textContent = "doesnt match custom function";
            flag = 1;
          }
          break;
        }
      }
    }
    if (flag == 1) {
      field.classList.add();
      field.classList.remove("is-valid");
    } else {
      field.classList.add("is-valid");
      field.classList.remove("is-invalid");
      span.textConte;
    }
  }
  validateAll() {
    Object.keys(this.rules).forEach((key) => {
      this.validate(this.form[key]);
    });
  }

  display() {
     console.log(this.form);
  }
}

const form = document.querySelector("form");
const formValidator = new FormValidator(form, rules);
form.addEventListener(
  "blur",
  (event) => {
    formValidator.validate(event.target);
  },
  true,
);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidator.validateAll();
});
