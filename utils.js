import { existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
let projetsOk = 0;

//VERIFIER le dossier, l'initialisation git et la présence de tous les fichiers nécessaires
const verifierProjet = (cheminDossier, nom, tabFichiers) => {
  let erreurs = [];
  const chemin = join(cheminDossier, nom);

  const exist = existsSync(chemin);
  if (!exist) {
    erreurs.push("le dossier n'existe pas ou n'est pas nommé correctement");
  }

  const initGit = existsSync(join(chemin, ".git"));
  if (!initGit) {
    erreurs.push("le repository git n'est pas initialisé");
  }

  const manquants = tabFichiers.filter(
    (fichier) => !existsSync(join(chemin, fichier)),
  );
  const presents = manquants.length === 0;
  if (!presents) {
    let fichiersManquants = [];
    manquants.forEach((fichier) => fichiersManquants.push(fichier));
    erreurs.push(messageFichiers(fichiersManquants));
  }
  const result = exist && initGit && presents;
  if (result) {
    projetsOk++;
  }
  afficherStatut(nom, result);
  afficherErreurs(erreurs);
};

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
    ? console.log(
        chalk.green.bold(`✅ dossier du projet ${nom}
         `),
      )
    : console.log(
        chalk.red.bold(`❌ dossier du projet ${nom}
         `),
      );
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

export { verifierProjet, afficherPourcentage, projetsOk };
