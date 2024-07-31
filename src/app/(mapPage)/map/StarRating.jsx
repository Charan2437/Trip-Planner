import React from 'react';
import styles from './map.module.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.starRating}>
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className={styles.star}>&#9733;</span>
      ))}
      {halfStar && <span className={styles.star}>&#9733;</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className={styles.starEmpty}>&#9734;</span>
      ))}
    </div>
  );
};

export default StarRating;