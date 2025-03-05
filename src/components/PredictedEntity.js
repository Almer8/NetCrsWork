import React from 'react';
import classes from '../style/PredictedEntity.module.css'
import axios from "axios";

function PredictedEntity(props) {

    const transform = {
        e: "Edible",
        p: "Poisonous",
        c: "Conditionaly edible"
    }
    const convertTime = (date) => {
        return new Date(date).toLocaleString("uk", {})
    }

    const retrainWithEntity = () => {
        axios.post("https://localhost:7155/api/retrain",{
            ...props.elem.entity,
        }).then(res => {
            props.callback(props.elem)
        }).catch(err => {console.log(err)})

    }

    const deleteEntity = () => {
        props.callback(props.elem)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.section}>
                <div className={classes.field}>{convertTime(props.elem.id)}</div>
            </div>
            <div className={classes.section}>
                <div className={classes.field}>Predicted as: {transform[props.elem.entity.edibility]}</div>
            </div>
            <div className={classes.section}>
                <div className={classes.button} onClick={() => retrainWithEntity()}>✅</div>
                <div className={classes.button} onClick={() => deleteEntity()}>❌</div>
            </div>
        </div>
    );
}

export default PredictedEntity;