import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setup jsdom with global pollution
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
const window = dom.window;

// Mock everything needed
globalThis.window = window;
globalThis.document = window.document;
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.SVGElement = window.SVGElement;
globalThis.DOMParser = window.DOMParser;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.CSSStyleSheet = window.CSSStyleSheet || class {};

// MOCK DOMPurify: just return the input string unchanged
// This is safe because we're processing our own static content
globalThis.DOMPurify = {
  sanitize: (html) => html,
  removeAttribute: () => {},
};

// Now import Mermaid
const mermaidLib = await import('mermaid');
const mermaid = mermaidLib.default;

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    background: '#16181f',
    primaryColor: '#1e2130',
    primaryTextColor: '#e2e4ef',
    primaryBorderColor: '#2a2d3e',
    lineColor: '#5b8fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
  },
  flowchart: { curve: 'basis', padding: 16 },
});

// Find all mermaid blocks
const mdFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) mdFiles.push(full);
  }
}
walk(path.join(__dirname, 'src/content/posts'));

const outDir = path.join(__dirname, 'public/diagrams');
fs.mkdirSync(outDir, { recursive: true });

let rendered = 0;
let errors = 0;

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/```mermaid\n([\s\S]*?)```/g)];
  if (matches.length === 0) continue;
  
  const slug = path.basename(file, '.md');
  for (let i = 0; i < matches.length; i++) {
    const source = matches[i][1];
    const id = `${slug}-${i}`;
    try {
      const { svg } = await mermaid.render('m-' + Date.now() + '-' + i, source);
      const outFile = path.join(outDir, `${id}.svg`);
      fs.writeFileSync(outFile, svg);
      console.log(`✅ ${id}.svg (${svg.length} bytes)`);
      rendered++;
    } catch (err) {
      console.error(`❌ ${id}: ${err.message?.substring(0, 200) || err}`);
      errors++;
    }
  }
}

console.log(`\n=== ${rendered} rendered, ${errors} errors ===`);
