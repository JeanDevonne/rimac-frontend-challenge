import styles from './steepTracker.module.scss';
import iconBack from '../../../assets/images/icons/IcBack.svg';
import { useNavigate } from 'react-router-dom';
import iconSeparator from '../../../assets/images/icons/line.svg';

const STEPS = {
  PLANS: 1,
  SUMMARY: 2
} as const;

const STEP_LABELS = {
  [STEPS.PLANS]: 'Planes y coberturas',
  [STEPS.SUMMARY]: 'Resumen'
} as const;

interface StepTrackerProps {
  step: number;
  backPath: string;
}

export default function StepTracker({ step, backPath }: StepTrackerProps) {
  const navigate = useNavigate();
  
  const renderStep = (stepNumber: number) => (
    <div className={styles.steps__item}>
      <div className={`${styles.steps__item__label} ${step === stepNumber ? styles.steps__item__label__active : ''}`}>
        {stepNumber}
      </div>
      <p className={`${styles.steps__item__label__text} ${step === stepNumber ? styles.steps__item__label__text__active : ''}`}>
        {STEP_LABELS[stepNumber]}
      </p>
    </div>
  );
  
  return (
    <div className={styles.steepTracker}>
      <div className={styles.steps}>
        {renderStep(STEPS.PLANS)}
        <img src={iconSeparator} alt="Separador de pasos" style={step === STEPS.SUMMARY ? { filter: 'grayscale(100%)', opacity: 0.5 } : {}}/>
        {renderStep(STEPS.SUMMARY)}
      </div>
      <div className={styles.steepTracker__back}>
        <div onClick={() => navigate(backPath)} className={styles.steepTracker__back__container}>
          <div className={styles.steepTracker__back__container__icon}>
            <img src={iconBack} alt="Volver" />
            <div className={styles.steepTracker__back__container__progress}>
              <p className={styles.steepTracker__back__container__progress__text}>PASO 1 DE 2</p>
              <div className={styles.steepTracker__back__container__progress__bar}>
                <div className={styles.steepTracker__back__container__progress__bar__fill}></div>
              </div>
            </div>
          </div>
          <p className={styles.steepTracker__back__container__text}>Volver</p>
        </div>
      </div>
    </div>
  );
}

