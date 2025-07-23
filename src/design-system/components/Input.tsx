import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { inputClasses } from '../utils';

// ===== INPUT VARIANTS =====
const inputVariants = cva(
  inputClasses.base,
  {
    variants: {
      variant: {
        default: inputClasses.variants.default,
        error: inputClasses.variants.error,
        success: inputClasses.variants.success,
      },
      size: {
        sm: inputClasses.sizes.sm,
        md: inputClasses.sizes.md,
        lg: inputClasses.sizes.lg,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ===== INPUT INTERFACES =====
export interface InputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text to display below input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Icon to display at the start of input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of input
   */
  endIcon?: React.ReactNode;
  /**
   * Whether the input is full width
   */
  fullWidth?: boolean;
}

// ===== INPUT COMPONENT =====
const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  variant,
  size,
  label,
  helperText,
  error,
  startIcon,
  endIcon,
  fullWidth = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);
  const actualVariant = hasError ? 'error' : variant;

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Start Icon */}
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400 dark:text-gray-500 h-5 w-5">
              {startIcon}
            </div>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            inputVariants({ variant: actualVariant, size }),
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />

        {/* End Icon */}
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400 dark:text-gray-500 h-5 w-5">
              {endIcon}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          hasError 
            ? 'text-error-600 dark:text-error-400' 
            : 'text-gray-600 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// ===== TEXTAREA COMPONENT =====
export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof inputVariants>, 'size'> {
  /**
   * Textarea label
   */
  label?: string;
  /**
   * Helper text to display below textarea
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the textarea is full width
   */
  fullWidth?: boolean;
  /**
   * Number of rows for the textarea
   */
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  variant,
  label,
  helperText,
  error,
  fullWidth = false,
  rows = 3,
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);
  const actualVariant = hasError ? 'error' : variant;

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          inputVariants({ variant: actualVariant, size: 'md' }),
          fullWidth && 'w-full',
          'resize-y',
          className
        )}
        {...props}
      />

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          hasError 
            ? 'text-error-600 dark:text-error-400' 
            : 'text-gray-600 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// ===== SELECT COMPONENT =====
export interface SelectProps 
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Select label
   */
  label?: string;
  /**
   * Helper text to display below select
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the select is full width
   */
  fullWidth?: boolean;
  /**
   * Options for the select
   */
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  variant,
  size,
  label,
  helperText,
  error,
  fullWidth = false,
  options = [],
  placeholder,
  children,
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);
  const actualVariant = hasError ? 'error' : variant;

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* Select */}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          inputVariants({ variant: actualVariant, size }),
          fullWidth && 'w-full',
          'cursor-pointer',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
        
        {children}
      </select>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          hasError 
            ? 'text-error-600 dark:text-error-400' 
            : 'text-gray-600 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Input;
export { Textarea, Select };
