const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove interfaces and types
    content = content.replace(/interface\s+\w+\s*{[^}]*}/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');

    // 2. Remove type annotations in functions: (arg: Type) -> (arg)
    // Simple regex for : string, : any, etc.
    content = content.replace(/:\s*[A-Z][a-zA-Z\[\]<>]*/g, '');
    content = content.replace(/:\s*string/g, '');
    content = content.replace(/:\s*number/g, '');
    content = content.replace(/:\s*boolean/g, '');
    content = content.replace(/:\s*any/g, '');
    content = content.replace(/:\s*void/g, '');

    // 3. Remove generics <T>
    // content = content.replace(/<[A-Z]>/g, ''); // Risky with JSX

    // 4. Remove 'as Type'
    content = content.replace(/\sas\s+[A-Z][a-zA-Z]*/g, '');

    // 5. Imports
    content = content.replace(/import\s+type\s+/g, 'import ');

    const newExt = file.endsWith('.tsx') ? '.jsx' : '.js';
    const newPath = file.replace(/\.tsx?$/, newExt);

    fs.writeFileSync(newPath, content);
    fs.unlinkSync(file); // Delete original
    console.log(`Converted: ${file} -> ${newPath}`);
});

console.log("TypeScript Purge Complete.");
