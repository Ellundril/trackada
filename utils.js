import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import chalk from "chalk"; //permet d'afficher des couleurs dans le terminal
//Variables
let erreurs = [];
const cheminProjets = join(
  homedir(),
  "Documents",
  "ada-tech",
  "bloc1",
  "projets",
);

// fonction écriture dans un fichier
const ecrire = (string) => {
  writeFileSync(join(cheminProjets, "trackada", "resultats.txt"), string, {
    encoding: "utf-8",
    flag: "a+",
  });
};

//Fonctions de bases
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
//Vérif dossier parent projets
const dossierProjetExist = () => {
  if (existsSync(cheminProjets)) {
    console.log(chalk.green.bold(`✅ dossier projets\n`));
    ecrire(`✅ dossier projets\n`);
  } else {
    console.log(chalk.red.bold(`❌ dossier projets introuvable\n`));
    ecrire(`❌ dossier projets introuvable\n`);
  }
};
//Vérification présence du dossier, de .git, des fichiers requis et stockage de ces infos dans un objet
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
//affichage du résultat dans le terminal
function afficherResultat(objet) {
  afficherStatut(objet.nom, objet.ok);
  afficherErreurs(objet.erreursListe);
}

//Afficher le pourcentages de dossiers corrects
const afficherPourcentage = (ok, total) => {
  const pourcentage = Math.round((ok / total) * 100);
  const valide = ok === total;

  if (valide) {
    console.log(
      chalk.green.bold(
        `✅ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})\n`,
      ),
    );
    ecrire(
      `✅ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})\n`,
    );
  } else {
    console.log(
      chalk.red.bold(
        `❌ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})\n`,
      ),
    );
    ecrire(
      `❌ ${pourcentage}% des projets sont initialisés correctement (${ok}/${total})\n`,
    );
  }
};

//détecter les dossiers en trop
const dossiersTracked = (dossier, trackedTab) => {
  return trackedTab.some((projet) => projet.name === dossier);
};

//recupère un objet précis dans le tableau grâce à son nom
const recupDossierATraiter = (nom, tableauDossiers) => {
  let dossierVise;
  tableauDossiers.forEach((dossier) => {
    if (nom === dossier.name) {
      dossierVise = dossier;
    }
  });
  return dossierVise;
};

//=====FONCTIONS AFFICHAGE====

function afficherStatut(nom, ok) {
  if (ok) {
    console.log(chalk.green.bold(`✅ dossier du projet ${nom}\n`));
    ecrire(`✅ dossier du projet ${nom}\n`);
  } else {
    console.log(chalk.red.bold(`❌ dossier du projet ${nom}\n`));
    ecrire(`❌ dossier du projet ${nom}\n`);
  }
}

const afficherErreurs = (erreurs) => {
  erreurs.forEach((e) => {
    console.log(` - ${e}`);
    ecrire(` - ${e}\n`);
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

const afficherDossiersSupp = (listeDossiersSupp) => {
  const dossiersSupp = formaterListe(listeDossiersSupp);
  console.log(chalk.blue.italic(`Les dossiers ${dossiersSupp} sont en trop.`));
  ecrire(`Les dossiers ${dossiersSupp} sont en trop.\n`);
};
// ==== exportations ====
export {
  verifierProjet,
  afficherResultat,
  afficherPourcentage,
  dossierProjetExist,
  dossiersTracked,
  afficherDossiersSupp,
  recupDossierATraiter,
  ecrire,
  cheminProjets,
};
