import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <img 
          src="/assets/images/logo_positive.svg" 
          alt="logo de Rimac Seguros version positivo"
          width="74"
          height="36"
          loading="eager"
          fetchPriority="high"
        />
        <div className={styles.header__cta}>
          <span className={styles.header__cta__text}>¡Compra por este medio!</span>
          <img
            src="/assets/images/icons/GlTelephoneSolid.svg"
            alt="icono de telefono"
            width="24"
            height="24"
            loading="eager"
            fetchPriority="high"
          />
          <span className={styles.header__cta__phone}>
            (01) 411 6001
          </span>
        </div>
      </div>
    </div>
  );
}
