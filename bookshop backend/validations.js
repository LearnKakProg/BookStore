import {body} from 'express-validator';

export const loginValidation =[
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
];

export const registerValidation =[
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 3}),
];

export const bookCreateValidation = [
    body('title', 'Название книги пустое').isString().isLength({min: 5}),
    body('text', 'Книга должна иметь текст').isLength({ min: 5}).isString(),
    body('category', 'Укажите жанр').isString(),
    body('imageUrl', 'Неверная ссылка').optional().isString(),
    body('isInStock', 'Статус наличия').optional().isBoolean(),
    body('year', 'Укажите год публикации').isString(),
    body('buyPrice', 'Укажите цену').isString(),
];