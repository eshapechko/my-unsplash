import {useDispatch, useSelector} from 'react-redux';
import style from './ImagePage.module.css';
import {useEffect} from 'react';
import {
  clearImage,
  imageRequestAsync,
} from '../../../store/imageSlice/imageSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {ReactComponent as LikeIcon} from '../../../assets/like.svg';

export const ImagePage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  console.log('id: ', id);
  const navigate = useNavigate();
  const data = useSelector((state) => state.image.image);
  console.log('data: ', data);

  useEffect(() => {
    dispatch(imageRequestAsync(id));
  }, [id]);

  const backClick = () => {
    navigate(`/`);
    dispatch(clearImage());
  };

  const handleLike = () => {
    console.log('LIKESSSS');
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

      <p className={style.data}>{`Created: ${data?.created_at}`}</p>

      <div className={style.like}>
        <button className={style.btn} onClick={handleLike}>
          <LikeIcon className={style.svg} />
        </button>
        <span className={style.count}>{data?.likes}</span>
      </div>

      <button className={style.back} onClick={backClick}>
        Вернуться назад
      </button>
    </section>
  );
};
