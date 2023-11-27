
import meta from "./meta.json";

export function oMap(obj, callback) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = callback(obj[key])
    return result
  }, {})
}

console.log(meta);
const lessons = meta.lessons.map(lesson => ({
  ...lesson.meta, key: lesson.lesson, slides: lesson.meta.slides.map((slide, i) => ({
    ...slide.meta,
    ...oMap(slide.meta.content, (content) => `lessons/${lesson.lesson}/${slide.slide}/${content}`),
    url: `/${lesson.lesson}/${i}`,
  }))
}));
console.log(lessons);

export {
  meta,
  lessons,
}