import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageUplaod from "./components/ImageUplaod";
import Gallery from "./components/Gallery";
import '../src/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageUplaod />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
