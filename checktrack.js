import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
console.log(trackJson);

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
console.log(dossierProjetExist ? `✅ dossier Projet ` : "❌ dossier Projet");

// ===== VERIFICATION DES PROJETS =====

//récupération du tableau des projets
const projets = trackJson.projects; //c'est un tableau
console.log(projets);

import { afficherStatut } from "./utils.js";

//Vérifie l'existence des dossiers projets et gère l'affichage du résultat
const exist = (projet) => {
  afficherStatut(projet, existsSync(cheminProjet));
};

projets.forEach((projet) => {
  const nomProjet = projet.name;
  exist(nomProjet);
});
