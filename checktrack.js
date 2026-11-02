import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { execFileSync } from "child_process";

// ==== CHARGEMENT ====
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
console.log(trackJson);

const adaExist = existsSync(join(homedir(), "Documents", "ada-tech"));
if (adaExist) {
  console.log(`Le dossier ada-tech existe`);
}

// ===== VERIFICATION DES PROJETS =====

const projets = trackJson.projects; //c'est un tableau
console.log(projets);

projets.forEach((projet) => {
  const nomProjet = projet.name;
  console.log(nomProjet);
});
