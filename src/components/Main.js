import React from 'react';
import classes from '../style/Main.module.css';
import mushrooms from '../resources/data/mushrooms.json';
import Mushroom from "./Mushroom";

function Main(props) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.mushroomWrapper}>
                {mushrooms.data.map((mushroom) => (
                    <Mushroom key={mushroom.name} mushroom={mushroom} />
                ))}
            </div>
        </div>
    );
}

export default Main;
