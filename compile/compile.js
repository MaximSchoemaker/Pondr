const fs = require('fs');
const PATH = require('path');
const yaml = require('js-yaml');

const lessonsPath = "public/lessons";
const lessonFiles = fs.readdirSync(lessonsPath);
const lessons = [];
lessonFiles.forEach(file => {
  const lessonPath = PATH.resolve(lessonsPath, file);
  const isDir = fs.lstatSync(lessonPath).isDirectory();
  if (isDir) {
    lessons.push(file);
    const slides = [];
    const slideFiles = fs.readdirSync(lessonPath);
    slideFiles.forEach(file => {
      const slidePath = PATH.resolve(lessonPath, file);
      const isDir = fs.lstatSync(slidePath).isDirectory();
      if (isDir) {
        slides.push(file);
        const content = {};
        const contentFiles = fs.readdirSync(slidePath);

        contentFiles.forEach(file => {
          const contentPath = PATH.resolve(slidePath, file);
          const isDir = fs.lstatSync(contentPath).isDirectory();
          if (!isDir) {
            const ext = PATH.extname(file).replace(".", "");
            if (ext !== "yaml")
              content[ext] = file;
          }
        });

        mergeMeta(slidePath, { content });
      }
    });

    mergeMeta(lessonPath, { slides });
  }
});

function mergeMeta(path, newMeta) {
  const metaPath = PATH.resolve(path, "meta.yaml");
  const metaLoad = fs.existsSync(metaPath)
    ? yaml.load(fs.readFileSync(metaPath))
    : {};
  const meta = { ...metaLoad, ...newMeta }
  const metaYaml = yaml.dump(meta);

  fs.writeFileSync(metaPath, metaYaml);
  console.log(metaPath);
  console.log(metaYaml);
}

mergeMeta(lessonsPath, { lessons });

const metaPath = PATH.resolve(lessonsPath, "meta.yaml");
const meta = yaml.load(fs.readFileSync(metaPath))

meta.lessons = meta.lessons.map(lesson => {
  const lessonMetaPath = PATH.resolve(lessonsPath, lesson, "meta.yaml");
  const lessonMeta = yaml.load(fs.readFileSync(lessonMetaPath))

  lessonMeta.slides = lessonMeta.slides.map(slide => {
    const slideMetaPath = PATH.resolve(lessonsPath, lesson, slide, "meta.yaml");
    const slideMeta = yaml.load(fs.readFileSync(slideMetaPath))
    return { slide, meta: slideMeta };
  });

  return { lesson, meta: lessonMeta };
});

const metaJsonPath = "src/meta/meta.json";
fs.writeFileSync(metaJsonPath, JSON.stringify(meta));
