import { readFileSync, readdirSync } from "fs";

import {
  dossierProjetExist,
  verifierProjet,
  afficherPourcentage,
  afficherResultat,
  cheminProjets,
  dossiersTracked,
  afficherDossiersSupp,
  recupDossierATraiter,
  recupDossierSupp,
  ecrire,
} from "./utils.js";

import readline from "readline";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));
const tabProjets = trackJson.projects; //c'est un tableau
const listeProjets = readdirSync(cheminProjets);

//récupération de la date
const date = new Date();

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

function checkAll() {
  ecrire(`\n${date.toDateString("fr-FR")}\n`);
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
  //recherche des dossiers en trop
  recupDossierSupp(listeProjets, tabProjets, projetsEnTrop);
  afficherDossiersSupp(projetsEnTrop);
}

function checkOne(dossier) {
  ecrire(`\n${date.toDateString()}\n`);
  const nomDossier = dossier.trim().toLowerCase();
  console.log(`Vérification du projet ${nomDossier}`);
  const dossierComplet = recupDossierATraiter(nomDossier, tabProjets);
  verifierProjet(suiviProjet, dossierComplet);
  afficherResultat(suiviProjet);
}
//==== Interaction avec l'utilisateur =====
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Outil de vérification de projets activé...");
rl.question(
  ` - Lancer la vérification complète ? (o)\n - Vérifier un projet (nom-projet) \n- annuler (n)`,
  (reponse) => {
    switch (reponse.trim().toLowerCase()) {
      case "o":
        console.log(`Je lance la vérification...\n`);
        checkAll();
        break;

      case "n":
        console.log("Vérification annulée.");
        break;

      default:
        if (dossiersTracked(reponse.trim().toLowerCase(), tabProjets)) {
          checkOne(reponse);
        } else {
          console.log(`Le projet ${reponse} n'existe pas`);
        }
    }

    rl.close();
  },
);
