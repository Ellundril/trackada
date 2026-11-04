import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import chalk from "chalk";
let erreurs = [];
const cheminProjets = join(
  homedir(),
  "Documents",
  "ada-tech",
  "bloc1",
  "projets",
);

const dossierProjetExist = () => {
  console.log(
    existsSync(cheminProjets)
      ? chalk.green.bold(`✅ dossier projets\n`)
      : chalk.red.bold(`❌ dossier projets introuvable\n`),
  );
};
const existeProjet = (chemin) => {
  const exist = existsSync(chemin);
  if (!exist) {
    erreurs.push("le dossier n'existe pas ou n'est pas nommé correctement");
  }
  return exist;
};

const isGitInit = (chemin) => {
  const initGit = existsSync(join(chemin, ".git"));
  if (!initGit) {
    erreurs.push("le repository git n'est pas initialisé");
  }
  return initGit;
};

const isFileMissing = (chemin, tableau) => {
  const manquants = tableau.filter(
    (fichier) => !existsSync(join(chemin, fichier)),
  );
  const presents = manquants.length === 0;
  if (!presents) {
    let fichiersManquants = [];
    manquants.forEach((fichier) => fichiersManquants.push(fichier));
    erreurs.push(messageFichiers(fichiersManquants));
  }
  return presents;
};

//VERIFIER le dossier, l'initialisation git et la présence de tous les fichiers nécessaires/retourne un booleen et le tableau des éventuelles erreurs
function verifierProjet(suiviProjet, projet) {
  erreurs = [];
  const chemin = join(cheminProjets, projet.name);
  suiviProjet.nom = projet.name;
  suiviProjet.dossier = existeProjet(chemin);
  suiviProjet.git = isGitInit(chemin);
  suiviProjet.fichiers = isFileMissing(chemin, projet.required);
  suiviProjet.erreursListe = erreurs;
  const { dossier, git, fichiers } = suiviProjet;
  suiviProjet.ok = dossier && git && fichiers;
}

function afficherResultat(objet) {
  afficherStatut(objet.nom, objet.ok);
  afficherErreurs(objet.erreursListe);
}

//Afficher le pourcentages de dossiers corrects
const afficherPourcentage = (ok, total) => {
  const pourcentage = Math.round((ok / total) * 100);
  const valide = ok === total;
  valide
    ? console.log(
        chalk.green.bold(
          `✅ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})`,
        ),
      )
    : console.log(
        chalk.red.bold(
          `❌ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})`,
        ),
      );
};

//Afficher le statut du dossier
function afficherStatut(nom, ok) {
  ok
    ? console.log(chalk.green.bold(`✅ dossier du projet ${nom}\n`))
    : console.log(chalk.red.bold(`❌ dossier du projet ${nom}\n`));
}

const afficherErreurs = (erreurs) => {
  erreurs.forEach((e) => {
    console.log(` - ${e}`);
  });
};

const formaterListe = (items) => {
  if (items.length === 1) {
    return `${items[0]}`;
  } else if (items.length >= 2) {
    return `${items.slice(0, -1).join(", ")} et ${items.at(-1)}`;
  }
};

const messageFichiers = (manquants) => {
  const fichiersManquants = formaterListe(manquants);
  return `Il manque ${fichiersManquants}
   `;
};

export {
  verifierProjet,
  afficherResultat,
  afficherPourcentage,
  dossierProjetExist,
};
