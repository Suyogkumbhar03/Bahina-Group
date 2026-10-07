const fs = require('fs');
const path = require('path');

// 1. Restore DivisionsSection.jsx
const scratchPath = 'C:\\Users\\SUYOG\\.gemini\\antigravity-ide\\brain\\eddb4861-abcb-494b-829c-a148dd832d58\\scratch\\DivisionsSection.jsx';
const targetPath = 'c:\\Users\\SUYOG\\Desktop\\Bahina Foundation\\src\\components\\sections\\DivisionsSection.jsx';

let divisionsContent = fs.readFileSync(scratchPath, 'utf8');

// Fix the card so it doesn't get cut off on short screens (add overflow-y-auto to the card specifically)
divisionsContent = divisionsContent.replace(
  /className="w-full relative rounded-3xl border border-\[#D9A441\]\/25 bg-\[#070908\]\/80 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden"/g,
  'className="w-full relative rounded-3xl border border-[#D9A441]/25 bg-white/10 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-y-auto scrollbar-hide"'
);

// Fix the fallback card background
divisionsContent = divisionsContent.replace(/bg-\[#070908\]\/80/g, 'bg-white/10');

fs.writeFileSync(targetPath, divisionsContent);

// 2. Globally increase font weights and brightness
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('c:\\Users\\SUYOG\\Desktop\\Bahina Foundation\\src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/font-light/g, 'font-medium');
    content = content.replace(/font-normal/g, 'font-semibold');
    content = content.replace(/text-neutral-400/g, 'text-neutral-200');
    content = content.replace(/text-neutral-300/g, 'text-neutral-100');
    content = content.replace(/text-neutral-200/g, 'text-white');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated fonts in', filePath);
    }
  }
});
