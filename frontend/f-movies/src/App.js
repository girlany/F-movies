

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/Filmes";
import About2 from "./pages/Autores";

import MyButton from "./components/Button/Button";

import './App.css';


const App = () => {
    return (
  
  
         

<div className="teste">

<h1 className="hh1">Registro E-sports</h1>

<Router>
    <MyButton id="main-button" to="" />
    <MyButton  to="filmes" />
    <MyButton  to="autores" />
  
    <Routes>
   
     
        <Route path="/filmes" 
            element={<About />} />

              <Route path="/autores" 
            element={<About2 />} />




    </Routes>
</Router>

</div>
             
//<header className="container">

///</header>
       


    

       
    )
}

export default App;