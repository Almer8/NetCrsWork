import React, {useState} from 'react';
import classes from '../style/ArticleView.module.css';
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import Modal from "./Modal";
import ArticleModal from "./ArticleModal";


const PoisoningView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [article, setArticle] = useState(location.state.article);

    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()

    const updateArticle = (article) => {
        axios.put('http://localhost:5068/api/article/' + article.id, article)
            .then((response) => {
                console.log(response);
                setIsModalOpened(false);
                setArticle(article);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const deleteArticle = (article) => {
        axios.delete('http://localhost:5068/api/article/' + article.id).then(() => {
            navigate("/article")
        })
    }

    return (
        <div className={classes.article__wrapper}>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<ArticleModal articleprop={article} onSubmit={modalCallback}
                                               onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.controls}>
                <div className={classes.buttons}>
                    <div className={classes.icon__button} onClick={() => deleteArticle(article)}>&#x274C;</div>
                    <div className={classes.title}>{article.title}</div>
                    <div className={classes.icon__button}
                         onClick={() => {
                             setModalLabel("Edit Article")
                             setModalCallback(() => updateArticle);
                             setIsModalOpened(true)
                         }}>&#x1F4DD;</div>
                </div>
            </div>
            <div className={classes.metadata}>Article by: {article.author}</div>
            <div className={classes.metadata}>Submitted at {article.date}</div>
            <p className={classes.article__content}>{article.content}</p>
        </div>
    );
};

export default PoisoningView;
