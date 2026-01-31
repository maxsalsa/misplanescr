import { scanAndIndexDocs } from '../lib/knowledge-base-service.js';

console.log("Starting Manual Indexing...");
scanAndIndexDocs()
    .then(files => {
        console.log(`Successfully indexed ${files.length} documents.`);
    })
    .catch(err => {
        console.error("Indexing failed:", err);
    });
