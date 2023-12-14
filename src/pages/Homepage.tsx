
import { Link } from "react-router-dom";

import { CompiledCourse } from "../types";

import all_courses from "../compiled/courses.json";

export function Homepage() {
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

type CoursePreviewProps = {
   course: CompiledCourse;
}

function CoursePreview({ course }: CoursePreviewProps) {
   const { uuid, meta } = course;
   const { title } = meta;

   return (
      <div id="CoursePreview">
         <Link to={`/${uuid}`}>{title}</Link>
      </div>
   );
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

export function HomepageLinks() {
   return (
      <>
         <LinksSection title="Additional Resources" links={resources} />
         <LinksSection title="Socials" links={socials} />
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
   }[]
}

function LinksSection({ title, links }: LinksSectionProps) {
   return (
      <div id="LinksSection">
         <h2><span className="links-section-index">✦</span>{title}</h2>
         <div className="links-section">
            <ul>
               {links.map(({ text, url, icon, icomoon, text_icon }) =>
                  <li key={text}>
                     {icon && <img src={icon} alt="icon" className="icon" />}
                     {icomoon && <div className={`icon icon-${icomoon}`} />}
                     {text_icon && <div className="icon">{text_icon}</div>}
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
