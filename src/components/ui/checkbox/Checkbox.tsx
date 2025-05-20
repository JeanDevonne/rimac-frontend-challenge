import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './checkbox.module.scss';

interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  error?: FieldError;
  validators?: UseFormRegisterReturn;
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  name,
  error,
  validators
}: CheckboxProps) => {

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`${styles.checkboxContainer} ${error ? styles.error : ''}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        name={name}
        className={styles.checkboxInput}
        {...validators}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox; 