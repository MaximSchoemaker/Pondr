import fs from "fs";
import PATH from "path";
import yaml from "js-yaml";

const LOG_VERBOSE = false;
const FALLBACK_META_FILENAME = "meta.yaml";

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

function parseMeta(metaPath, fallbackMetaPath, default_meta) {
  if (!fs.existsSync(metaPath)) {
    console.warn("could not find", metaPath);
    metaPath = fallbackMetaPath;
  }
  if (!fs.existsSync(metaPath)) return default_meta;
  const metaFile = fs.readFileSync(metaPath);
  const meta = yaml.load(metaFile);
  return { ...default_meta, ...meta };
}

let uuid = 0;

function slugify(string) {
  return string
    .toLowerCase()
    .replaceAll(" ", "-");
}

let ids = [];
function generateId(title) {
  let id = slugify(title);

  let i = 2;
  while (ids.includes(id)) {
    id = slugify(`${title} ${i}`);
    i++;
  }
  ids.push(id);
  return id;
}

function compileDirectory(dir, default_meta, meta_filename, log = false) {
  const fileNames = fs.readdirSync(dir);
  (log || LOG_VERBOSE) && console.log({ fileNames });

  const paths = fileNames.map(fileName => PATH.resolve(dir, fileName));
  (log || LOG_VERBOSE) && console.log({ paths });

  const dirs = paths.filter(path => fs.lstatSync(path).isDirectory());
  (log || LOG_VERBOSE) && console.log({ dirs });

  const data = dirs.map(dir => {
    const metaPath = PATH.resolve(dir, meta_filename);
    const fallbackMetaPath = PATH.resolve(dir, FALLBACK_META_FILENAME);
    const meta = parseMeta(metaPath, fallbackMetaPath, default_meta);
    const public_dir = dir.split("public").at(-1);
    (log || LOG_VERBOSE) && console.log(meta);
    return { uuid: generateId(meta.title), dir, public_dir, meta };
  });

  return data;
}

function compileSubDirectories(parents, default_meta, meta_filename, log = false) {
  return parents.map(parent =>
    compileDirectory(parent.dir, DEFAULT_LESSON_META, meta_filename, log)
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

  const courses_eg = compileDirectory(COURSES_DIR, DEFAULT_COURSE_META, "meta.yaml");
  const courses_nl = compileDirectory(COURSES_DIR, DEFAULT_COURSE_META, "meta.nl.yaml");
  const courses = { eg: courses_eg, nl: courses_nl };

  (log || LOG_VERBOSE) && dump("COURSES", courses, "meta.yaml");

  const lessons_eg = compileSubDirectories(courses.eg, DEFAULT_LESSON_META, "meta.yaml");
  const lessons_nl = compileSubDirectories(courses.nl, DEFAULT_LESSON_META, "meta.nl.yaml");
  const lessons = { eg: lessons_eg, nl: lessons_nl };
  (log || LOG_VERBOSE) && dump("LESSONS", lessons);

  const slides_eg = compileSubDirectories(lessons.eg, DEFAULT_SLIDE_META, "meta.yaml");
  const slides_nl = compileSubDirectories(lessons.nl, DEFAULT_SLIDE_META, "meta.nl.yaml");
  const slides = { eg: slides_eg, nl: slides_nl };
  (log || LOG_VERBOSE) && dump("SLIDES", slides);

  storeData(courses, "src/compiled/courses.json");
  storeData(lessons, "src/compiled/lessons.json");
  storeData(slides, "src/compiled/slides.json");

  console.log("COMPILATION DONE!");
}

compile(false);