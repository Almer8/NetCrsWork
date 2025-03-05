import React from 'react';
import classes from '../style/Mushroom.module.css';

function Mushroom(props) {
    const mushroom = props.mushroom;
    return (
        <div className={classes.wrapper}>
            <div className={classes.textblock}>
                <div className={classes.title}>{mushroom.name} ({mushroom.status})</div>
                <div className={classes.desc}><p>{mushroom.desc}</p></div>
            </div>
            <div className={classes.imgwrapper}>
                <img src={mushroom.img} alt="img"/>
            </div>
        </div>
    );
}

export default Mushroom;