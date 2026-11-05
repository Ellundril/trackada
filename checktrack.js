import { readFileSync, readdirSync } from "fs";

import {
  dossierProjetExist,
  verifierProjet,
  afficherPourcentage,
  afficherResultat,
  cheminProjets,
  dossiersTracked,
  afficherDossiersSupp,
} from "./utils.js";

import readline from "readline";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
const tabProjets = trackJson.projects; //c'est un tableau
const listeProjets = readdirSync(cheminProjets);

let suiviProjet = {
  nom: "",
  dossier: false,
  git: false,
  fichiers: false,
  erreursListe: [],
  ok: false,
};
let nbProjetsValides = 0;
let projetsEnTrop = [];

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

    listeProjets.forEach((dossier) => {
      const estVerifie = dossiersTracked(dossier, tabProjets);
      if (!estVerifie) {
        projetsEnTrop.push(dossier);
      }
    });
    afficherDossiersSupp(projetsEnTrop);
  } else {
    console.log("Annulé.");
  }

  rl.close();
});
