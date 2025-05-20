import { ChangeEvent } from 'react';
import styles from './select.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  inputValue: string;
  selectorValue: string;
  onInputChange: (value: string) => void; 
  onSelectorChange: (value: string) => void; 
  error?: FieldError;
  validators?: UseFormRegisterReturn;
  id: string;
}

const documentTypes = [
  { value: 'DNI', label: 'DNI', maxLength: 8 },
  { value: 'RUC', label: 'RUC', maxLength: 11 },
];

const Select = ({ 
  label,
  className,
  inputValue,
  selectorValue,
  onInputChange,
  onSelectorChange,
  error,
  validators,
  id,
}: SelectProps) => {

  return (
    <div className={styles.selectContainer}>
      <div className={styles.inputWrapper}>
        <label htmlFor={`${id}-select`}>
          <select 
            id={`${id}-select`}
            className={styles.select}
            value={selectorValue}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onSelectorChange(e.target.value)
            }
            aria-describedby={error ? `${id}-error` : undefined}
          >
            {documentTypes.map((type) => (
              <option 
                key={type.value} 
                value={type.value}
                aria-selected={selectorValue === type.value}
              >
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <input
          {...validators}
          id={id}
          className={`${styles.input} ${className || ''}`}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder=" "
          value={inputValue}
          maxLength={documentTypes.find(type => type.value === selectorValue).maxLength}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-invalid={!!error}
        />
        <label htmlFor={id} className={styles.label}>{label}</label>
      </div>
      {error && (
        <span 
          className={styles.errorMessage} 
          id={`${id}-error`}
          role="alert"
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;
