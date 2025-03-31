import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Book } from '../components/Book';
import { fetchBooks } from '../redux/slices/books';

export const Home = () => {
  const dispatch = useDispatch();
  const [sortingBy, setSortingBy] = React.useState("createdAt");
  const {books} = useSelector(state => state.books);
  console.log(books)
  const userData = useSelector(state => state.auth.data);
  const isBooksLoading = books.status === 'loading'; 

  React.useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch]);
  
  const notBooks = Object.fromEntries(
    Object.entries(books).sort(([a],[b]) => a.sortingBy-b.sortingBy)
  );

  return (
    <>
        <label>
          Сортировка по:
          <select id="selectCategory" value={sortingBy} onChange={e => setSortingBy(e.target.value)}>
            <option value="category">Категории</option>
            <option value="author">Автору</option>
            <option value="year">Году написания</option>
          </select>
        </label>
      <Grid container spacing={6} >
        <Grid xs={12} item >
          {(isBooksLoading ? [...Array(5)] : notBooks.items).map((obj, index) => 
          isBooksLoading ? (
          <Book key={index} isLoading={true}/>) : (
            <Book key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4300${obj.imageUrl}` : 'http://localhost:4300/uploads/i.png'}
              category={obj.category}
              author={obj.author}
              year={obj.year}
              buyPrice={obj.buyPrice}
              isEditable={userData?.admin === true}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}