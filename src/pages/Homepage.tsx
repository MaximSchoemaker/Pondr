import { useEffect, useState, useRef } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'

import { isTouchDevice } from "../utils/isTouchDevice";
import all_courses from "../meta/courses.json";

export function Homepage() {
   // console.log("HOMEPAGE");
   // console.log({ all_courses });

   return (
      <div id="Homepage">
         <h1 className="homepage-title">PONDR</h1>
         {all_courses.map(course =>
            <CoursePreview course={course} key={course.uuid} />
         )}
         <div className="links-container">
            <HomepageLinks />
         </div>
      </div>
   );
}

function CoursePreview({ course }) {
   const { uuid, meta } = course;
   const { title } = meta;

   return (
      <div id="Course">
         <a href={`/${uuid}`}>{title}</a>
      </div>
   );
}

const resources = [
   { text: "p5.js documentation", url: "https://p5js.org/reference/", icon: "/images/p5js.ico" },
   { text: "p5.js editor", url: "https://editor.p5js.org/", icon: "/images/p5js.ico" },
   { text: "Creative Coding with Maxim", url: "https://www.youtube.com/@creativecodingwithmaxim", icomoon: "youtube" },
   { text: "Creative Coding Codex", url: "https://www.cccodex.com/", textIcon: "➳" },
]
const socials = [
   { text: "portfolio", url: "https://maximschoemaker.com/", icon: "/images/logo.png" },
   { text: "maximschoemaker", url: "https://www.instagram.com/maximschoemaker/", icomoon: "instagram" },
   { text: "MaximGifmaker", url: "https://twitter.com/MaximGifmaker", icomoon: "twitter" },
   { text: "MaximSchoemaker", url: "https://graphics.social/@MaximSchoemaker", icomoon: "mastodon" },
]

export function HomepageLinks() {
   return (
      <>
         <LinksSection title="Additional Resources" links={resources} />
         <LinksSection title="Socials" links={socials} />
      </>
   );
}

function LinksSection({ title, links }) {
   return (
      <div id="LinksSection">
         <h2><span className="links-section-index">✦</span>{title}</h2>
         <div className="links-section">
            {/* <span className="md-index">✦</span> */}
            <ul>
               {links.map(({ text, url, icon, icomoon, textIcon }) =>
                  <li key={text}>
                     {icon && <img src={icon} alt="icon" className="icon" />}
                     {icomoon && <div className={`icon icon-${icomoon}`} />}
                     {textIcon && <div className="icon">{textIcon}</div>}
                     <a href={url} target="_blank" rel="noreferrer">{text}</a>
                  </li>
               )}
            </ul>
         </div>
      </div>
   );
}

// const workshop = [
//    {
//       title: "Flower Garden", slides: [
//          { title: "", url: "/flower_garden", md: "/flower_garden/docs.md", js: "/flower_garden/sketch.js" },
//          { title: "", url: "/flower_garden", md: "/flower_garden/docs.md", js: "/flower_garden/sketch.js" },
//       ]
//    },
// ]

// function FlowerGarden() {

//    const [portrait, set_portrait] = useState(matchMedia('(orientation: portrait)').matches);

//    useEffect(() => {
//       const mql = window.matchMedia('(orientation: portrait)');
//       mql.onchange = (e) => set_portrait(e.matches);
//       return () => mql.onchange = null;
//    }, [])

//    return (
//       <div id="Workshop">
//          <div className="transition">
//             <Lesson lessons={workshop} lessonIndex={0} slideIndex={0} portrait={portrait} lib="/libs/flower_garden.js" vw={60} />
//          </div>
//       </div>
//    )
// }
