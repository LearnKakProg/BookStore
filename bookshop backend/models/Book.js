import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    buyPrice:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
    imageUrl: String,
    isInStock: {
        type: Boolean,
},
},
{
    timestamps: true,
},
);
BookSchema.set('validateBeforeSave', true);

export default mongoose.model('Book', BookSchema);