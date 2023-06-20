namespace App {
  export interface ValidatorConfig {
    value: string | number;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validateInput: ValidatorConfig) {
    let isValid = true;
    if (validateInput.required) {
      isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }

    if (validateInput.minlength && typeof validateInput.value === 'string') {
      isValid =
        isValid && validateInput.value.length >= validateInput.minlength;
    }

    if (validateInput.maxlength && typeof validateInput.value === 'string') {
      isValid =
        isValid && validateInput.value.length <= validateInput.maxlength;
    }

    if (validateInput.min && typeof validateInput.value === 'number') {
      isValid = isValid && validateInput.value >= validateInput.min;
    }

    if (validateInput.max && typeof validateInput.value === 'number') {
      isValid = isValid && validateInput.value <= validateInput.max;
    }

    return isValid;
  }
}
