import styles from './footer.module.scss';

export default function Header() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <img 
          src="/src/assets/images/logo_negative.svg" 
          alt="logo de Rimac Seguros version negativo"
          width="85"
          height="42"
          loading="eager"
          fetchPriority="high"
        />
        <div className={styles.footer__line}></div>
        <p className={styles.footer__copy}>
          © 2023 RIMAC Seguros y Reaseguros.
        </p>
      </div>
    </div>
  );
}
