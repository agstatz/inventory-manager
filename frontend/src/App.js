import './App.css';

import { Home, NoMatch } from "./pages/";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
