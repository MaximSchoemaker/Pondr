import { useEffect, useState, useRef } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'

import { lessons } from "./meta/data";

import './App.css';

async function loadMd(mdPath) {
  const res = await (await fetch(mdPath)).text();
  return res.split("---");
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

function App() {
  const [windowHeight] = useState(window.innerHeight);
  const touchDevice = isTouchDevice();

  return (
    <HashRouter>
      <div id="App" tabIndex="0" style={{ "--window-height": windowHeight + "px" }} className={`${touchDevice ? "touchDevice" : "mouseDevice"}`}>
        {/* <div id="Header"><Link to="/" className="logo">PONDR</Link></div> */}
        <main>
          <Routes>
            {/* <Route path="" element={<Navigate to="/1_drawing/0" />} /> */}
            <Route path="" element={<Homepage />} />
            <Route path="flower_garden" element={<FlowerGarden />} />
            <Route path=":lessonKey/:slideIndex" element={<Lessons />} />
          </Routes>
        </main >
      </div >
    </HashRouter>
  )
}

function Homepage() {

  const [openLesson, set_openLesson] = useState(null);
  const onHoverLesson = (i) => set_openLesson(i);
  const touchDevice = isTouchDevice();
  const lessonContainerHeight = touchDevice ? "auto" : (lessons.length - 1) * 125 + 198;

  return (
    <div id="Homepage">
      <h1 className="homepage-title">PONDR</h1>
      <div className="lessons-container" style={{ height: lessonContainerHeight }}>
        {lessons.map((lesson, i) =>
          <LessonPreview key={lesson.key} lesson={lesson} index={i} open={openLesson == i} onHoverLesson={onHoverLesson} />
        )}
      </div>
      <div className="links-container">
        <HomepageLinks />
      </div>
    </div>
  );
}

function LessonPreview({ lesson, index, open, onHoverLesson }) {
  const { title, slides } = lesson;
  const scrollRef = useRef();

  const scrollPositionStart = Math.max(0, slides.findIndex(({ url }) => localStorage.getItem(url) !== "true")) * 165;
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

  const count = slides.length;
  const done = slides.reduce((tot, { url }) => localStorage.getItem(url) === "true" ? tot + 1 : tot, 0);

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
          {slides.map((slide, i) =>
            <SlidePreview key={i} slide={slide} lessonIndex={index} index={i} onHover={(evt) => onHover(evt, i)} />
          )}
        </div>
      </div>
    </div>
  );
}

