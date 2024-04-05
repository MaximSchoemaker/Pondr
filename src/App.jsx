import { useState } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";

import { Homepage } from "./pages/Homepage";
import { Course } from "./pages/Course";
import { Lesson } from "./pages/Lesson";
import { isTouchDevice } from "./utils/isTouchDevice";
import { LanguageContext } from "./LanguageContext";

import './App.css';


function App() {
  return (
    <BrowserRouter
    //basename={process.env.PUBLIC_URL}
    >
      <Pondr />
    </BrowserRouter>
  )
}

function Pondr() {
  const [windowHeight] = useState(window.innerHeight);
  const touchDevice = isTouchDevice();

  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") ?? "en";
  console.log({ lang });

  return (
    <LanguageContext.Provider value={lang}>
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
    </LanguageContext.Provider>
  );
}

export default App;
