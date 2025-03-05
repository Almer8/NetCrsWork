import React, {useState} from 'react';
import classes from '../style/History.module.css'
import PredictedEntity from "./PredictedEntity";

function History(props) {

    const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")))
    const callback = (elem) =>{
        let updatedHistory = history.filter(item => item !== elem)
        setHistory(updatedHistory)
        localStorage.setItem("history", JSON.stringify(updatedHistory));
    }
    return (
        <div className={classes.wrapper}>
            {history.map(elem => {
                return <PredictedEntity key={elem.id} elem={elem} callback={callback}/>;
            })}
        </div>
    );
}

export default History;