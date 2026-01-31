// scripts/cleanup.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function cleanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === '.next') return;
        const fullPath = path.join(dir, item);
        try {
            if (fs.statSync(fullPath).isDirectory()) {
                cleanDir(fullPath); 
                if (fs.readdirSync(fullPath).length === 0) fs.rmdirSync(fullPath);
            }
        } catch(e) {}
    });
}
console.log("🧹 Limpieza rápida completada.");