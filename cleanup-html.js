const fs = require("fs");
const path = require("path");
const root = process.cwd();
const mapPages = new Set(["properties.html", "property-detail.html"]);
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith(".html"));

const makeHead = (title, includeLeaflet) => {
  return `<!DOCTYPE html>\n<html lang="am" dir="ltr">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${title}</title>\n    <link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;600;700&display=swap" rel="stylesheet" />\n    <link rel="stylesheet" href="style.css" />\n${includeLeaflet ? '    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\n' : ""}  </head>\n  <body>\n`;
};

const makeScripts = (includeLeaflet) => {
  const leaflet = includeLeaflet
    ? '  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\n'
    : "";
  return `${leaflet}  <script src="main-script.js"></script>\n</body>\n</html>\n`;
};

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  const text = fs.readFileSync(filePath, "utf8");
  const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch
    ? titleMatch[1].trim()
    : `Trusted Brokerage | ${file.replace(".html", "")}`;
  const includeLeaflet = mapPages.has(file);

  const bodyStart = text.search(/<body[^>]*>/i);
  const bodyEnd = text.toLowerCase().lastIndexOf("</body>");
  let bodyHtml = "";

  if (bodyStart >= 0 && bodyEnd > bodyStart) {
    const bodyOpenMatch = text.slice(bodyStart).match(/<body[^>]*>/i);
    const startIndex =
      bodyStart + (bodyOpenMatch ? bodyOpenMatch[0].length : 0);
    bodyHtml = text.slice(startIndex, bodyEnd);
  } else {
    bodyHtml = text;
  }

  bodyHtml = bodyHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
  bodyHtml = bodyHtml.replace(/<\/?html[^>]*>/gi, "");
  bodyHtml = bodyHtml.replace(/<body[^>]*>/gi, "");
  bodyHtml = bodyHtml.replace(/<\/body>/gi, "");
  bodyHtml = bodyHtml.trim();

  const output =
    makeHead(title, includeLeaflet) +
    bodyHtml +
    "\n" +
    makeScripts(includeLeaflet);
  fs.writeFileSync(filePath, output, "utf8");
  console.log(`Rewrote ${file}`);
}
