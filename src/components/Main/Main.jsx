import {Route, Routes} from 'react-router-dom';
import {Container} from '../Container/Container';
import {List} from './List/List';
import style from './Main.module.css';

export const Main = () => (
  <main className={style.main}>
    <Container>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/?code' element={<List />} />
      </Routes>
    </Container>
  </main>
);
