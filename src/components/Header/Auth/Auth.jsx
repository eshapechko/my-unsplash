import style from './Auth.module.css';
import {Text} from '../../../UI/Text/Text';
import {Svg} from '../../../UI/SVG/Svg';
import AuthIconPath from '../../../assets/auth.svg';
import {urlAuth} from '../../../api/auth';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, authRequestAsync} from '../../../store/auth/authSlice';
import {deleteToken} from '../../../store/token/tokenSlice';
import {getToken} from '../../../api/token';

export const Auth = () => {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);

  const [buttonLogout, setButtonLogout] = useState(false);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  const delToken = () => {
    dispatch(deleteToken());
    dispatch(authLogout());
    localStorage.removeItem('Bearer');
  };

  const handleClick = () => {
    setButtonLogout(!buttonLogout);
  };

  return (
    <div className={style.authContainer}>
      {authData?.name ? (
        <>
          <button onClick={handleClick} className={style.btn}>
            <img
              className={style.img}
              src={authData.authImg}
              title={authData.name}
              alt={`Аватар ${authData.name}`}
            />
          </button>
          {buttonLogout && (
            <button className={style.logout} onClick={delToken}>
              Выйти
            </button>
          )}
          <Text className={style.authName} size={12}>
            {authData.name}
          </Text>
        </>
      ) : (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <Svg path={AuthIconPath} id='auth' className={style.svg} />
        </Text>
      )}
    </div>
  );
};
