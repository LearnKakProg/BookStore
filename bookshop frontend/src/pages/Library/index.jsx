import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Book } from '../../components/Book';
import { fetchLibrary } from '../../redux/slices/library';
import { fetchAuthMe } from '../../redux/slices/auth';

export const Library = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);//№1 порядок селекторов оказывается важен
    const {library} = useSelector(state => state.library);//№2
    const isLibraryLoading = library.status === 'loading';
    React.useEffect(() => { setTimeout(() => {
      dispatch(fetchAuthMe())}, 1000);//For some reason AuthMe in App doesn't work
      dispatch(fetchLibrary())//dispatch в app.js выполняется медленее чем здесь - выдаёт ошибку при обновление страницы библиотеки.
    }, [dispatch]);

    return (
        <>
          <Grid container spacing={2}>
            <Grid xs={4} item>
              {(isLibraryLoading ? [...Array(5)] : library.items).map((obj, index) => 
              isLibraryLoading ? (
              <Book key={index} isLoading={true}/>) : (
                <Book
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:4300${obj.imageUrl}` : 'http://localhost:4300/uploads/i.png'}
                  category={obj.category}
                  author={obj.author}
                  year={obj.year}
                  isEditable={userData?.admin === true}
                />
              ))}
            </Grid>
          </Grid>
        </>
    );
};