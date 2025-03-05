import React, {useState} from 'react';
import classes from '../style/PoisoningView.module.css';
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import Modal from "./Modal";
import PoisoningModal from "./PoisoningModal";
import countries from '../resources/data/countries.json';


const PoisoningView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [poisoning, setPoisoning] = useState(location.state.poisoning);
    const [mushroom, setMushroom] = useState(location.state.mushroom);

    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()

    const updatePoisoning = (poisoning) => {
        axios.put('http://localhost:5068/api/poisoning/' + poisoning.id, poisoning)
            .then((response) => {
                console.log(response);
                setPoisoning(poisoning);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsModalOpened(false);
    }
    const deletePoisoning = (poisoning) => {
        axios.delete('http://localhost:5068/api/poisoning/' + poisoning.id).then(() => {
            navigate("/search")
        })
    }

    return (
        <div className={classes.poisoning__wrapper}>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<PoisoningModal poisoningprop={poisoning} mushroom={mushroom} onSubmit ={modalCallback} onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.controls}>
                <div className={classes.buttons}>
                <div className={classes.icon__button} onClick={()=> deletePoisoning(poisoning)}>&#x274C;</div>
                <div className={classes.title}>{poisoning.date}</div>
                <div className={classes.icon__button}
                onClick={()=>{
                    setModalLabel("Edit Poisoning")
                    setModalCallback(()=>updatePoisoning);
                    setIsModalOpened(true)
                }}>&#x1F4DD;</div>
                </div>
            </div>
            <div className={classes.title}>{countries.find(c => c.value === poisoning.region).label}</div>
            <p className={classes.poisoning__desc}>{poisoning.desc}</p>
        </div>
    );
};

export default PoisoningView;