function SlidePreview({ slide, lessonIndex, index, onHover }) {
  const { png, title, url } = slide;
  const [loaded, set_loaded] = useState(!png);
  const delay = lessonIndex * 0.075 + index * 0.075;
  const visited = localStorage.getItem(url) === "true";

  return (
    <div className={`SlidePreview-container ${loaded ? "loaded" : ""}`} style={{ transitionDelay: delay + "s" }} >
      <Link to={url} id="SlidePreview" className={`${visited ? "visited" : ""}`} onMouseEnter={onHover}>
        <img className="slide-screenshot" src={png} onLoad={() => set_loaded(true)} />
        <h3 className="slide-title">{index + 1}. {title}</h3>
      </Link>
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

function HomepageLinks() {
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

const workshop = [
  {
    title: "Flower Garden", slides: [
      { title: "", url: "/flower_garden", md: "/flower_garden/docs.md", js: "/flower_garden/sketch.js" },
    ]
  },
]

function FlowerGarden() {

  const [portrait, set_portrait] = useState(matchMedia('(orientation: portrait)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    mql.onchange = (e) => set_portrait(e.matches);
    return () => mql.onchange = null;
  }, [])

  return (
    <div id="Workshop">
      <div className="transition">
        <Lesson lessons={workshop} lessonIndex={0} slideIndex={0} portrait={portrait} lib="/libs/flower_garden.js" vw={60} />
      </div>
    </div>
  )
}

function Lessons() {
  const location = useLocation();

  const transitionDirection = location.state?.direction;

  const { lessonKey, slideIndex: slideIndexString } = useParams();
  const lessonIndex = lessons.findIndex(l => l.key === lessonKey);
  const slideIndex = parseInt(slideIndexString);

  const [portrait, set_portrait] = useState(matchMedia('(orientation: portrait)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    mql.onchange = (e) => set_portrait(e.matches);
    return () => mql.onchange = null;
  }, [])

  return (
    <div id="Lessons">
      {/* <Link to={"/"} className="homepage"><div className="clip">
        <span className="back">back</span>
        <span className="logo">O</span></div>
      </Link> */}
      <TransitionGroup className={`transition-container ${transitionDirection}`}>
        <CSSTransition key={lessonKey} classNames="transition" timeout={700}>
          <div className="transition">
            <Lesson lessons={lessons} lessonIndex={lessonIndex} slideIndex={slideIndex} portrait={portrait} makeExplicit={true} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function Lesson({ lessons, lessonIndex, slideIndex, portrait, makeExplicit, lib, vw }) {
  const ref = useRef();
  const scrollTop = () => ref.current?.scrollTo({ top: 0, behavior: "smooth" });

  const lesson = lessons[lessonIndex];
  const { title, slides } = lesson;

  const content = slides[slideIndex];
  const { title: subtitle } = content;

  const progress = slideIndex / (slides.length - 1);

  useEffect(() => {
    const { url } = content;
    localStorage.setItem(url, "true");
  }, [slideIndex]);

  return (
    <div id="Lesson" ref={ref}>
      <div className="progress" style={{ '--progress': progress }}></div>
      {
        (!content.md || portrait) &&
        <div className="header">
          <h1 style={{ marginBottom: (!content.md || portrait && content.js) && 0 }}>
            <div className="text-progress">{(slideIndex + 1)} / {(slides.length)}</div>
            {title}
          </h1>
          <h3 className="subtitle">{subtitle}</h3>
        </div>
      }

      <div className="container">
        {portrait
          ? <>
            {content.md &&
              <Text lessons={lessons} lessonIndex={lessonIndex} slideIndex={slideIndex} portrait={portrait} onLoadMarkdown={scrollTop} />
            }
            {content.js &&
              <P5Widget slides={slides} slideIndex={slideIndex} portrait={portrait} makeExplicit={makeExplicit} lib={lib} vw={vw} />
            }
          </>
          : <>
            {content.js &&
              <P5Widget slides={slides} slideIndex={slideIndex} portrait={portrait} makeExplicit={makeExplicit} lib={lib} vw={vw} />
            }
            {content.md &&
              <Text lessons={lessons} lessonIndex={lessonIndex} slideIndex={slideIndex} portrait={portrait} onLoadMarkdown={scrollTop} />
            }
          </>
        }
      </div>

      {
        !content.md &&
        <div className="footer">
          <Controls lessons={lessons} lessonIndex={lessonIndex} slideIndex={slideIndex} />
        </div>
      }
    </div>
  );
}

function Text({ lessons, lessonIndex, slideIndex, portrait, onLoadMarkdown }) {
  const lesson = lessons[lessonIndex];
  const { title, slides } = lesson;

  const [markdown, set_markdown] = useState([]);
  const [markdownLoadedFirstTime, set_markdownLoadedFirstTime] = useState(false);
  const content = slides[slideIndex];

  const { title: subtitle } = content;

  useEffect(() => {
    if (content.md) {
      loadMd(content.md).then((md) => {
        set_markdown(md);
        set_markdownLoadedFirstTime(true);
        onLoadMarkdown();
      });
    }
  }, [content]);

  return (
    <div className="text" >
      {!portrait &&
        <div className="header in-document">
          <h1>
            <div className="text-progress">{(slideIndex + 1)} / {(slides.length)}</div>
            {title}
          </h1>
          <h3 className="subtitle">{subtitle}</h3>
        </div>
      }
      <div className="text-body">
        {markdown.map((md, i) =>
          <section key={md} style={{ animationDelay: `${(i + 0.75) * 0.1}s` }}>
            <span className="md-index">✦</span>
            <ReactMarkdown
              // linkTarget="_blank"
              rehypePlugins={[rehypeRaw]}
              skipHtml={false}
            >{md}</ReactMarkdown>
          </section>
        )}
      </div>
      {markdownLoadedFirstTime && <Controls lessons={lessons} lessonIndex={lessonIndex} slideIndex={slideIndex} />}
    </div>
  );
}

function P5Widget({ slides, slideIndex, portrait, makeExplicit, lib, vw = 50 }) {
  const [first_load, set_first_load] = useState(true);
  const [visible_index, set_visible_index] = useState(-1);
  const content = slides[slideIndex];

  useEffect(() => {
    if (content.js)
      window.p5Widget.replaceAll(() => set_visible_index(slideIndex), set_first_load(visible_index == -1));
    else
      set_visible_index(-1);
  }, [content]);

  const singlePanel = window.innerWidth < 600;
  const dataPreviewWidth = singlePanel
    ? "calc(100vw - 35px)"
    : `calc(${vw}vw - 25px)`;

  return <div className="widget-container">
    {slides.map((content, i) =>
      (i === slideIndex || i === visible_index) &&
      <div className={`widget ${i === visible_index ? 'visible' : ''} ${first_load ? 'first-load' : ''}`} key={i} >
        <script
          type="text/p5"
          src={content.js}
          data-autoplay={singlePanel ? null : true}
          data-preview-width={dataPreviewWidth}
          data-p5-version="1.6.0"
          data-id={content.js}
          data-lib={lib}
          data-make-implicit={makeExplicit}
        ></script>
      </div>
    )}
  </div>
}

function Controls({ lessons, lessonIndex, slideIndex }) {
  const lesson = lessons[lessonIndex];
  const { slides, key } = lesson;
  const { length } = slides;

  const prevLesson = lessons[lessonIndex - 1];
  const nextLesson = lessons[lessonIndex + 1];

  const prevUrl = slideIndex > 0
    ? `/${key}/${slideIndex - 1}`
    : prevLesson && `/${prevLesson.key}/${prevLesson.slides.length - 1}`

  const nextUrl = slideIndex < slides.length - 1
    ? `/${key}/${slideIndex + 1}`
    : nextLesson && `/${nextLesson.key}/0`

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

  return (
    <div id="Controls">
      {prevUrl
        ? <Link disabled={prevUrl} to={prevUrl} state={{ direction: "backward" }} className="previous">{/*🠔*/}&#xe903;</Link>
        : <span className="previous" />
      }
      <Link className="home" to={"/"}><span className="label">home</span>O</Link>
      {
        nextUrl
          ? <Link to={nextUrl} state={{ direction: "forward" }} className="next" >{/*🠖*/}&#xe902;</Link >
          : <span className="next" />
      }
    </div >
  );
}

export default App;
