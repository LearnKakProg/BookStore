import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import 'easymde/dist/easymde.min.css';
import axios from '../../axios';
import styles from './AddBook.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
export const AddBook = () => {
  const navigate = useNavigate();
  const inputFileRef = React.useRef(null);
  const userData = useSelector(state => state.auth.data);
  const [isInStock, setIsInStock] = React.useState(false);
  const [text, setText] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [year, setYear] = React.useState('');
  const [buyPrice, setBuyPrice] = React.useState('');
  const {id} = useParams();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const image = event.target.files[0];
      formData.append('image', image);
      const {data} = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {console.warn(err);
    alert('Ошибка файла')}
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

const isEditing = Boolean(id);

const onSubmit = async () => {
  try {

    const fields = {
      title,
      text,
      category,
      imageUrl,
      author,
      year,
      buyPrice,
      isInStock,
    };
    
    const {data} = isEditing ? await axios.patch(`/books/${id}`, fields) : await axios.post('/books/post', fields);
    const _id = isEditing ? id : data._id
    navigate(`/books/${_id}`);
  } catch (err) {
    console.warn(err);
    alert('Ошибка добавления книги');
  };
};

React.useEffect(() => {
 if (id) {
  axios.get(`/books/${id}`).then(({data}) => {
    setTitle(data.title);
    setText(data.text);
    setCategory(data.category);
    setImageUrl(data.imageUrl);
    setAuthor(data.author);
    setYear(data.year);
    setBuyPrice(data.buyPrice)
    setIsInStock(false);
  }).catch(err => {
    console.warn(err);
    alert('Ошибка редактирования книги');
  });
 }
}, [id]);



  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст книги.',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !userData.admin) {//Уберешь локал и вылетит до выполнения authme
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="contained" size="large">
        Загрузить изображение
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:4300${imageUrl}`} alt="Uploaded" />
        </>
      )}
      
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название книги. Минимум 5 символов"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Категория. Укажите жанр"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      fullWidth />
      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Автор книги"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      fullWidth />
      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Год написания"
      value={year}
      onChange={(e) => setYear(e.target.value)}
      fullWidth />
      <TextField classes={{ root: styles.info }}
      variant="standard"
      placeholder="Цена"
      value={buyPrice}
      onChange={(e) => setBuyPrice(e.target.value)}
      fullWidth />
      <input type="checkbox" id="check" value={isInStock} onChange={(e) => setIsInStock(!isInStock) && setIsInStock(e.target.value)} />
        <span>{isInStock ? 'В продаже' : 'Отсутствует в продаже'}</span>
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} id="editorAddBook"/>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
