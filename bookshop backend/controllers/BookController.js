import BookModel from '../models/Book.js';

export const getAll = async (req, res) => {
    try {
        const books = await BookModel.find()
            .sort({
            createdAt: -1 //сортировка по дате
        });

        res.json(books);
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить книгу',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const bookId = req.params.id

        BookModel.findOneAndUpdate(
            { _id: bookId },
            { returnDocument: "After" })//we dont wanna user to see text in consol for free
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Книга не найдена" }));
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить книгу',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const bookId = req.params.id

        BookModel.findOneAndDelete(
            { _id: bookId })
            .then(doc => res.json({message: 'Статья удалена'}))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }));
    }   catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Не удалось найти книгу',
        });
    }
};

export const create = async (req, res) => {
  try {
    const doc = new BookModel({
        title:req.body.title,
        text:req.body.text,
        imageUrl:req.body.imageUrl,
        category: req.body.category,
        isInStock:req.body.isInStock,
        author:req.body.author,
        buyPrice:req.body.buyPrice,
        year:req.body.year
    });

        const book = await doc.save();

        res.json(book);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить книгу',
        });
    }
};

export const update = async (req, res) => {
    try {
        const bookId = req.params.id;

        await BookModel.updateOne(
            {_id: bookId},
            {title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            category: req.body.category,
            isInStock:req.body.isPublic,
            author:req.body.author,
            buyPrice:req.body.buyPrice,
            year:req.body.year});

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        });
    }
};

export const getLibrary = async (req, res) => {
    try {
        const _id = req.params
        console.log(_id);
        const library = (await BookModel.find());
        console.log(library);

        res.json(library);
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить Вашу библиотеку',
        });
    }
};