import styles from './bubble.module.scss';

export default function BubbleBackground() {
  return (
    <div className={styles.bubblesContainer}>
      <div 
        className={`${styles.bubble} ${styles.bubbleLeft}`}
      />
      <div 
        className={`${styles.bubble} ${styles.bubbleRight}`}
      />
    </div>
  );
}