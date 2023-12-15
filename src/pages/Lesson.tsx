import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'

import { loadMd } from '../utils/loadMd';

import all_lessons from "../compiled/lessons.json";
import all_slides from "../compiled/slides.json";
import { CompiledSlide } from "../types";

export function Lesson() {
   const location = useLocation();
   const transitionDirection = location.state?.direction;

   const [portrait, set_portrait] = useState(matchMedia('(orientation: portrait)').matches);

   useEffect(() => {
      const mql = window.matchMedia('(orientation: portrait)');
      mql.onchange = (e) => set_portrait(e.matches);
      // return () => mql.onchange = null;
   }, [])

   let params = useParams();
   const { courseId, lessonId, slideId } = params;

   const lesson = all_lessons.find(lesson => lesson.uuid === lessonId);
   const courseLessons = all_lessons.filter(lesson2 => lesson?.parent_uuid === lesson2.parent_uuid);

   if (!lesson) return (
      <span>Lesson does not exist</span>
   );

   const slides = all_slides.filter(slide => slide.parent_uuid === lessonId);
   const slide = slides.find(slide => slide.uuid === slideId);

   if (!slide) return (
      <span>Slide does not exist</span>
   );

   const lessonIndex = courseLessons.indexOf(lesson);

   const prevLesson = courseLessons[lessonIndex - 1];
   const prevLessonLastSlide = prevLesson && [...all_slides].reverse().find(slide => slide.parent_uuid === prevLesson.uuid);

   const nextLesson = courseLessons[lessonIndex + 1];
   const nextLessonFirstSlide = nextLesson && all_slides.find(slide => slide.parent_uuid === nextLesson.uuid);

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

   const navigate = useNavigate();
   useEffect(() => {
      const keyDown = (evt: KeyboardEvent) => {
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

   const header = (in_document = true, no_margin_bottom = false, no_titles = false) => (
      no_titles
         ? "" //<div className="text-progress-no-titles">{(slideIndex + 1)} / {(slides.length)}</div>
         : <div className={`header ${in_document ? "in-document" : ""}`}>
            <h1 style={{ marginBottom: no_margin_bottom ? 0 : undefined }} >
               <div className="text-progress">{(slideIndex + 1)} / {(slides.length)}</div>
               {lesson.meta.title}
            </h1>
            <h3 className="subtitle">{slide.meta.title}</h3>
         </div>
   );

   const controls = (
      <div id="Controls">
         {prevUrl
            ? <Link to={prevUrl} state={{ direction: "backward" }} className="previous">{/*🠔*/}&#xe903;</Link>
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
         <div className="progress" style={{ '--progress': progress } as React.CSSProperties}></div>
         <TransitionGroup className={`transition-container ${transitionDirection} `}>
            <CSSTransition key={lessonId} classNames="transition" timeout={700}>
               <div className="transition">
                  <Slide
                     slide={slide}
                     header={header}
                     controls={controls}
                     portrait={portrait}
                  />
               </div>
            </CSSTransition>
         </TransitionGroup>
      </div>
   );
}

type HeaderRenderFn = (
   in_document?: boolean,
   no_margin_bottom?: boolean
) => React.ReactNode;

type SlideProps = {
   slide: CompiledSlide;
   header: HeaderRenderFn;
   controls: React.ReactNode;
   portrait: boolean;
   vw?: number;
}

function Slide({ slide, header, controls, portrait, vw }: SlideProps) {
   const ref = useRef<HTMLDivElement>(null);
   const scrollTop = () => ref.current?.scrollTo({ top: 0, behavior: "smooth" });

   const { uuid, public_dir, meta } = slide;

   useEffect(() => {
      localStorage.setItem(uuid, "true");
   }, [public_dir]);

   const { copy, code, lib, explicit_setup } = meta;

   const copyUrl = `${public_dir}\\${copy}`;
   const codeUrl = `${public_dir}\\${code}`;

   const header_no_margin_bottom = !!(!copy || portrait && code);
   const no_titles = !copy;

   return (
      <div id="Slide" ref={ref}>
         {(!copy || portrait) && header(false, header_no_margin_bottom, no_titles)}

         <div className="container">
            {portrait
               ? <>
                  {copy &&
                     <Copy copyUrl={copyUrl} header={header} controls={controls} portrait={portrait} onLoad={scrollTop} />
                  }
                  {code &&
                     <P5Widget slideUuid={slide.uuid} codeUrl={codeUrl} explicitSetup={explicit_setup} lib={lib} vw={vw} />
                  }
               </>
               : <>
                  {code &&
                     <P5Widget slideUuid={slide.uuid} codeUrl={codeUrl} explicitSetup={explicit_setup} lib={lib} vw={vw} />
                  }
                  {copy &&
                     <Copy copyUrl={copyUrl} header={header} controls={controls} portrait={portrait} onLoad={scrollTop} />
                  }
               </>
            }
         </div>

         {
            !copy &&
            <div className="footer">
               {controls}
            </div>
         }
      </div>
   );
}

type CopyProps = {
   copyUrl: string;
   header: HeaderRenderFn;
   controls: React.ReactNode;
   portrait: boolean;
   onLoad: () => void;
}

function Copy({ copyUrl, header, controls, portrait, onLoad }: CopyProps) {
   const [markdown, set_markdown] = useState<string[]>([]);
   const [markdownLoadedFirstTime, set_markdownLoadedFirstTime] = useState(false);

   useEffect(() => {
      if (copyUrl) {
         loadMd(copyUrl).then(md => {
            set_markdown(md);
            set_markdownLoadedFirstTime(true);
            onLoad();
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

type P5WidgetProps = {
   slideUuid: string;
   codeUrl: string;
   explicitSetup?: boolean;
   lib?: string;
   vw?: number;
}

function P5Widget({ slideUuid, codeUrl, explicitSetup, lib, vw = 50 }: P5WidgetProps) {
   const [loading, set_loading] = useState(true);
   const [first_load, set_first_load] = useState(true);
   const [visible_slide_uuid, set_visible_slide_uuid] = useState<string | null>(null);

   useEffect(() => {
      if (slideUuid) {
         if (slideUuid === visible_slide_uuid) return;
         set_loading(true);
         window.p5Widget.replaceAll(() => {
            set_visible_slide_uuid(slideUuid)
            set_first_load(visible_slide_uuid == null)
            set_loading(false);
         });
      } else
         set_visible_slide_uuid(null);
   }, [slideUuid]);

   const singlePanel = window.innerWidth < 600;
   const dataPreviewWidth = singlePanel
      ? "calc(100vw - 35px)"
      : `calc(${vw}vw - 25px)`;

   return <div className={`widget-container`}>
      {all_slides.map((slide, i) =>
         (slide.uuid === slideUuid || slide.uuid === visible_slide_uuid) &&
         <div
            key={slide.uuid}
            className={`
               widget 
               ${slide.uuid === visible_slide_uuid ? 'visible' : ''} 
               ${first_load ? 'first-load' : ''} 
               ${loading ? 'loading' : ''}
            `}
         >
            <script
               type="text/p5"
               src={codeUrl}
               data-autoplay={singlePanel ? null : true}
               data-preview-width={dataPreviewWidth}
               data-p5-version="1.6.0"
               data-id={codeUrl}
               data-lib={lib}
               data-explicit-setup={explicitSetup}
            ></script>
         </div>
      )}
   </div>
}
