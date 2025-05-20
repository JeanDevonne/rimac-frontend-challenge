import { ChangeEvent, useState } from 'react';
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
}: SelectProps) => {

  return (
    <div className={styles.selectContainer}>
      <div className={styles.inputWrapper}>
        <select 
          className={styles.select}
          value={selectorValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onSelectorChange(e.target.value)
          }
        >
          {documentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <input
          {...validators}
          className={`${styles.input} ${className || ''}`}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder=" "
          value={inputValue}
          maxLength={documentTypes.find(type => type.value === selectorValue).maxLength}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <label className={styles.label}>{label}</label>
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default Select;
