import { useEffect, useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { isTouchDevice } from "../utils/isTouchDevice";
import { HomepageLinks } from "./Homepage";
import { LanguageContext } from "../LanguageContext";

import { CompiledLesson, CompiledSlide } from "../types";

import all_courses from "../compiled/courses.json";
import all_lessons from "../compiled/lessons.json";
import all_slides from "../compiled/slides.json";

export function Course() {
   let params = useParams();
   const { courseId } = params;

   const language = useContext(LanguageContext);
   const course = all_courses.find(course => course.uuid == courseId);

   if (!course) return <span>Course {courseId} does not exist...</span>

   const courseLessons = all_lessons.filter(lesson => lesson.parent_uuid === courseId);

   const [openLesson, set_openLesson] = useState<number | null>(null);
   const onHoverLesson = (i: number) => set_openLesson(i);
   const touchDevice = isTouchDevice();
   const lessonContainerHeight = touchDevice ? "auto" : (courseLessons.length - 1) * 125 + 198;

   const { meta } = course;
   const { title } = meta;

   return (
      <div id="Course">
         <span className="course-header">
            <h1 className="course-title">{title}</h1>
            <Link className="course-back-button" to="/">&#xe903;</Link>
         </span>
         <div className="lessons-container" style={{ height: lessonContainerHeight }}>
            {courseLessons.map((lesson, i) =>
               <LessonPreview key={lesson.uuid} lesson={lesson} index={i} open={openLesson === i} onHoverLesson={onHoverLesson} />
            )}
         </div>
         <div className="links-container">
            <HomepageLinks />
         </div>
      </div>
   );
}

type LessonPreviewProps = {
   lesson: CompiledLesson,
   index: number,
   open: boolean,
   onHoverLesson: (index: number) => void,
}

function LessonPreview({ lesson, index, open, onHoverLesson }: LessonPreviewProps) {
   const language = useContext(LanguageContext);
   const lessonSlides = all_slides.filter(slide => slide.parent_uuid === lesson.uuid);

   const { meta } = lesson;
   const { title } = meta;

   const scrollRef = useRef<HTMLDivElement>(null);

   const scrollPositionStart = Math.max(0, lessonSlides.findIndex(({ uuid }) => localStorage.getItem(uuid) !== "true")) * 165;
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
         const scrollParent = scroll.parentNode as HTMLDivElement;
         setTimeout(() => {
            scrollParent.scrollTo({ left: scrollPositionStart, behavior: "smooth" });
         }, 1000 + index * 300);
      }
   }, [scrollRef.current]);

   const count = lessonSlides.length;
   const done = lessonSlides.reduce((tot, { uuid }) => localStorage.getItem(uuid) === "true" ? tot + 1 : tot, 0);

   const [progress, set_progress] = useState(0);
   useEffect(() => {
      setTimeout(() => set_progress(done / count));
   }, []);

   const onHover = (evt: React.MouseEvent<HTMLAnchorElement>) => {
      const { current: scroll } = scrollRef;
      if (scroll && !isTouchDevice()) {
         const scrollParent = scroll.parentNode as HTMLDivElement;

         const scrollSpace = Math.max(0, scroll.offsetWidth + 22 - scrollParent.offsetWidth);
         const boundingRect = evt.currentTarget.getBoundingClientRect();
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
      <div id="LessonPreview" className={`${open ? 'open' : ''}`} style={{ animationDelay: ((index + 0.5) * 0.2) + "s" }}
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
                  <SlidePreview key={slide.uuid} slide={slide} lessonIndex={index} index={i} onHover={onHover} />
               )}
            </div>
         </div>
      </div>
   );
}

type SlidePreviewProps = {
   slide: CompiledSlide;
   lessonIndex: number;
   index: number;
   onHover: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

function SlidePreview({ slide, lessonIndex, index, onHover }: SlidePreviewProps) {
   const { uuid, parent_uuid, public_dir, meta } = slide;
   const { title, image } = meta;

   const url = `${parent_uuid}/${uuid}`;

   const imageSrc = `${public_dir}\\${image}`;

   const [loaded, set_loaded] = useState(!image);
   const delay = lessonIndex * 0.075 + index * 0.075;
   const visited = localStorage.getItem(uuid) === "true";

   return (
      <div className={`SlidePreview-container ${loaded ? "loaded" : ""}`} style={{ transitionDelay: delay + "s" }} >
         <Link to={url} id="SlidePreview" className={`${visited ? "visited" : ""}`} onMouseEnter={onHover}>
            <img className="slide-screenshot" src={imageSrc} onLoad={() => set_loaded(true)} />
            <h3 className="slide-title">{index + 1}. {title}</h3>
         </Link>
      </div>
   );
}