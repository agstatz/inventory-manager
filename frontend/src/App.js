import './App.css';

import { Home, NoMatch, Inventory } from "./pages/";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route exact path="/inventory" element={<Inventory />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
