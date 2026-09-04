import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'content', 'cases');

// Display order of the case grid. Slugs not listed fall to the end, alphabetically.
const ORDER = ['8division'];

export function getAllCases() {
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.json')) : [];
  const cases = files
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    // Skeleton cases — links collected but no media/copy yet — stay out of the
    // site until their first item lands.
    .filter((c) => c.items && c.items.length > 0);
  return cases.sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    if (ia !== ib) return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    return a.slug.localeCompare(b.slug);
  });
}

export function getCase(slug) {
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
