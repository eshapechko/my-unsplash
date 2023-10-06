import {useDispatch, useSelector} from 'react-redux';
import {Card} from './Card/Card';
import style from './List.module.css';
import {useEffect} from 'react';
import {photosRequestAsync} from '../../../store/photo/photosSlice';
import {Outlet} from 'react-router-dom';

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const photos = useSelector((state) => state.photos.photos);

  useEffect(() => {
    dispatch(photosRequestAsync());
  }, [token]);

  return (
    <>
      <ul className={style.list}>
        {photos?.map((item) => (
          <Card key={item.id} cardData={item} />
        ))}
      </ul>
      <Outlet />
    </>
  );
};
