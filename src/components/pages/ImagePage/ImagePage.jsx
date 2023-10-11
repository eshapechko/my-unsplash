import {useDispatch, useSelector} from 'react-redux';
import style from './ImagePage.module.css';
import {useEffect} from 'react';
import {
  addLike,
  clearImage,
  imageRequestAsync,
  removeLike,
} from '../../../store/imageSlice/imageSlice';

import {clearPhotos} from '../../../store/photo/photosSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {ReactComponent as LikeIcon} from '../../../assets/clickLike.svg';

export const ImagePage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const token = useSelector((state) => state.token.token);
  const navigate = useNavigate();
  const data = useSelector((state) => state.image.image);
  const like = useSelector((state) => state.image.like);
  const likedUser = useSelector((state) => state.image.likedUser);
  const created = data?.created_at?.slice(0, 10);

  useEffect(() => {
    dispatch(imageRequestAsync(id));
  }, [id]);

  const backClick = () => {
    navigate(`/`);
    dispatch(clearImage());
    dispatch(clearPhotos());
  };

  const handleLike = (e) => {
    if (!token) {
      alert('Пожалуйста авторизуйтесь');
      return;
    }

    if (!likedUser) {
      dispatch(addLike(id));
      e.currentTarget.classList.add(`${style.colorLike}`);
    } else {
      dispatch(removeLike(id));
      e.currentTarget.classList.remove(`${style.colorLike}`);
    }
  };

  return (
    <section className={style.imagePage}>
      <img
        className={style.img}
        src={data?.urls?.regular}
        alt={data?.alt_description}
      />

      <a className={style.name} href={data?.user?.links.html} target='blank'>
        {data?.user?.name}
      </a>

      <p className={style.data}>{`Created: ${created}`}</p>

      <div className={style.like}>
        <button className={style.btn} onClick={handleLike}>
          <LikeIcon className={style.svg} />
        </button>
        <span className={style.count}>{like}</span>
      </div>

      <button className={style.back} onClick={backClick}>
        Вернуться назад
      </button>
    </section>
  );
};
