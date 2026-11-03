import { existsSync } from "fs";
import { join } from "path";

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
  afficherStatut(nom, result);
  afficherErreurs(erreurs);
};

function afficherStatut(nom, ok) {
  const icone = ok ? "✅" : "❌";
  console.log(`${icone} dossier du projet ${nom}`);
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
  return `Il manque ${fichiersManquants}`;
};

export { verifierProjet };
