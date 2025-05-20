import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <img 
          src="/assets/images/logo_negative.svg" 
          alt="logo de Rimac Seguros version negativo"
          width="74"
          height="36"
        />
        <div className={styles.footer__line}></div>
        <p className={styles.footer__copy}>
          © 2023 RIMAC Seguros y Reaseguros.
        </p>
      </div>
    </footer>
  );
}
