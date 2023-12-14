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

  const data = dirs.map(dir => {
    const metaPath = PATH.resolve(dir, META_FILENAME);
    const meta = parseMeta(metaPath, default_meta);
    const public_dir = dir.split("public").at(-1);
    (log || LOG_VERBOSE) && console.log(meta);
    return { uuid: (uuid++).toString(), dir, public_dir, meta };
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

  storeData(courses, "src/compiled/courses.json");
  storeData(lessons, "src/compiled/lessons.json");
  storeData(slides, "src/compiled/slides.json");

  console.log("COMPILATION DONE!");
}

compile(true);