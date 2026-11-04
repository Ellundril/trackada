import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { verifierProjet, afficherPourcentage, projetOk } from "./utils.js";
import readline from "readline";
import chalk from "chalk";

// ==== CHARGEMENT ====
//Charger et parser JSON
const trackJson = JSON.parse(readFileSync("track.json", "utf-8"));

//Chemin vers ~/Documents/ada-tech/bloc1/projets
const cheminProjet = join(
  homedir(),
  "Documents",
  "ada-tech",
  "bloc1",
  "projets",
);

const projets = trackJson.projects; //c'est un tableau
let etatDossier = {
  nom: "",
  dossierExiste: false,
  git: false,
  fichiersPresents: false,
  erreurs: [],
  ok: false,
};

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

    console.log(
      existsSync(cheminProjet)
        ? chalk.green.bold(`✅ dossier projets\n`)
        : chalk.red.bold(`❌ dossier projets introuvable\n`),
    );

    // ===== VERIFICATION DES PROJETS =====
    projets.forEach((projet) => {
      const nomProjet = projet.name;
      const requis = projet.required;
      verifierProjet(cheminProjet, nomProjet, requis);
    });

    afficherPourcentage(projetOk, projets.length);
  } else {
    console.log("Annulé.");
  }
  rl.close();
});
