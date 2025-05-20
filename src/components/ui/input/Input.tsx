import styles from './input.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputType = 'text' | 'number' | 'alphanumeric';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType: InputType;
  error?: FieldError;
  maxLength?: number;
  inputValue?: string;
  validators?: UseFormRegisterReturn;
  onInputChange: (value: string) => void;
  id: string;
}

export const Input = ({ 
  label, 
  error, 
  className,
  inputType,
  maxLength,
  inputValue,
  validators,
  onInputChange,
  id,
  ...props 
}: InputProps) => {

  return (
    <div className={styles.inputContainer}>
      <input
        {...props}
        {...validators}
        id={id}
        value={inputValue}
        maxLength={maxLength}
        className={`${styles.input} ${className || ''}`}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder=" "
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
