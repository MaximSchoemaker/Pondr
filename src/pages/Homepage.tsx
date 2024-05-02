
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

import { CompiledCourse, CompiledPreview } from "../types";

import all_courses from "../compiled/courses.json";

export function Homepage() {

   const language = useContext(LanguageContext);
   const all_courses_language = all_courses.filter(c => c.language === language);

   return (
      <div id="Homepage">
         <div className="homepage-header">
            <h1 className="homepage-title">PONDR</h1>
            <LanguageSelect />
         </div>
         <div className="course-previews-container">
            {all_courses_language.map((course, index) =>
               <CoursePreview course={course} index={index} key={course.uuid} />
            )}
         </div>
         <div className="links-container">
            <HomepageLinks />
         </div>
      </div>
   );
}

const languages = [
   "en", "nl"
]

function LanguageSelect() {

   const language = useContext(LanguageContext);

   return (
      <div id="LanguageSelect">
         {languages.map((l, i) =>
            <span key={l}>
               <a
                  className={`text-button ${l === language ? "selected" : ""}`}
                  href={`?lang=${l}`}
               >
                  {l}
               </a>
               {i !== language.length - 1 && " / "}
            </span>
         )
         }
      </div >
   )
}

type CoursePreviewProps = {
   course: CompiledCourse;
   index: number;
}

function CoursePreview({ course, index }: CoursePreviewProps) {
   const { uuid, public_dir, meta } = course;
   const { title, preview } = meta;

   const url = `/${uuid}`;
   const delay = (index + 0.5) * 0.1;

   return (
      <Link to={url} id="CoursePreview" style={{ animationDelay: delay + "s" }}>
         <Preview public_dir={public_dir} preview={preview} />
         <h3 className="course-title">{title}</h3>
      </Link>
   );
}


type PreviewProps = {
   public_dir: string;
   preview: CompiledPreview
}

function Preview({ public_dir, preview }: PreviewProps) {
   const { type, file } = preview;
   const src = `${public_dir}\\${file}`

   if (type === "image") return <img className="preview-media" src={src} />
   if (type === "video") return <video className="preview-media" autoPlay={true} muted={true} loop={true} src={src} />
}

const resources = [
   { text: "p5.js documentation", url: "https://p5js.org/reference/", icon: "/images/p5js.ico" },
   { text: "p5.js editor", url: "https://editor.p5js.org/", icon: "/images/p5js.ico" },
   { text: "Creative Coding with Maxim", url: "https://www.youtube.com/@creativecodingwithmaxim", icomoon: "youtube" },
   { text: "Creative Coding Codex", url: "https://www.cccodex.com/", text_icon: "➳" },
]
const socials = [
   { text: "portfolio", url: "https://maximschoemaker.com/", icon: "/images/logo.png" },
   { text: "maximschoemaker", url: "https://www.instagram.com/maximschoemaker/", icomoon: "instagram" },
   { text: "MaximGifmaker", url: "https://twitter.com/MaximGifmaker", icomoon: "twitter" },
   { text: "MaximSchoemaker", url: "https://graphics.social/@MaximSchoemaker", icomoon: "mastodon" },
]
const support = [
   { text: "Creative Coding Utrecht", url: "https://creativecodingutrecht.nl/", svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="50" class="page_logo__286Aa react-draggable" viewBox="0 0 110 40" transform="translate(0,0)"><path fill="#fff" d="M0 9.963c0-4.981 0-7.472 1.245-8.718C2.491 0 4.982 0 9.963 0H30v7.503H9.963c-2.749 0-3.844 0-4.28.536-.289.355-.289.944-.289 1.924v20.074c0 .98 0 1.57.29 1.924.435.536 1.53.536 4.28.536H30V40H9.963c-4.981 0-7.472 0-8.718-1.245C0 37.509 0 35.018 0 30.037V9.963Zm40 2.8C40 4.077 44.078 0 62.762 0H70v19.358h-7.238c-11.574 0-11.574 0-11.574-6.596v14.476c0-6.596 0-6.596 11.574-6.596H70V40h-7.238C44.078 40 40 35.922 40 27.238V12.762ZM80 37.22A2.757 2.757 0 0 0 82.78 40h24.44a2.757 2.757 0 0 0 2.78-2.78V0h-4.782v37.22c0 .529 1.287.813 1.864.94.272.06.387.085.138.085H82.78c-.249 0-.134-.025.138-.085.577-.127 1.864-.411 1.864-.94V0H80v37.22Z"></path></svg> }
]

export function HomepageLinks() {
   return (
      <>
         <LinksSection title="Additional Resources" links={resources} />
         <LinksSection title="Socials" links={socials} />
         <LinksSection title="Supported by" links={support} />
      </>
   );
}

type LinksSectionProps = {
   title: string;
   links: {
      text: string;
      url: string;
      icon?: string;
      icomoon?: string;
      text_icon?: string;
      svg?: JSX.Element;
   }[]
}

function LinksSection({ title, links }: LinksSectionProps) {
   return (
      <div id="LinksSection">
         <h2><span className="links-section-index">✦</span>{title}</h2>
         <div className="links-section">
            <ul>
               {links.map(({ text, url, icon, icomoon, text_icon, svg }) =>
                  <li key={text}>
                     {icon && <img src={icon} alt="icon" className="icon" />}
                     {icomoon && <div className={`icon icon-${icomoon}`} />}
                     {text_icon && <div className="icon">{text_icon}</div>}
                     {svg && <div className="icon svg-icon">{svg}</div>}
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
