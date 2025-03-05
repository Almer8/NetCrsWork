import React, {useEffect, useState} from 'react';
import classes from '../style/PoisoningModal.module.css';
import Select from 'react-select'
import countries from '../resources/data/countries.json';
import axios from "axios";
import CreatableSelect from "react-select/creatable";

const ArticleModal = ({ articleprop, label, onSubmit }) => {
    const today = new Date().toISOString().split("T")[0];
    const [article, setArticle] = useState({
        date: today,
        tags: null,
        author: null,
        content: null,
        title: null
    });
    const [tags, setTags] = useState()


    useEffect(() => {
        axios.get("http://localhost:5068/api/article/tags").then((response) => {
            setTags(response.data.map(t => ({ value: t, label: t })));
        }).catch(error => {
            console.log(error);
        })
        if (articleprop) {
            setArticle({
                id: articleprop.id || null,
                date: articleprop.date || '',
                tags: articleprop.tags || [],
                author: articleprop.author || '',
                content: articleprop.content || '',
                title: articleprop.title || '',
            });
        }
    }, [articleprop]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.text}>{label}</div>
            <input
                className={classes.name}
                type="text"
                placeholder="Title"
                value={article.title}
                onChange={(e) => setArticle({...article, title: e.target.value})}
            />
            <input
                className={classes.name}
                type="text"
                placeholder="Author"
                value={article.author}
                onChange={(e) => setArticle({...article, author: e.target.value})}
            />
            <CreatableSelect
                className={classes.choose}
                isMulti
                options={tags}
                value={article.tags ? article.tags.map(t => ({value: t, label: t })): []}
                onChange={(e) => {
                    setArticle({
                        ...article,
                        tags: e.map(i => i.value)
                    })
                }}
            />
            <textarea
                className={classes.desc}
                value={article.content}
                onChange={(e) => setArticle({...article, content: e.target.value})}
            />
            <button className={classes.save} onClick={() => onSubmit(article)}>
                Save
            </button>
        </div>
    );
};

export default ArticleModal;
