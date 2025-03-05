import React from 'react';
import classes from '../style/Header.module.css';
import logo from '../resources/assets/logo.png';
import {Link} from "react-router";

function Header(props) {
    return (
        <div className={classes.main}>
            <Link to={"/"}><div className={classes.logo}><img src={logo}/></div></Link>
            <div className={classes.title}>Mushroom library</div>
            <div className={classes.buttons}>
                <Link to={"/article"}><div className={classes.text}>Article</div></Link>
                <Link to={"/search"}><div className={classes.text}>Database</div></Link>
                <Link to={"/predict"}><div className={classes.text}>Predict</div></Link>
            </div>
        </div>
    );
}

export default Header;
