export async function loadMd(mdPath) {
   const res = await (await fetch(mdPath)).text();
   return res.split("---");
}