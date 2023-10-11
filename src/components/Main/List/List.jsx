import {useDispatch, useSelector} from 'react-redux';
import {Card} from './Card/Card';
import style from './List.module.css';
import {useEffect, useRef} from 'react';
import {photosRequestAsync, updatePage} from '../../../store/photo/photosSlice';
import {Outlet} from 'react-router-dom';
import Masonry from 'react-masonry-css';
import ClipLoader from 'react-spinners/ClipLoader';

export const List = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const photoPage = useSelector((state) => state.photos.page);
  const loading = useSelector((state) => state.photos.loading);
  console.log('photoPage: ', photoPage);
  const endList = useRef(null);

  useEffect(() => {
    dispatch(photosRequestAsync());
    dispatch(updatePage());
  }, []);

  useEffect(() => {
    console.log('loadingOBSERV: ', loading);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(photosRequestAsync());
          dispatch(updatePage());
          console.log('OBSERVER');
        }
      },
      {
        rootMargin: '100px',
      },
    );

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    860: 3,
    760: 2,
    500: 1,
  };

  return (
    <section className={style.gallery}>
      {loading ? (
        <ClipLoader
          cssOverride={{
            display: 'block',
            margin: '0 auto',
          }}
          size={200}
        />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={style.myMasonryGrid}
          columnClassName={style.myMasonryGridColumn}
        >
          {photos?.map((item) => (
            <Card key={item.id} cardData={item} />
          ))}
        </Masonry>
      )}
      <div ref={endList} className={style.end} />

      <Outlet />
    </section>
  );
};
