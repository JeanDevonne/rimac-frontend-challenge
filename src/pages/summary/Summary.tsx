import styles from './summary.module.scss';
import SteepTracker from '../../components/ui/steepTracker/SteepTracker';
import { useUser } from '../../contexts/UserContext';
import iconUser from '../../assets/images/icons/gl_family-24x24.svg';
import { useEffect, useState } from 'react';


export default function Summary() {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={styles.summary}>
      {!isMobile && <SteepTracker step={2} backPath="/planes" />}
      <div className={styles.summary__item}>
        <p className={styles.summary__item__title}>Resumen del seguro</p>
        <div className={styles.summary__item__card}>
          <div className={styles.summary__item__card__info}>
            <p className={styles.summary__item__card__info__subtitle}>Precios calculados para:</p>
            <div className={styles.summary__item__card__info__user}>
              <img src={iconUser} alt="Icono de usuario" />
              <p>{user?.name} {user?.lastName}</p>
            </div>
            <div className={styles.summary__item__card__line}></div>
            <p className={styles.summary__item__card__info__title}>Responsable de pago</p>
            <p className={styles.summary__item__card__info__text}>{user?.docType}: <span>{user?.docNumber}</span></p>
            <p className={styles.summary__item__card__info__text}>Celular <span>{user?.phoneNumber}</span></p>
            <p className={styles.summary__item__card__info__title}>Plan elegido</p>
            <p className={styles.summary__item__card__info__text}>{user?.plan.name}</p>
            <p className={styles.summary__item__card__info__text}>Costo del Plan: <span>${user?.plan.price.toFixed(2)} al mes</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

