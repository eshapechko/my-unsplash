import style from './Logo.module.css';
import logoPath from '../../../assets/logo.svg';
import {Svg} from '../../../UI/SVG/Svg';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {clearImage} from '../../../store/imageSlice/imageSlice';

export const Logo = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearImage());
  };

  return (
    <Link className={style.link} to='/' onClick={handleClick}>
      <Svg
        className={style.logo}
        id='logo'
        path={logoPath}
        alt='Логотип приложения My Unsplash'
      />
    </Link>
  );
};
