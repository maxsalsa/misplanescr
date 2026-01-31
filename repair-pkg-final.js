const fs = require("fs");
const path = require("path");

console.log("   📝 Agregando jsPDF y Next-Auth al sistema...");

const pkgPath = path.join(__dirname, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Agregamos lo que el compilador pide a gritos
pkg.dependencies["jspdf"] = "^2.5.1";
pkg.dependencies["jspdf-autotable"] = "^3.8.1";
pkg.dependencies["next-auth"] = "^4.24.5";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), { encoding: "utf8" });
console.log("   ✅ package.json blindado.");