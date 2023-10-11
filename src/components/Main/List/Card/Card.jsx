import style from './Card.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LikeIcon} from '../../../../assets/like.svg';
import {Link} from 'react-router-dom';

export const Card = ({cardData}) => {
  const src = cardData.urls.small_s3;
  const alt = cardData.alt_description;
  const profile = cardData.user.links.html;
  const id = cardData.id;
  const width = cardData.width;
  const height = cardData.height;

  return (
    <li className={style.card}>
      <Link className={style.link} to={`/image/${id}`}>
        <img
          className={style.img}
          style={{
            aspectRatio: `${width}/${height}`,
          }}
          src={src}
          alt={alt}
        />
      </Link>

      <a className={style.name} target='blank' href={profile}>
        {cardData.user.name}
      </a>

      <button className={style.like}>
        <LikeIcon className={style.svg} />
        <p className={style.count}>{cardData.likes}</p>
      </button>
    </li>
  );
};

Card.propTypes = {
  cardData: PropTypes.object,
};
