import React, {useEffect, useState} from 'react';
import classes from '../style/Posioning.module.css';
import {Link, useLocation} from "react-router";
import Modal from "./Modal";
import MushroomModal from "./MushroomModal";
import axios from "axios";
import PoisoningModal from "./PoisoningModal";
const Poisoning = () => {
    const location = useLocation();
    const [mushroom, setMushroom] = useState(location.state.mushroom);
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()
    const [poisonings, setPoisonings] = useState(null)


    useEffect(() => {
        axios.get(`http://localhost:5068/api/poisoning/${mushroom.id}`).then((response) => {
            setPoisonings(response.data)
        })
    }, [mushroom]);

    const savePoisoning = (poisoning) => {
        axios.post('http://localhost:5068/api/poisoning', poisoning).then((response) => {
            console.log(response);
            axios.get(`http://localhost:5068/api/poisoning/${mushroom.id}`).then((response) => {
                setPoisonings(response.data)
            })
            setIsModalOpened(false)

        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className={classes.poisoning__wrapper}>
            <div className={classes.title}>{mushroom.name}</div>
            <div>
                <button className={classes.add__button} onClick={() => {
                    setModalLabel("Add Poisoning");
                    setIsModalOpened(true);
                    setModalCallback(() => savePoisoning)
                }}>
                    +
                </button>
            </div>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<PoisoningModal mushroom={mushroom} onSubmit={modalCallback}
                                                 onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.poisoning__container}>
                {poisonings && poisonings.map((item, index) => (
                    <Link to={"/poisoning/view"} state={{poisoning: item, mushroom: mushroom}} className={classes.poisoning__link}>
                        <div className={classes.poisoning__item}>
                            {item.date}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Poisoning;
