const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walkDir(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('next-auth/react') || content.includes('next-auth')) {
    content = content.replace(/from ["']next-auth\/react["']/g, 'from "@/lib/auth-client"');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
});
