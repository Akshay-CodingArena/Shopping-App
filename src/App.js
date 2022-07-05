import Home from "./Home";
import Product from "./Product";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
function App(){
  return(
    <Router>
      <Routes>
       <Route path="/product" element={<Product />} />
       <Route path="/" exact element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;