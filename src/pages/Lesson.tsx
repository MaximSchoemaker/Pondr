import { useEffect, useState, useRef } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'

import { loadMd } from '../utils/loadMd';

import all_lessons from "../meta/lessons.json";
import all_slides from "../meta/slides.json";

export function Lesson() {
   // console.log("LESSON");
   // console.log({ all_lessons, all_slides });

   const location = useLocation();
   const transitionDirection = location.state?.direction;

   const [portrait, set_portrait] = useState(matchMedia('(orientation: portrait)').matches);

   useEffect(() => {
      const mql = window.matchMedia('(orientation: portrait)');
      mql.onchange = (e) => set_portrait(e.matches);
      return () => mql.onchange = null;
   }, [])


   let params = useParams();
   const { courseId, lessonId, slideId } = params;

   // const lessons = all_lessons.filter(lesson => lesson.uuid === lessonId);
   const lesson = all_lessons.find(lesson => lesson.uuid === lessonId);

   if (!lesson) return (
      <span>Lesson does not exist</span>
   );

   const slides = all_slides.filter(slide => slide.parent_uuid === lessonId);
   const slide = slides.find(slide => slide.uuid === slideId);

   if (!slide) return (
      <span>Slide does not exist</span>
   );

   const lessonIndex = all_lessons.indexOf(lesson);

   const prevLesson = all_lessons[lessonIndex - 1];
   const prevLessonLastSlide = prevLesson && [...all_slides].reverse().find(slide => slide.parent_uuid === prevLesson.uuid);
   console.log({ prevLesson, prevLessonLastSlide });

   const nextLesson = all_lessons[lessonIndex + 1];
   const nextLessonFirstSlide = nextLesson && all_slides.find(slide => slide.parent_uuid === nextLesson.uuid);
   console.log({ nextLesson, nextLessonFirstSlide });

   const slideIndex = slides.indexOf(slide);
   const prevSlide = slides[slideIndex - 1];
   const nextSlide = slides[slideIndex + 1];

   const progress = slideIndex / (slides.length - 1);

   const prevUrl = prevSlide
      ? `/${courseId}/${lessonId}/${prevSlide.uuid}`
      : prevLesson && prevLessonLastSlide && `/${courseId}/${prevLesson.uuid}/${prevLessonLastSlide.uuid}`;

   const nextUrl = nextSlide
      ? `/${courseId}/${lessonId}/${nextSlide.uuid}`
      : nextLesson && nextLessonFirstSlide && `/${courseId}/${nextLesson.uuid}/${nextLessonFirstSlide.uuid}`;
   const homeUrl = `/${courseId}/`;

   console.log({ prevUrl, nextUrl });

   const navigate = useNavigate();
   useEffect(() => {
      const keyDown = (evt) => {
         switch (evt.code) {
            case "ArrowLeft":
               prevUrl && navigate(prevUrl, { state: { direction: "backward" } });
               break;
            case "ArrowRight":
               nextUrl && navigate(nextUrl, { state: { direction: "forward" } });
               break;
            default:
         }
      }
      window.addEventListener("keydown", keyDown);
      return () => window.removeEventListener("keydown", keyDown);
   }, [prevUrl, nextUrl]);

   const header = (in_document, no_margin_bottom = false) => (
      <div className={`header ${in_document ? "in-document" : ""}`}>
         <h1 style={{ marginBottom: no_margin_bottom ? 0 : undefined }}
         >
            <div className="text-progress">{(slideIndex + 1)} / {(slides.length)}</div>
            {lesson.meta.title}
         </h1>
         <h3 className="subtitle">{slide.meta.title}</h3>
      </div>
   );

   const controls = (
      <div id="Controls">
         {prevUrl
            ? <Link disabled={prevUrl} to={prevUrl} state={{ direction: "backward" }} className="previous">{/*🠔*/}&#xe903;</Link>
            : <span className="previous" />
         }
         <Link className="home" to={homeUrl}><span className="label">home</span>O</Link>
         {
            nextUrl
               ? <Link to={nextUrl} state={{ direction: "forward" }} className="next" >{/*🠖*/}&#xe902;</Link >
               : <span className="next" />
         }
      </div >
   );

   return (
      <div id="Lesson">
         <div className="progress" style={{ '--progress': progress }}></div>
         <TransitionGroup className={`transition-container ${transitionDirection} `}>
            <CSSTransition key={lessonId} classNames="transition" timeout={700}>
               <div className="transition">
                  <Slide
                     slide={slide}
                     header={header}
                     controls={controls}
                     portrait={portrait}
                     makeExplicit={true}
                  />
               </div>
            </CSSTransition>
         </TransitionGroup>
      </div>
   );
}

