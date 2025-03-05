import React, {useEffect, useState} from 'react';
import classes from '../style/Article.module.css';
import {Link} from "react-router";
import Modal from "./Modal";
import axios from "axios";
import PoisoningModal from "./PoisoningModal";
import ArticleModal from "./ArticleModal";
const Poisoning = () => {
    const [articles, setArticles] = useState(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()


    useEffect(() => {
        axios.get(`http://localhost:5068/api/article/`).then((response) => {
            setArticles(response.data)
        })
    }, []);

    const saveArticle = (article) => {
        axios.post('http://localhost:5068/api/article/', article).then((response) => {
            setIsModalOpened(false)
            axios.get(`http://localhost:5068/api/article/`).then((response) => {
                setArticles(response.data)
            })

        }).catch((error) => {
            console.log(error);
        })

    }
    return (
        <div className={classes.article__wrapper}>
            <div>
                <button className={classes.add__button} onClick={() => {
                    setModalLabel("Add Article");
                    setIsModalOpened(true);
                    setModalCallback(() => saveArticle)
                }}>
                    +
                </button>
            </div>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<ArticleModal onSubmit={modalCallback}
                                                 onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.article__container}>
                {articles && articles.map((item, index) => (
                    <Link to={"/article/view"} state={{article: item}} className={classes.article__link}>
                        <div className={classes.article__item}>
                            {item.title} by {item.author}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Poisoning;
