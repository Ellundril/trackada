# Trackada

Trackada est un projet en node.js qui permet de vérifier pour chaque projet réalisés pendant la formation avec Ada Tech School :

- la présence d'un dossier pour chaque projet
- la vérification de l'initialisation git pour chaque projet
- la présence des fichiers obligatoires à l'intérieur du dossier.

## Contenu du projet

### Fichiers principaux

- Un fichier principal js [checktrack.js](checktrack.js)
- Un fichier [package.json](package.json)
- Un fichier [readme.md](readme.md)
- Un fichier avec les données à vérifier [track.json](track.json)
- Un fichier avec les fonctions utiles [utils.js](utils.js)

### Fichiers pour le bonus

Pour réaliser le bonus : "afficher des couleurs dans le terminal" j'ai installé un module node nommé chalk qui amène donc :

- un dossier [node_modules](node_modules)
- un fichier [package-lock.json](package-lock.json)

## Lancement du projet

### Prérequis

- Avoir installé Node.js
- Avoir créé l'arborescence depuis le dossier ada-tech demandée par Ada en S1 :
  - Chemin du dossier trackada depuis votre dossier ada-tech : /ada-tech/bloc1/projets/trackada

### Lancement

1. Télécharger le dossier depuis github en se plaçant dans le dossier : /ada-tech/bloc1/projets et en tapant dans le terminal :

```bash
git clone git@github.com:Ellundril/trackada.git
```

2. Se placer dans le dossier [trackada](trackada)

```bash
cd trackada/
```

3. Dans le terminal lancer la commande suivante :

```bash
node checktrack.js
```

4. Choisir une option :
   - "o" pour lancer la vérification complète
   - le "nom d'un projet" pour vérifier ce projet particulier
   - "n" pour annuler la vérification

5. Trackada renvoie l'analyse des fichiers demandés sauf si vous avez choisi "n" à l'étape 4.

### Résultats

- **Dossier complet** :
  - apparaît en vert avec une coche verte.

    _Exemple_ :

    > ✅ dossier du projet adapage

- **Dossier incomplet** :
  - apparaît en rouge avec une croix rouge.

    _Exemple_ :

    > ❌ dossier du projet trackada

  - liste les erreurs trouvées :

    _Exemple_ :

    > - le repository git n'est pas initialisé
    > - Il manque package.json et README.md

- **bilan général** :
  - affiche le pourcentage de dossiers complets ainsi que la fraction correspondante

    _Exemple_ :

    > ❌ 29% des projets sont initialisés correctement (2/7)

- **dossiers supplémentaires non traités** :
  - affiche la liste des dossiers de projets non suivis par trackada mais présents dans le dossier parent "Projets"

  _Exemple_ :

  > Les dossiers adapage_lyon_seyroux_violaine.zip, adaremise, adatheque et cluada sont en trop.

## Bonus réalisés :

- ajout des couleurs dans le terminal (grâce au module chalk)
- laisser la possibilité à l'utilisatrice de ne vérifier qu'un seul projet
- lister les dossiers présents mais non analysés car non présents dans [track.json](track.json)
- séparation du script en deux fichiers avec export et import des fonctions nécessaires
- ecriture des résultats dans un fichier texte **resultats.txt** avec la date du jour

  _NB : Ce fichier n'apparaît qu'une fois la commande lancée une première fois_
