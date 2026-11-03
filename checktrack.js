import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));

//Chemin vers ~/Documents/ada-tech
// const cheminAda = join(homedir(), "Documents", "ada-tech");

//Chemin vers ~/Documents/ada-tech/bloc1/projets
const cheminProjet = join(
  homedir(),
  "Documents",
  "ada-tech",
  "bloc1",
  "projets",
);

//Vérification existence du dossier Projets

const dossierProjetExist = existsSync(cheminProjet);
console.log(
  dossierProjetExist ? `✅ dossier projets ` : "❌ dossier projets introuvable",
);

// ===== VERIFICATION DES PROJETS =====

//récupération du tableau des projets
const projets = trackJson.projects; //c'est un tableau

import { verifierProjet } from "./utils.js";

//Vérification de chaque projet
projets.forEach((projet) => {
  const nomProjet = projet.name;
  const requis = projet.required;

  verifierProjet(cheminProjet, nomProjet, requis);
});
