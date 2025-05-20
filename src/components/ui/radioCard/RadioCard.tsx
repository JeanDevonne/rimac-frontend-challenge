import { ChangeEvent } from 'react';
import styles from './radioCard.module.scss';

interface RadioCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  checked: boolean;
  onChange: (id: string) => void;
}

const RadioCard = ({
  id,
  title,
  description,
  icon,
  checked,
  onChange,
}: RadioCardProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id);
  };

  return (
    <label 
      htmlFor={id} 
      className={`${styles.card} ${checked ? styles.card__selected : ''}`}
    >
      <input
        type="radio"
        id={id}
        name="userType"
        checked={checked}
        onChange={handleChange}
        className={styles.card__input}
      />
      <div className={styles.card__checkbox}></div>
      <div className={styles.card__content}>
        <img src={icon} alt={`Icono ${title}`} className={styles.card__icon}/>
        <p className={styles.card__title}>{title}</p>
      </div>
      <p className={styles.card__description}>{description}</p>
    </label>
  );
};

export default RadioCard; 