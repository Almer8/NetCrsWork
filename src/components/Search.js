import React, {useEffect, useState} from 'react';
import classes from '../style/Search.module.css'
import Modal from "./Modal";
import MushroomModal from "./MushroomModal";
import axios from "axios";
import {Link} from "react-router";

const Search = () => {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [query, setQuery] = useState()
    const [result, setResult] = useState()
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()
    const [mushroom, setMushroom] = useState()

    const saveMushroom = (mushroom) => {
        axios.post('http://localhost:5068/api/mushroom', mushroom)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsModalOpened(false);
    }

    const search = () =>{
        axios.get("http://localhost:5068/api/mushroom?q=" + query).then((response) => {
            setResult(response.data)
            setIsSearched(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className={classes.search__wrapper}>
            <div>
                <button className={classes.add__button} onClick={() =>
                {setModalLabel("Add Mushroom");
                 setIsModalOpened(true);
                 setMushroom(null);
                setModalCallback(()=>saveMushroom)}}>
                    +
                </button>
            </div>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<MushroomModal mushroomprop={mushroom} onSubmit ={modalCallback} onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.input__wrapper}>
                <input className={classes.input__field} type='text'
                       onChange={(e) => setQuery(e.target.value)}/>
                <button className={classes.search__button} onClick={()=>search()}>Search</button>
            </div>
            {isSearched &&
                <div className={classes.mushroom__container}>
                    {result.map((item, index) => (
                        <Link to={"/mushroom"} state={{mushroom: item}} className={classes.mushroom__link}>
                            <div className={classes.mushroom__item}>
                            {item.name}
                        </div></Link>
                    ))}
                </div>
            }
        </div>
    );
};

export default Search;
