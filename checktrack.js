import { readFileSync, existsSync } from "fs";
//import fs from "node:fs"
import { join } from "path";
import { homedir } from "os";
import { statSync } from "fs";

// ==== CHARGEMENT ====
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
console.log(trackJson);

/* const adaPath = "../../../../ada-tech";
console.log(adaPath);
const adaExist = existsSync(adaPath) && statSync(adaPath).isDirectory;
console.log(adaExist); */

const adaExist = existsSync(join(homedir(), "Documents", "ada-tech"));
console.log(adaExist ? "✅ dossier ada-tech" : "❌ dossier ada-tech");

// ===== VERIFICATION DES PROJETS =====

const projets = trackJson.projects; //c'est un tableau
console.log(projets);

const cheminProjet = join(
  homedir(),
  "Documents",
  "ada-tech",
  "bloc1",
  "projets",
);

const exist = (projet) => {
  if (existsSync(cheminProjet)) {
    console.log(`✅ dossier du projet ${projet}`);
  } else {
    console.log(`❌ dossier du projet ${projet}`);
  }
};

projets.forEach((projet) => {
  const nomProjet = projet.name;
  exist(nomProjet);
});
