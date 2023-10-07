import {useDispatch, useSelector} from 'react-redux';
import {Card} from './Card/Card';
import style from './List.module.css';
import {useEffect} from 'react';
import {photosRequestAsync} from '../../../store/photo/photosSlice';
import {Outlet} from 'react-router-dom';
import Masonry from 'react-masonry-css';

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const photos = useSelector((state) => state.photos.photos);

  useEffect(() => {
    dispatch(photosRequestAsync());
  }, [token]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    860: 3,
    760: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGridColumn}
      >
        {photos?.map((item) => (
          <Card key={item.id} cardData={item} />
        ))}
      </Masonry>

      <Outlet />
    </>
  );
};
