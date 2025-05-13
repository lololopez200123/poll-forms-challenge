import { ref } from 'vue';

export interface ValidationRule {
  validate: (value: unknown) => boolean;
  message: string;
}

export function useValidation() {
  const errors = ref<Record<string, string>>({});

  const validateField = (
    fieldName: string,
    value: unknown,
    rules: ValidationRule[]
  ): boolean => {
    delete errors.value[fieldName];

    for (const rule of rules) {
      if (!rule.validate(value)) {
        errors.value[fieldName] = rule.message;
        return false;
      }
    }

    return true;
  };

  const validateFields = <T extends Record<string, unknown>>(
    fields: T,
    rulesMap: Record<keyof T, ValidationRule[]>
  ): boolean => {
    let isValid = true;

    errors.value = {};

    for (const fieldName of Object.keys(rulesMap) as Array<keyof T & string>) {
      const isFieldValid = validateField(
        fieldName,
        fields[fieldName],
        rulesMap[fieldName]
      );
      if (!isFieldValid) {
        isValid = false;
      }
    }

    return isValid;
  };

  const getFieldError = (fieldName: string): string => {
    return errors.value[fieldName] || '';
  };

  const hasErrors = (): boolean => {
    return Object.keys(errors.value).length > 0;
  };

  const rules = {
    required: (message = 'This field is required'): ValidationRule => ({
      validate: (value: unknown): boolean => {
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null;
      },
      message,
    }),

    minLength: (
      min: number,
      message = `Must be at least ${min} characters`
    ): ValidationRule => ({
      validate: (value: unknown): boolean =>
        typeof value === 'string' && value.trim().length >= min,
      message,
    }),

    pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
      validate: (value: unknown): boolean => regex.test(String(value)),
      message,
    }),

    custom: (
      validationFn: (value: unknown) => boolean,
      message: string
    ): ValidationRule => ({
      validate: validationFn,
      message,
    }),
  };

  return {
    errors,
    validateField,
    validateFields,
    getFieldError,
    hasErrors,
    rules,
  };
}
