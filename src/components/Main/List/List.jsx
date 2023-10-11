import {useDispatch, useSelector} from 'react-redux';
import {Card} from './Card/Card';
import style from './List.module.css';
import {useEffect, useRef} from 'react';
import {photosRequestAsync, updatePage} from '../../../store/photo/photosSlice';
import {Outlet} from 'react-router-dom';
import Masonry from 'react-masonry-css';

export const List = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const status = useSelector((state) => state.photos.status);
  const endList = useRef(null);

  useEffect(() => {
    dispatch(photosRequestAsync());
    dispatch(updatePage());
  }, []);

  useEffect(() => {
    if (!status) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === 'fulfilled') {
          dispatch(photosRequestAsync());
          dispatch(updatePage());
        }
      },
      {
        rootMargin: '400px',
      },
    );

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, status]);

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    860: 3,
    760: 2,
    500: 1,
  };

  return (
    <section className={style.gallery}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGridColumn}
      >
        {photos?.map((item) => (
          <Card key={item.id} cardData={item} />
        ))}
      </Masonry>

      <div ref={endList} className={style.end} />

      <Outlet />
    </section>
  );
};
