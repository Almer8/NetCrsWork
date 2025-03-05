import '../style/App.module.css';
import {Route, Routes} from "react-router";
import Header from "./Header";
import Main from "./Main";
import Predict from "./Predict";
import History from "./History";
import classes from "../style/App.module.css";
import Search from "./Search";
import MushroomView from "./MushroomView";
import Poisoning from "./Poisoning";
import PoisoningView from "./PoisoningView";
import Article from "./Article";
import ArticleView from "./ArticleView";

function App() {
  return (
      <div className={classes.wrapper}>
          <Header/>
          <Routes>
              <Route path='/' element={<Main/>} />
              <Route path='/predict' element={<Predict/>} />
              <Route path='/history' element={<History/>} />
              <Route path='/search' element={<Search/>} />
              <Route path='/mushroom' element={<MushroomView/>} />
              <Route path='/poisoning' element={<Poisoning/>} />
              <Route path='/poisoning/view' element={<PoisoningView/>} />
              <Route path='/article' element={<Article/>} />
              <Route path='/article/view' element={<ArticleView/>} />
          </Routes>
      </div>
  );
}

export default App;
