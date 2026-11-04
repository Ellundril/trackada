import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import {
  dossierProjetExist,
  verifierProjet,
  afficherPourcentage,
  afficherResultat,
} from "./utils.js";

import readline from "readline";
import chalk from "chalk";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
const tabProjets = trackJson.projects; //c'est un tableau

let suiviProjet = {
  nom: "",
  dossier: false,
  git: false,
  fichiers: false,
  erreursListe: [],
  ok: false,
};
let nbProjetsValides = 0;

//==== Interaction avec l'utilisateur =====
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Outil de vérification de projets activé...");
rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
  if (reponse.trim().toLowerCase() === "o") {
    console.log(`Je lance la vérification...\n`);

    // ===== VERIFICATION EXISTENCE DU DOSSIER PROJET
    dossierProjetExist();
    // ===== VERIFICATION DES PROJETS =====
    tabProjets.forEach((projet) => {
      verifierProjet(suiviProjet, projet);
      afficherResultat(suiviProjet);
      if (suiviProjet.ok) {
        nbProjetsValides++;
      }
    });
    afficherPourcentage(nbProjetsValides, tabProjets.length);
  } else {
    console.log("Annulé.");
  }

  rl.close();
});
