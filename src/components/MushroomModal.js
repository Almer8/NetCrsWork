import React, {useEffect, useState} from 'react';
import classes from '../style/MushroomModal.module.css';
import Select from 'react-select'
import countries from '../resources/data/countries.json';
import axios from "axios";

const MushroomModal = ({ mushroomprop, label, onSubmit }) => {
    const [mushroom, setMushroom] = useState({
        name: '',
        regions: '[]',
        desc: '',
    });


    useEffect(() => {
        if (mushroomprop) {
            setMushroom({
                id: mushroomprop.id || null,
                name: mushroomprop.name || '',
                regions: JSON.stringify(mushroomprop.regions) || '[]',
                desc: mushroomprop.desc || '',
            });
        }
    }, [mushroomprop]);



    return (
        <div className={classes.wrapper}>
            <div className={classes.text}>{label}</div>
            <input
                className={classes.name}
                type="text"
                placeholder="Name"
                value={mushroom.name}
                onChange={(e) => setMushroom({ ...mushroom, name: e.target.value })}
            />
            <Select
                className={classes.choose}
                isMulti
                options={countries}
                value={mushroom.regions ? JSON.parse(mushroom.regions).map(
                    value => ({ value, label: countries.find(c => c.value === value).label })) : []}
                onChange={(e) => {
                    setMushroom({
                        ...mushroom,
                        regions: e ? JSON.stringify(e.map(e => e.value)) : "[]",
                    });
                }}
            />
            <textarea
                className={classes.desc}
                value={mushroom.desc}
                onChange={(e) => setMushroom({ ...mushroom, desc: e.target.value })}
            />
            <button className={classes.save} onClick={() => onSubmit(mushroom)}>
                Save
            </button>
        </div>
    );
};

export default MushroomModal;