function Slide({ slide, header, controls, portrait, makeExplicit, lib, vw }) {
   const ref = useRef();
   const scrollTop = () => ref.current?.scrollTo({ top: 0, behavior: "smooth" });

   const { meta } = slide;
   const { public_dir, content } = meta;

   useEffect(() => {
      localStorage.setItem(public_dir, "true");
   }, [public_dir]);

   const { md, js } = content;

   const copyUrl = `${public_dir}\\${md}`;
   const codeUrl = `${public_dir}\\${js}`;

   // console.log({ copyUrl, codeUrl });

   const header_no_margin_bottom = !md || portrait && js;

   return (
      <div id="Slide" ref={ref}>
         {(!md || portrait) && header(false, header_no_margin_bottom)}

         <div className="container">
            {portrait
               ? <>
                  {md &&
                     <Text copyUrl={copyUrl} header={header} controls={controls} portrait={portrait} onLoadMarkdown={scrollTop} />
                  }
                  {js &&
                     <P5Widget slideUuid={slide.uuid} codeUrl={codeUrl} makeExplicit={makeExplicit} lib={lib} vw={vw} />
                  }
               </>
               : <>
                  {js &&
                     <P5Widget slideUuid={slide.uuid} codeUrl={codeUrl} makeExplicit={makeExplicit} lib={lib} vw={vw} />
                  }
                  {md &&
                     <Text copyUrl={copyUrl} header={header} controls={controls} portrait={portrait} onLoadMarkdown={scrollTop} />
                  }
               </>
            }
         </div>

         {
            !md &&
            <div className="footer">
               {controls}
            </div>
         }
      </div>
   );
}

function Text({ copyUrl, header, controls, portrait, onLoadMarkdown }) {
   const [markdown, set_markdown] = useState<string[]>([]);
   const [markdownLoadedFirstTime, set_markdownLoadedFirstTime] = useState(false);

   useEffect(() => {
      if (copyUrl) {
         loadMd(copyUrl).then(md => {
            set_markdown(md);
            set_markdownLoadedFirstTime(true);
            onLoadMarkdown();
         });
      }
   }, [copyUrl]);

   return (
      <div className="text" >
         {!portrait && header(true)}
         <div className="text-body">
            {markdown.map((md, i) =>
               <section key={md} style={{ animationDelay: `${(i + 0.75) * 0.1} s` }}>
                  <span className="md-index">✦</span>
                  <ReactMarkdown
                     // linkTarget="_blank"
                     rehypePlugins={[rehypeRaw]}
                     skipHtml={false}
                  >{md}</ReactMarkdown>
               </section>
            )}
         </div>
         {markdownLoadedFirstTime && controls}
      </div>
   );
}

function P5Widget({ slideUuid, codeUrl, makeExplicit, lib, vw = 50 }) {
   const [loading, set_loading] = useState(true);
   const [first_load, set_first_load] = useState(true);
   const [visible_slide_uuid, set_visible_slide_uuid] = useState(null);

   useEffect(() => {
      set_loading(true);
      if (slideUuid)
         window.p5Widget.replaceAll(() => {
            set_visible_slide_uuid(slideUuid)
            set_first_load(visible_slide_uuid == null)
            set_loading(false);
         });
      else
         set_visible_slide_uuid(null);
   }, [slideUuid]);

   const singlePanel = window.innerWidth < 600;
   const dataPreviewWidth = singlePanel
      ? "calc(100vw - 35px)"
      : `calc(${vw}vw - 25px)`;

   return <div className={`widget-container`}>
      {all_slides.map((slide, i) =>
         (slide.uuid === slideUuid || slide.uuid === visible_slide_uuid) &&
         <div className={`widget ${slide.uuid === visible_slide_uuid ? 'visible' : ''} ${first_load ? 'first-load' : ''} ${loading ? 'loading' : ''}`} >
            <script
               type="text/p5"
               src={codeUrl}
               data-autoplay={singlePanel ? null : true}
               data-preview-width={dataPreviewWidth}
               data-p5-version="1.6.0"
               data-id={codeUrl}
               data-lib={lib}
               data-make-implicit={makeExplicit}
            ></script>
         </div>
      )}
   </div>
}
