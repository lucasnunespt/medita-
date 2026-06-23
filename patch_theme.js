const fs = require('fs');

let css = fs.readFileSync('c:/Users/kaull/Desktop/neuro.medit/settings-panel.css', 'utf8');

css = css.replace(/background:\s*rgba\(31, 35, 38, 0\.18\);/g, 'background: color-mix(in srgb, var(--text-primary) 18%, transparent);');
css = css.replace(/-24px 0 72px rgba\(31, 35, 38, 0\.08\)/g, '-24px 0 72px var(--shadow-card, rgba(0,0,0,0.1))');
css = css.replace(/inset 1px 0 0 rgba\(255, 255, 255, 0\.28\)/g, 'inset 1px 0 0 var(--line)');

// Typography
css = css.replace(/color: var\(--text, #1f2326\);/g, 'color: var(--text-primary);');
css = css.replace(/color: var\(--text-soft, #66706f\);/g, 'color: var(--text-secondary);');
css = css.replace(/color: var\(--text-muted, #7b8483\);/g, 'color: var(--text-muted);');

// Backgrounds & Borders fallback removal (they often force light colors if var is missing)
css = css.replace(/var\(--line, rgba\(31, 35, 38, 0\.08\)\)/g, 'var(--line)');
css = css.replace(/var\(--surface, rgba\(255, 255, 255, 0\.7\)\)/g, 'var(--surface)');
css = css.replace(/var\(--surface-strong, rgba\(255, 255, 255, 0\.88\)\)/g, 'var(--surface-strong)');
css = css.replace(/var\(--accent, #8aa5a0\)/g, 'var(--accent)');
css = css.replace(/var\(--accent-dark, #708f89\)/g, 'var(--accent-dark)');

// Hardcoded light mode backgrounds
css = css.replace(/background: rgba\(31, 35, 38, 0\.06\);/g, 'background: var(--line);'); // toggles
css = css.replace(/background: white;/g, 'background: var(--surface-strong);'); // toggle handle
css = css.replace(/box-shadow: 0 2px 6px rgba\(31, 35, 38, 0\.1\);/g, 'box-shadow: 0 2px 6px var(--shadow-soft, rgba(0,0,0,0.1));');
css = css.replace(/box-shadow: 0 2px 8px rgba\(31, 35, 38, 0\.14\);/g, 'box-shadow: 0 2px 8px var(--shadow-card, rgba(0,0,0,0.15));');

css = css.replace(/background: rgba\(31, 35, 38, 0\.08\);/g, 'background: var(--line);'); // slider track
css = css.replace(/box-shadow: 0 2px 8px rgba\(31, 35, 38, 0\.12\);/g, 'box-shadow: 0 2px 8px var(--shadow-soft, rgba(0,0,0,0.12));');
css = css.replace(/box-shadow: 0 3px 12px rgba\(31, 35, 38, 0\.16\);/g, 'box-shadow: 0 3px 12px var(--shadow-card, rgba(0,0,0,0.16));');

css = css.replace(/background: rgba\(31, 35, 38, 0\.03\);/g, 'background: color-mix(in srgb, var(--line) 50%, transparent);'); // select group

css = css.replace(/border-top: 1px solid rgba\(31, 35, 38, 0\.04\);/g, 'border-top: 1px solid var(--line);'); // rows
css = css.replace(/border-color: rgba\(31, 35, 38, 0\.14\);/g, 'border-color: var(--line);'); // ghost btn hover

// Specific button texts
css = css.replace(/color: var\(--button-text, #f4e6da\);/g, 'color: var(--button-text);');

// Scrollbar
css = css.replace(/scrollbar-color: var\(--line\) transparent;/g, 'scrollbar-color: var(--line) transparent;');

// Ensure specific elements have properly scoped text
css = css.replace(/color: rgba\(31, 35, 38, 0\.14\);/g, 'color: var(--text-primary);');

// Auth container overrides in settings-panel.js
css = css.replace(/background: var\(--surface, rgba\(255, 255, 255, 0\.9\)\);/g, 'background: var(--surface);');
css = css.replace(/background: var\(--surface-strong, #ffffff\);/g, 'background: var(--surface-strong);');
css = css.replace(/box-shadow: var\(--shadow-soft, 0 4px 12px rgba\(31, 35, 38, 0\.04\)\);/g, 'box-shadow: var(--shadow-soft);');
css = css.replace(/box-shadow: 0 6px 16px rgba\(31, 35, 38, 0\.08\);/g, 'box-shadow: var(--shadow-card);');

// Write back
fs.writeFileSync('c:/Users/kaull/Desktop/neuro.medit/settings-panel.css', css);
console.log('Settings panel CSS patched');
