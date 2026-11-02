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
if (adaExist) {
  console.log(`Le dossier ada-tech existe`);
} else {
  console.log("le dossier ada-tech n'existe pas");
}

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
    console.log(`Le dossier ${projet} existe`);
  } else {
    console.log(`Le dossier ${projet} n'existe pas`);
  }
};

projets.forEach((projet) => {
  const nomProjet = projet.name;
  exist(nomProjet);
});
