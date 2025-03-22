


### Configuration

| Nom | Type | Valeur par défaut | Description |
--
| auto | boolean | true | start automatically the slider animation |
| stop | boolean | true | Auto stop the carousel after a certain amount of time |
| speed | number | 0 | Speed of the transition, in milliseconds. By default retrieved dynamically from the first item's css transiton duration |
| timeout | number | 4000 | Time between slide transitions, in milliseconds (1s = 1000ms) |
| <span lang="en">pager</span> (pagination) | booléen | <span lang="en">false</span> | Afficher ou cacher la pagination |
| <span lang="en">nav</span> (navigation) | booléen | <span lang="en">false</span> | Afficher ou cacher la navigation (flèche précédente et suivante) |
| <span lang="en">random</span> (aléatoire) | booléen | false | Rendre aléatoire la séquence des éléments |
| <span lang="en">pause</span> (pause) | booléen | false | Suspendre la lecture automatique quand l'utilisateur interagit avec la diapositive en cours |
| <span lang="en">pauseControls</span> (pause contrôle)  | booléen | false | Suspendre la lecture automatique quand l'utilisateur survole les boutons de contrôles |
| <span lang="en">prevText</span> | string | Previous | Texte utilisé pour le nom du bouton permettant de retourner à la diapositive précédente |
| <span lang="en">nextText</span> | string | Next | Texte utilisé pour le nom du bouton permettant d'avancer à la diapositive suivante |
| <span lang="en">maxWidth</span> | nombre | 0 | Largeur maximale du diaporama en pixels (0 = automatique) |
| <span lang="en">navContainer</span> (Conteneur de la navigation) | chaîne de caractères | '' | Le selecteur qui sert à cibler un noeud HTML dans lequel sera ajouté automatiquement les boutons de contrôles. Par défault les boutons sont inclus juste après la première balise ul contetant les diapositives. |
| <span lang="en">manualControls</span> (Contrôles manuels) | string | '' | Le noeud HTML qui contient la pagination que vous avez créé |