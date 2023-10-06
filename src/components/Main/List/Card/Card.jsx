import style from './Card.module.css';
import PropTypes from 'prop-types';

export const Card = ({cardData}) => {
  const src = cardData.urls.small;
  const alt = cardData.alt_description;

  return (
    <li className={style.card}>
      <a href='!#'>
        <img className={style.img} src={src} alt={alt} />
      </a>
    </li>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
};
