import { useState, useCallback } from 'react';

export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface FormState<T extends Record<string, any>> {
  fields: Record<keyof T, FormField>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FieldConfig {
  initialValue?: string;
  rules?: ValidationRule[];
  required?: boolean;
}

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule[]>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  // Initialize form state
  const [state, setState] = useState<FormState<T>>(() => {
    const fields = {} as Record<keyof T, FormField>;
    
    Object.keys(initialValues).forEach(key => {
      fields[key as keyof T] = {
        value: initialValues[key] || '',
        touched: false,
      };
    });

    return {
      fields,
      isValid: true,
      isSubmitting: false,
      isDirty: false,
    };
  });

  // Validate a single field
  const validateField = useCallback((name: keyof T, value: string): string | undefined => {
    const rules = validationRules[name] || [];
    
    for (const rule of rules) {
      if (!rule.test(value)) {
        return rule.message;
      }
    }
    
    return undefined;
  }, [validationRules]);

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...state.fields };

    Object.keys(newFields).forEach(key => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, newFields[fieldName].value);
      
      newFields[fieldName] = {
        ...newFields[fieldName],
        error,
      };

      if (error) {
        isValid = false;
      }
    });

    setState(prev => ({
      ...prev,
      fields: newFields,
      isValid,
    }));

    return isValid;
  }, [state.fields, validateField]);

  // Set field value
  const setFieldValue = useCallback((name: keyof T, value: string) => {
    setState(prev => {
      const error = validateField(name, value);
      
      return {
        ...prev,
        fields: {
          ...prev.fields,
          [name]: {
            value,
            error,
            touched: true,
          },
        },
        isDirty: true,
      };
    });
  }, [validateField]);

  // Set field error
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error,
        },
      },
    }));
  }, []);

  // Handle field blur
  const handleFieldBlur = useCallback((name: keyof T) => {
    setState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          touched: true,
        },
      },
    }));
  }, []);

  // Get form values
  const getValues = useCallback((): T => {
    const values = {} as T;
    
    Object.keys(state.fields).forEach(key => {
      values[key as keyof T] = state.fields[key as keyof T].value as T[keyof T];
    });

    return values;
  }, [state.fields]);

  // Handle form submission
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const values = getValues();
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [validateForm, getValues, onSubmit]);

  // Reset form
  const reset = useCallback(() => {
    const fields = {} as Record<keyof T, FormField>;
    
    Object.keys(initialValues).forEach(key => {
      fields[key as keyof T] = {
        value: initialValues[key] || '',
        touched: false,
      };
    });

    setState({
      fields,
      isValid: true,
      isSubmitting: false,
      isDirty: false,
    });
  }, [initialValues]);

  return {
    // State
    fields: state.fields,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    isDirty: state.isDirty,
    
    // Actions
    setFieldValue,
    setFieldError,
    handleFieldBlur,
    handleSubmit,
    reset,
    getValues,
    validateForm,
  };
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value: string) => value.trim().length > 0,
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value: string) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value: string) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  email: (message = 'Must be a valid email address'): ValidationRule => ({
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  ethereumAddress: (message = 'Must be a valid Ethereum address'): ValidationRule => ({
    test: (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value),
    message,
  }),

  number: (message = 'Must be a valid number'): ValidationRule => ({
    test: (value: string) => !isNaN(Number(value)) && value.trim() !== '',
    message,
  }),

  positiveNumber: (message = 'Must be a positive number'): ValidationRule => ({
    test: (value: string) => !isNaN(Number(value)) && Number(value) > 0,
    message,
  }),
};

export default useForm;
