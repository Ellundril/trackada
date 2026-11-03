import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
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

import { verifierProjet, afficherPourcentage, projetsOk } from "./utils.js";
//Interaction avec l'utilisateur
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Outil de vérification de projets activé...");
rl.question("Quel est ton nom ? ", (nom) => {
  rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
    if (reponse.trim().toLowerCase() === "o") {
      console.log(`Bonjour ${nom}, 
        Je lance la vérification...
         `);
      // lancer la vérification
      //Vérification existence du dossier Projets

      const dossierProjetExist = existsSync(cheminProjet);
      console.log(
        dossierProjetExist
          ? chalk.green.bold(`✅ dossier projets
          `)
          : chalk.red.bold(`❌ dossier projets introuvable 
            `),
      );

      // ===== VERIFICATION DES PROJETS =====

      //récupération du tableau des projets

      //Vérification de chaque projet
      projets.forEach((projet) => {
        const nomProjet = projet.name;
        const requis = projet.required;
        verifierProjet(cheminProjet, nomProjet, requis);
      });

      afficherPourcentage(projetsOk, projets.length);
    } else {
      console.log("Annulé.");
    }
    rl.close();
  });
});
