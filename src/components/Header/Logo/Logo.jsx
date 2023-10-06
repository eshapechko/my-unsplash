import style from './Logo.module.css';
import logoPath from '../../../assets/logo.svg';
import {Svg} from '../../../UI/SVG/Svg';
import {Link} from 'react-router-dom';

export const Logo = () => (
  <Link className={style.link} to='/'>
    <Svg
      className={style.logo}
      id='logo'
      path={logoPath}
      alt='Логотип приложения My Unsplash'
    />
  </Link>
);
