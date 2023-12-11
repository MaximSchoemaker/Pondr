import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Homepage } from "./pages/Homepage";
import { Course } from "./pages/Course";
import { Lesson } from "./pages/Lesson";
import { isTouchDevice } from "./utils/isTouchDevice";

import './App.css';

function App() {
  const [windowHeight] = useState(window.innerHeight);
  const touchDevice = isTouchDevice();

  return (
    <BrowserRouter>
      <div id="App" tabIndex="0" style={{ "--window-height": windowHeight + "px" }} className={`${touchDevice ? "touchDevice" : "mouseDevice"}`}>
        {/* <div id="Header"><Link to="/" className="logo">PONDR</Link></div> */}
        <main>
          <Routes>
            {/* <Route path="" element={<Navigate to="/1_drawing/0" />} /> */}
            <Route path="" element={<Homepage />} />
            <Route path=":courseId" element={<Course />} />
            {/* <Route path="flower_garden" element={<FlowerGarden />} /> */}
            <Route path=":courseId/:lessonId/:slideId" element={<Lesson />} />
          </Routes>
        </main >
      </div >
    </BrowserRouter>
  )
}

export default App;
