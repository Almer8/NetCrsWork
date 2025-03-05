import React, {useEffect, useState} from 'react';
import classes from '../style/PoisoningModal.module.css';
import Select from 'react-select'
import countries from '../resources/data/countries.json';
import axios from "axios";

const PoisoningModal = ({ poisoningprop, mushroom, label, onSubmit }) => {
    const [poisoning, setPoisoning] = useState({
        date: null,
        region: null,
        desc: null,
        mushroom_id: mushroom.id
    });
    const today = new Date().toISOString().split("T")[0];


    useEffect(() => {
        if (poisoningprop) {
            setPoisoning({
                id: poisoningprop.id || null,
                date: poisoningprop.date || '',
                region: poisoningprop.region || '',
                desc: poisoningprop.desc || '',
                mushroom_id: mushroom.id
            });
        }
    }, [poisoningprop]);

    console.log(poisoningprop);
    return (
        <div className={classes.wrapper}>
            <div className={classes.text}>{label}</div>
            <input
                className={classes.name}
                type="date"
                placeholder="Date"
                max={today}
                value={poisoning.date}
                onChange={(e) => setPoisoning({ ...poisoning, date: e.target.value })}
            />
            <Select
                className={classes.choose}
                options={
                mushroom.regions.map(value => ({value, label: countries.find(c => c.value === value).label}))
                }
                value={poisoning.region ? { value: poisoning.region, label: countries.find(c => c.value === poisoning.region).label } : null}
                onChange={(e) => {
                    setPoisoning({
                        ...poisoning,
                        region: e ? e.value : null,
                    });
                }}
            />
            <textarea
                className={classes.desc}
                value={poisoning.desc}
                onChange={(e) => setPoisoning({ ...poisoning, desc: e.target.value })}
            />
            <button className={classes.save} onClick={() => onSubmit(poisoning)}>
                Save
            </button>
        </div>
    );
};

export default PoisoningModal;
