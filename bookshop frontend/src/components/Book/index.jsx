import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Book.module.scss';
import axios from '../../axios';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchDeletePost } from '../../redux/slices/books';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

export const Book = ({
  id,
  title,
  imageUrl,
  category,
  author,
  year,
  buyPrice,
  text,
  isInStock,
  isFullBook,
  isLoading,
  isEditable,
}) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы хотите удалить книгу?')){
    dispatch(fetchDeletePost(id));
  };
  };

  const onBuy = () => {
    if (isAuth) {
      if (userData.bought.includes(id)){
        alert('Эта книга Вами уже куплена.')
      } else {
        axios.patch(`/${userData._id}&${id}`)
      }
    } else {
      alert('Вы должны быть авторизованы для покупки.');
    }
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullBook })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/books/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullBook })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.indention}>
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullBook })}>
          {isFullBook ? title : <a href={`/books/${id}`}>{title}</a>}
        </h2>
        <h3 className={clsx(styles.price, { [styles.price]: isFullBook })}>
          {{isInStock} ? <p>{"Цена: Всего за " + buyPrice + " рублей"}</p> : ""}
        </h3>
        <ul className={styles.information}>
          <li>{"Категория: " + category}</li>
          <li>{"Автор: " + author}</li>
          <li>{"Год написания: " + year}</li>
          <li>{{isInStock} ? "Состояние: В продаже" : "Состояние: Отсутствует в продаже"} <FaShoppingCart onClick={(e) => onBuy()} className={clsx(styles.cart, { [styles.cart]: isFullBook })}/></li>
        </ul>
        <p hidden={!userData.bought.includes(id)}>{text}</p>
      </div>
    </div>//add buy icon and sell icon on buyPrice
  );
};
