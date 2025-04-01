import cors from 'cors';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, bookCreateValidation } from './validations.js';
import checkAuth from './Utils/checkAuth.js';
import handleValidationErrors from './Utils/handleValidationErrors.js';
import * as UserController from './controllers/UserController.js';
import * as BookController from './controllers/BookController.js';
const name = '';
mongoose
    .connect('mongodb+srv://login:password@cluster0.gzhn9.mongodb.net/BookMag?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongooseDB online'))
    .catch((err) => console.log('MongooseDB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>
    {cb(null, 'uploads')},
    filename: (_, file, cb) =>
    {cb(null, file.originalname)},
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register/', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.patch('/:user&:book', checkAuth, UserController.buy);

app.post('/upload',  upload.single('image'), (req, res) =>{
    res.json({
    url: ('/uploads/' + req.file.originalname)});
});

app.get('/books', BookController.getAll);
app.get('/books/:id', BookController.getOne);
app.get('/library/get', BookController.getLibrary);
app.post('/books/post', checkAuth, bookCreateValidation, BookController.create);
app.delete('/books/:id', checkAuth, BookController.remove);
app.patch('/books/:id', checkAuth, bookCreateValidation, BookController.update);

app.listen(4300, (err) => {
    if (err) {
        return console.log(err);
    }
  console.log('Server online');
});