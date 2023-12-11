import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { isTouchDevice } from "../utils/isTouchDevice";
import { HomepageLinks } from "./Homepage";

import all_courses from "../meta/courses.json";
import all_lessons from "../meta/lessons.json";
import all_slides from "../meta/slides.json";

export function Course() {
   // console.log("COURSE");
   // console.log({ all_courses, all_lessons, all_slides });

   let params = useParams();
   const { courseId } = params;
   const courseLessons = all_lessons.filter(lesson => lesson.parent_uuid === courseId);

   const [openLesson, set_openLesson] = useState(null);
   const onHoverLesson = (i) => set_openLesson(i);
   const touchDevice = isTouchDevice();
   const lessonContainerHeight = touchDevice ? "auto" : (all_lessons.length - 1) * 125 + 198;

   return (
      <div id="Homepage">
         <h1 className="homepage-title">PONDR</h1>
         <div className="lessons-container" style={{ height: lessonContainerHeight }}>
            {courseLessons.map((lesson, i) =>
               <LessonPreview key={lesson.uuid} lesson={lesson} index={i} open={openLesson == i} onHoverLesson={onHoverLesson} />
            )}
         </div>
         <div className="links-container">
            <HomepageLinks />
         </div>
      </div>
   );
}

function LessonPreview({ lesson, index, open, onHoverLesson }) {
   const lessonSlides = all_slides.filter(slide => slide.parent_uuid === lesson.uuid);

   const { meta } = lesson;
   const { title, image } = meta;

   const scrollRef = useRef();

   const scrollPositionStart = Math.max(0, lessonSlides.findIndex(({ url }) => localStorage.getItem(url) !== "true")) * 165;
   const [scrollPosition, set_scrollPosition] = useState(0);

   const [hovered, set_hovered] = useState(false);

   useEffect(() => {
      if (!isTouchDevice() && !hovered) {
         const timeout = setTimeout(() => set_scrollPosition(scrollPositionStart), index * 250 + 750);
         return () => clearTimeout(timeout);
      }
   }, [hovered]);

   useEffect(() => {
      const { current: scroll } = scrollRef;
      if (scroll && isTouchDevice()) {
         const { parentNode: scrollParent } = scroll;
         setTimeout(() => {
            scrollParent.scrollTo({ left: scrollPositionStart, behavior: "smooth" });
         }, 1000 + index * 300);
      }
   }, [scrollRef.current]);

   const count = lessonSlides.length;
   const done = lessonSlides.reduce((tot, { url }) => localStorage.getItem(url) === "true" ? tot + 1 : tot, 0);

   const [progress, set_progress] = useState(0);
   useEffect(() => {
      setTimeout(() => set_progress(done / count));
   }, []);

   const onHover = (evt, i) => {
      const { current: scroll } = scrollRef;
      if (scroll && !isTouchDevice()) {
         const { parentNode: scrollParent } = scroll;

         const scrollSpace = Math.max(0, scroll.offsetWidth + 22 - scrollParent.offsetWidth);
         const boundingRect = evt.target.getBoundingClientRect();
         const scrollParentBoundingRect = scrollParent.getBoundingClientRect();

         const left = boundingRect.left - scrollParentBoundingRect.left - 50;
         const right = boundingRect.right - scrollParentBoundingRect.right + 50;
         if (left < 0)
            set_scrollPosition((scrollPosition) => Math.max(0, scrollPosition + left));
         if (right > 0)
            set_scrollPosition((scrollPosition) => Math.min(scrollSpace, scrollPosition + right));
      }
   }

   return (
      <div id="LessonPreview" className={`${open ? 'open' : ''}`} style={{ animationDelay: (index * 0.2) + "s" }}
         onMouseEnter={() => (set_hovered(true), onHoverLesson(index))}
      >
         <h2 className="lesson-header">
            <span >{title}</span>
            {done < count
               ? <span>{done}/{count}</span>
               : "✦"}
         </h2>
         {!!done && <div className="lesson-progress" style={{ width: progress * 100 + "%", transitionDelay: (index * 300 + 500) + 'ms' }}></div>}
         <div className={`slides-container ${done > 0 ? "progress-started" : ""} ${done === count ? "progress-done" : ""}`}>
            <div className="slides-scroll" ref={scrollRef} style={{ left: -scrollPosition }}>
               {lessonSlides.map((slide, i) =>
                  <SlidePreview key={slide.uuid} slide={slide} lessonIndex={index} index={i} onHover={(evt) => onHover(evt, i)} />
               )}
            </div>
         </div>
      </div>
   );
}

function SlidePreview({ slide, lessonIndex, index, onHover }) {
   const { uuid, parent_uuid, meta } = slide;
   const { title, content, public_dir } = meta;
   const { image } = content;

   const url = `${parent_uuid}/${uuid}`;

   const imageSrc = `${public_dir}\\${image}`;

   const [loaded, set_loaded] = useState(!image);
   const delay = lessonIndex * 0.075 + index * 0.075;
   const visited = localStorage.getItem(url) === "true";

   return (
      <div className={`SlidePreview-container ${loaded ? "loaded" : ""}`} style={{ transitionDelay: delay + "s" }} >
         <Link to={url} id="SlidePreview" className={`${visited ? "visited" : ""}`} onMouseEnter={onHover}>
            <img className="slide-screenshot" src={imageSrc} onLoad={() => set_loaded(true)} />
            <h3 className="slide-title">{index + 1}. {title}</h3>
         </Link>
      </div>
   );
}