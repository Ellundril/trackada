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

export { afficherStatut, afficherErreurs, formaterListe, messageFichiers };
