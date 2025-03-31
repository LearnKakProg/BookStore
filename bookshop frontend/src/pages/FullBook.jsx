import React from "react";
import ReactMarkdown from 'react-markdown'
import { Book } from "../components/Book";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useSelector } from "react-redux";
export const FullBook = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const userData = useSelector(state => state.auth.data)
  const {id} = useParams();
//Данные для редактироваия подправь и ограничь доступ к фулу
  React.useEffect(() => {
    axios
    .get(`/books/${id}`)
    .then ((res) => {setData(res.data);
      setLoading(false);
    }).catch ((err) =>{
      console.warn(err);
      alert('Ошибка FB');
    });
  }, [id]);

  if (isLoading) {
    return <Book isLoading={isLoading} isFullBook />;
  };

  return (
    <>
      <Book
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4300${data.imageUrl}` : 'http://localhost:4300/uploads/i.png'}
        category={data.category}
        author={data.author}
        year={data.year}
        buyPrice={data.buyPrice}
        text={userData.bought.includes(data._id) ? data.text : " "}

      >
      <ReactMarkdown children={userData.bought.includes(data._id) ? data.text : " "}/>
      </Book>
    </>
  );
};
