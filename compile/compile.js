import fs from "fs";
import PATH from "path";
import yaml from "js-yaml";

const LOG_VERBOSE = false;
const META_FILENAME = "meta.yaml";

const COURSES_DIR = "public/courses";
const DEFAULT_COURSE_META = {
  title: "Course Title",
  image: "",
  public_dir: "",
}
const DEFAULT_LESSON_META = {
  title: "Lesson Title",
  public_dir: "",
}
const DEFAULT_SLIDE_META = {
  title: "Slide Title",
  image: "",
  public_dir: "",
}

function parseMeta(metaPath, default_meta) {
  if (!fs.existsSync(metaPath)) return default_meta;
  const metaFile = fs.readFileSync(metaPath);
  const meta = yaml.load(metaFile);
  return { ...default_meta, ...meta };
}

let uuid = 0;

function compileDirectory(dir, default_meta, log = false) {
  const fileNames = fs.readdirSync(dir);
  (log || LOG_VERBOSE) && console.log({ fileNames });

  const paths = fileNames.map(fileName => PATH.resolve(dir, fileName));
  (log || LOG_VERBOSE) && console.log({ paths });

  const dirs = paths.filter(path => fs.lstatSync(path).isDirectory());
  (log || LOG_VERBOSE) && console.log({ dirs });

  const data = dirs.map((dir, index) => {
    const metaPath = PATH.resolve(dir, META_FILENAME);
    const meta = parseMeta(metaPath, default_meta);
    meta.public_dir = dir.split("public").at(-1);
    (log || LOG_VERBOSE) && console.log(meta);
    return { uuid: (uuid++).toString(), dir, meta };
  });

  return data;
}

function compileSubDirectories(parents, default_meta, log = false) {
  return parents.map(parent =>
    compileDirectory(parent.dir, DEFAULT_LESSON_META, log)
      .map(data => ({ parent_uuid: parent.uuid, ...data }))
  ).flat();
}

function storeData(data, path) {
  fs.writeFileSync(path, JSON.stringify(data));
}

function dump(title, data) {
  console.log("");
  console.log("-----", title, "-----");
  console.log(JSON.stringify(data, null, 2));
  console.log("---", title, "END", "---");
}


function compile(log = false) {
  console.log("COMPILING...");

  const courses = compileDirectory(COURSES_DIR, DEFAULT_COURSE_META);
  (log || LOG_VERBOSE) && dump("COURSES", courses);

  const lessons = compileSubDirectories(courses, DEFAULT_LESSON_META);
  (log || LOG_VERBOSE) && dump("LESSONS", lessons);

  const slides = compileSubDirectories(lessons, DEFAULT_SLIDE_META);
  (log || LOG_VERBOSE) && dump("SLIDES", slides);

  storeData(courses, "src/meta/courses.json");
  storeData(lessons, "src/meta/lessons.json");
  storeData(slides, "src/meta/slides.json");

  console.log("COMPILATION DONE!");
}

compile(true);

// const coursesPath = "public/courses";
// const courseFiles = fs.readdirSync(coursesPath);
// const courses = [];

// courseFiles.forEach(file => {
//   const coursePath = PATH.resolve(coursesPath, file)
//   const isDir = fs.lstatSync(coursePath).isDirectory();
//   const lessonFiles = fs.readdirSync(coursePath);
//   const lessons = [];
//   lessonFiles.forEach(file => {
//     const lessonPath = PATH.resolve(lessonsPath, file);
//     const isDir = fs.lstatSync(lessonPath).isDirectory();
//     if (isDir) {
//       lessons.push(file);
//       const slides = [];
//       const slideFiles = fs.readdirSync(lessonPath);
//       slideFiles.forEach(file => {
//         const slidePath = PATH.resolve(lessonPath, file);
//         const isDir = fs.lstatSync(slidePath).isDirectory();
//         if (isDir) {
//           slides.push(file);
//           const content = {};
//           const contentFiles = fs.readdirSync(slidePath);

//           contentFiles.forEach(file => {
//             const contentPath = PATH.resolve(slidePath, file);
//             const isDir = fs.lstatSync(contentPath).isDirectory();
//             if (!isDir) {
//               const ext = PATH.extname(file).replace(".", "");
//               if (ext !== "yaml")
//                 content[ext] = file;
//             }
//           });

//           mergeMeta(slidePath, { content });
//         }
//       });

//       mergeMeta(lessonPath, { slides });
//     }
//   });
// });

// function mergeMeta(path, newMeta) {
//   const metaPath = PATH.resolve(path, "meta.yaml");
//   const metaLoad = fs.existsSync(metaPath)
//     ? yaml.load(fs.readFileSync(metaPath))
//     : {};
//   const meta = { ...metaLoad, ...newMeta }
//   const metaYaml = yaml.dump(meta);

//   fs.writeFileSync(metaPath, metaYaml);
//   console.log(metaPath);
//   console.log(metaYaml);
// }

// mergeMeta(lessonsPath, { lessons });

// const metaPath = PATH.resolve(lessonsPath, "meta.yaml");
// const meta = yaml.load(fs.readFileSync(metaPath))

// meta.lessons = meta.lessons.map(lesson => {
//   const lessonMetaPath = PATH.resolve(lessonsPath, lesson, "meta.yaml");
//   const lessonMeta = yaml.load(fs.readFileSync(lessonMetaPath))

//   lessonMeta.slides = lessonMeta.slides.map(slide => {
//     const slideMetaPath = PATH.resolve(lessonsPath, lesson, slide, "meta.yaml");
//     const slideMeta = yaml.load(fs.readFileSync(slideMetaPath))
//     return { slide, meta: slideMeta };
//   });

//   return { lesson, meta: lessonMeta };
// });

// const metaJsonPath = "src/meta/meta.json";
// fs.writeFileSync(metaJsonPath, JSON.stringify(meta));
