
import {Routes, Route} from 'react-router-dom';
import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullBook, Registration, AddBook, Login, Library} from "./pages";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(()=>{
    dispatch(fetchAuthMe());
  }, [dispatch]);
    return (
      <>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<FullBook />} />
            <Route path="/books/:id/edit" element={<AddBook />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </Container>
      </>
    );
}

export default App;
