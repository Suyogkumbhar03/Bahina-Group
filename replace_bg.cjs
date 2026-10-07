const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('c:\\\\Users\\\\SUYOG\\\\Desktop\\\\Bahina Foundation\\\\src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace glass panels
    content = content.replace(/bg-black\/(40|45|30|50|35|70|85|75)/g, 'bg-white/10');
    
    // Replace gradients
    content = content.replace(/from-\[#070908\]\/[0-9]+/g, 'from-white/10');
    content = content.replace(/via-\[#070908\]\/[0-9]+/g, 'via-white/5');
    content = content.replace(/to-\[#070908\]\/[0-9]+/g, 'to-white/10');
    content = content.replace(/from-\[#070908\]/g, 'from-white/10');
    content = content.replace(/to-\[#070908\]/g, 'to-white/10');
    content = content.replace(/bg-\[#070908\]\/[0-9]+/g, 'bg-white/10');

    if (filePath.includes('App.jsx')) {
      content = content.replace(/bg-\[#070908\]/g, 'bg-transparent');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
