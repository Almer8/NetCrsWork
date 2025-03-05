import React, {useState} from 'react';
import classes from '../style/MushroomView.module.css';
import {Link, useLocation, useNavigate} from "react-router";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import worldmap from '../resources/data/map.json'
import axios from "axios";
import Modal from "./Modal";
import MushroomModal from "./MushroomModal";

const MushroomView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mushroom, setMushroom] = useState(location.state.mushroom);

    const [isModalOpened, setIsModalOpened] = useState(false)
    const [modalLabel, setModalLabel] = useState()
    const [modalCallback, setModalCallback] = useState()

    const updateMushroom = (mushroom) => {
        axios.put('http://localhost:5068/api/mushroom/' + mushroom.id, mushroom)
            .then((response) => {
                console.log(response);
                setMushroom(mushroom);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsModalOpened(false);
    }
    const deleteMushroom = (mushroom) => {
        axios.delete('http://localhost:5068/api/mushroom/' + mushroom.id).then(() => {
            navigate("/search")
        })
    }

    return (
        <div className={classes.mushroom__wrapper}>
            {isModalOpened &&
                <Modal onClose={() => setIsModalOpened(false)}
                       children={<MushroomModal mushroomprop={mushroom} onSubmit ={modalCallback} onClose={() => setIsModalOpened(false)} label={modalLabel}/>}/>}
            <div className={classes.controls}>
                <div className={classes.buttons}>
                <div className={classes.icon__button} onClick={()=> deleteMushroom(mushroom)}>&#x274C;</div>
                <div className={classes.title}>{mushroom.name}</div>
                <div className={classes.icon__button}
                onClick={()=>{
                    setModalLabel("Edit Mushroom")
                    setModalCallback(()=>updateMushroom);
                    setIsModalOpened(true)
                }}>&#x1F4DD;</div>
                </div>
                <div>
                    <Link to={"/poisoning"} state={{mushroom:
                            {...mushroom, regions: JSON.parse(mushroom.regions)}}}><button className={classes.button}>
                        Poisoning
                    </button></Link>
                </div>
            </div>
            <ComposableMap className={classes.map}>
                <Geographies geography={worldmap}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const isHighlighted = mushroom.regions.includes(geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={isHighlighted ? "#FF5733" : "#EEE"}
                                    stroke="#000"
                                    title={geo.id}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <p className={classes.mushroom__desc}>{mushroom.desc}</p>
        </div>
    );
};

export default MushroomView;
