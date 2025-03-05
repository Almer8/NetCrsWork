import React, {useState} from 'react';
import classes from '../style/Predict.module.css';
import axios from "axios";
import {Link} from "react-router";

function Predict(props) {

    const [formData, setFormData] = useState({
        "capShape": "",
        "capSurface": "",
        "capColor": "",
        "bruises": "",
        "odor": "",
        "gillAttachment": "",
        "gillSpacing": "",
        "gillSize": "",
        "gillColor": "",
        "stalkShape": "",
        "stalkRoot": "",
        "stalkSurfaceAboveRing": "",
        "stalkSurfaceBelowRing": "",
        "stalkColorAboveRing": "",
        "stalkColorBelowRing": "",
        "veilType": "",
        "veilColor": "",
        "ringNumber": "",
        "ringType": "",
        "sporePrintColor": "",
        "population": "",
        "habitat": ""
    });

    const [predicted, setPredicted] = useState("")

    const predict = () => {
        axios.post("https://localhost:7155/api/predict",{
            ...formData
        }).then(res => {
            console.log(res.status)
            switch (res.data) {
                case "p":
                    setPredicted("Poisonous")
                    break;
                case "e":
                    setPredicted("Edible")
                    break;
                case "c":
                    setPredicted("Conditionaly edible")
                    break;
                default:
                    break;
            }
            let history = JSON.parse(localStorage.getItem("history")) || [];
            let result = {
                id: Date.now(),
                entity: { ...formData, edibility: res.data }
            };
            history.push(result);
            localStorage.setItem("history", JSON.stringify(history));
        }).catch(err => console.log(err));
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.form}>
                <div className={classes.formField}>
                    <label className={classes.label}>Cap shape:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["capShape"]}
                                onChange={(e) => {setFormData({...formData,"capShape": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"b"} value={"b"}>Bell</option>
                            <option key={"c"} value={"c"}>Conical</option>
                            <option key={"x"} value={"x"}>Convex</option>
                            <option key={"f"} value={"f"}>Flat</option>
                            <option key={"k"} value={"k"}>Knobbed</option>
                            <option key={"s"} value={"s"}>Sunken</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Cap surface:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["capSurface"]}
                                onChange={(e) => {setFormData({...formData,"capSurface": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"f"} value={"f"}>Fibrous</option>
                            <option key={"g"} value={"g"}>Grooves</option>
                            <option key={"y"} value={"y"}>Scaly</option>
                            <option key={"s"} value={"s"}>Smooth</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Cap color:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["capColor"]}
                                onChange={(e) => {setFormData({...formData,"capColor": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"b"} value={"b"}>Buff</option>
                            <option key={"c"} value={"c"}>Cinnamon</option>
                            <option key={"g"} value={"g"}>Gray</option>
                            <option key={"r"} value={"r"}>Green</option>
                            <option key={"p"} value={"p"}>Pink</option>
                            <option key={"u"} value={"u"}>Purple</option>
                            <option key={"e"} value={"e"}>Red</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Bruises:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["bruises"]}
                                onChange={(e) => {setFormData({...formData,"bruises": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"t"} value={"t"}>Bruises</option>
                            <option key={"f"} value={"f"}>No</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Odor:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["odor"]}
                                onChange={(e) => {setFormData({...formData,"odor": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"a"} value={"a"}>Almond</option>
                            <option key={"l"} value={"l"}>Anise</option>
                            <option key={"c"} value={"c"}>Creosote</option>
                            <option key={"y"} value={"y"}>Fishy</option>
                            <option key={"f"} value={"f"}>Foul</option>
                            <option key={"m"} value={"m"}>Musty</option>
                            <option key={"n"} value={"n"}>None</option>
                            <option key={"p"} value={"p"}>Pungent</option>
                            <option key={"s"} value={"s"}>Spicy</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Gill attachment:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["gillAttachment"]}
                                onChange={(e) => {setFormData({...formData,"gillAttachment": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"a"} value={"a"}>Attached</option>
                            <option key={"d"} value={"d"}>Descending</option>
                            <option key={"f"} value={"f"}>Free</option>
                            <option key={"n"} value={"n"}>Notched</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Gill spacing:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["gillSpacing"]}
                                onChange={(e) => {setFormData({...formData,"gillSpacing": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"c"} value={"c"}>Close</option>
                            <option key={"w"} value={"w"}>Crowded</option>
                            <option key={"d"} value={"d"}>Distant</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Gill size:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["gillSize"]}
                                onChange={(e) => {setFormData({...formData,"gillSize": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"b"} value={"b"}>Broad</option>
                            <option key={"n"} value={"n"}>Narrow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Gill color:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["gillColor"]}
                                onChange={(e) => {setFormData({...formData,"gillColor": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"k"} value={"k"}>Black</option>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"b"} value={"b"}>Buff</option>
                            <option key={"h"} value={"h"}>Chocolate</option>
                            <option key={"g"} value={"g"}>Gray</option>
                            <option key={"r"} value={"r"}>Green</option>
                            <option key={"o"} value={"o"}>Orange</option>
                            <option key={"p"} value={"p"}>Pink</option>
                            <option key={"u"} value={"u"}>Purple</option>
                            <option key={"e"} value={"e"}>Red</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk shape:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkShape"]}
                                onChange={(e) => {setFormData({...formData,"stalkShape": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"e"} value={"e"}>Enlarging</option>
                            <option key={"t"} value={"t"}>Tapering</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk root:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkRoot"]}
                                onChange={(e) => {setFormData({...formData,"stalkRoot": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"b"} value={"b"}>Bulbous</option>
                            <option key={"c"} value={"c"}>Club</option>
                            <option key={"u"} value={"u"}>Сup</option>
                            <option key={"e"} value={"e"}>Equal</option>
                            <option key={"z"} value={"z"}>Rhizomorphs</option>
                            <option key={"r"} value={"r"}>Rooted</option>
                            <option key={"?"} value={"?"}>Missing</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk surface above ring:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkSurfaceAboveRing"]}
                                onChange={(e) => {setFormData({...formData,"stalkSurfaceAboveRing": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"f"} value={"f"}>Fibrous</option>
                            <option key={"y"} value={"y"}>Scaly</option>
                            <option key={"k"} value={"k"}>Silky</option>
                            <option key={"s"} value={"s"}>Smooth</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk surface below ring:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkSurfaceBelowRing"]}
                                onChange={(e) => {setFormData({...formData,"stalkSurfaceBelowRing": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"f"} value={"f"}>Fibrous</option>
                            <option key={"y"} value={"y"}>Scaly</option>
                            <option key={"k"} value={"k"}>Silky</option>
                            <option key={"s"} value={"s"}>Smooth</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk color above ring:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkColorAboveRing"]}
                                onChange={(e) => {setFormData({...formData,"stalkColorAboveRing": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"b"} value={"b"}>Buff</option>
                            <option key={"c"} value={"c"}>Cinnamon</option>
                            <option key={"g"} value={"g"}>Gray</option>
                            <option key={"o"} value={"o"}>Orange</option>
                            <option key={"p"} value={"p"}>Pink</option>
                            <option key={"e"} value={"e"}>Red</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Stalk color below ring:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["stalkColorBelowRing"]}
                                onChange={(e) => {setFormData({...formData,"stalkColorBelowRing": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"b"} value={"b"}>Buff</option>
                            <option key={"c"} value={"c"}>Cinnamon</option>
                            <option key={"g"} value={"g"}>Gray</option>
                            <option key={"o"} value={"o"}>Orange</option>
                            <option key={"p"} value={"p"}>Pink</option>
                            <option key={"e"} value={"e"}>Red</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Veil type:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["veilType"]}
                                onChange={(e) => {setFormData({...formData,"veilType": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"p"} value={"p"}>Partial</option>
                            <option key={"u"} value={"u"}>Universal</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Veil color:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["veilColor"]}
                                onChange={(e) => {setFormData({...formData,"veilColor": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"o"} value={"o"}>Orange</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Ring number:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["ringNumber"]}
                                onChange={(e) => {setFormData({...formData,"ringNumber": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"n"} value={"n"}>None</option>
                            <option key={"o"} value={"o"}>One</option>
                            <option key={"t"} value={"t"}>Two</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Ring type:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["ringType"]}
                                onChange={(e) => {setFormData({...formData,"ringType": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"c"} value={"c"}>Cobwebby</option>
                            <option key={"e"} value={"e"}>Evanescent</option>
                            <option key={"f"} value={"f"}>Flaring</option>
                            <option key={"l"} value={"l"}>Large</option>
                            <option key={"n"} value={"n"}>None</option>
                            <option key={"p"} value={"p"}>Pendant</option>
                            <option key={"s"} value={"s"}>Sheathing</option>
                            <option key={"z"} value={"z"}>Zone</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Spore print color:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["sporePrintColor"]}
                                onChange={(e) => {setFormData({...formData,"sporePrintColor": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"k"} value={"k"}>Black</option>
                            <option key={"n"} value={"n"}>Brown</option>
                            <option key={"b"} value={"b"}>Buff</option>
                            <option key={"h"} value={"h"}>Chocolate</option>
                            <option key={"r"} value={"r"}>Green</option>
                            <option key={"o"} value={"o"}>Orange</option>
                            <option key={"u"} value={"u"}>Purple</option>
                            <option key={"w"} value={"w"}>White</option>
                            <option key={"y"} value={"y"}>Yellow</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Population:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["population"]}
                                onChange={(e) => {setFormData({...formData,"population": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"a"} value={"a"}>Abundant</option>
                            <option key={"c"} value={"c"}>Clustered</option>
                            <option key={"n"} value={"n"}>Numerous</option>
                            <option key={"s"} value={"s"}>Scattered</option>
                            <option key={"v"} value={"v"}>Several</option>
                            <option key={"y"} value={"y"}>Solitary</option>
                        </select>
                    </div>
                </div>

                <div className={classes.formField}>
                    <label className={classes.label}>Habitat:</label>
                    <div className={classes.dropdown}>
                        <select className={classes.select} value={formData["habitat"]}
                                onChange={(e) => {setFormData({...formData,"habitat": e.target.value})}}>
                            <option key={null} value={null} hidden/>
                            <option key={"g"} value={"g"}>Grasses</option>
                            <option key={"l"} value={"l"}>Leaves</option>
                            <option key={"m"} value={"m"}>Meadows</option>
                            <option key={"p"} value={"p"}>Paths</option>
                            <option key={"u"} value={"u"}>Urban</option>
                            <option key={"w"} value={"w"}>Waste</option>
                            <option key={"d"} value={"d"}>Woods</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={classes.predictButton}>
                <button onClick={()=>predict()}>Predict</button>
            </div>
            <div className={classes.ai}>
                {predicted && <div className={classes.predictionResultWrapper}>
                    <p>Your prediction is:</p>
                    <p>{predicted}</p>

                </div>}

                <div className={classes.historyButton}>
                    <Link to={'/history'}><button>History</button></Link>
                </div>
            </div>


        </div>


    );
}

export default Predict;
