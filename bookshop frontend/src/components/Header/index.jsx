import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Мир Книг</div>
          </Link>
          <div className={styles.buttons}>
            {userData ? (userData.admin ? (
              <>
                <Link to="/addbook">
                  <Button variant="contained">Добавить книгу</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
              ) : 
                <>
                <Link to="/library">
                  <Button variant="contained">Моя библиотека</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
                </>
              ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outlined">Войти</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="contained">Создать аккаунт</Button>
                    </Link>
                  </>
              )}
          </div>
        </div>
      </Container>
    </div>
  );
};
