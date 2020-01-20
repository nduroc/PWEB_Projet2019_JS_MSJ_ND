[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0c375ba0ebca4b50842097e91def4531)](https://www.codacy.com/manual/nicolas.duroc/PWEB_Projet2019_JS_MSJ_ND?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nduroc/PWEB_Projet2019_JS_MSJ_ND&amp;utm_campaign=Badge_Grade)
# Programmation Web 2019 
 
 Groupe composé de :
 <ul>
 <li> Nicolas Duroc</li>
 <li> Mathieu San Juan</li>
 <li> Joël    Senjean</li>
 </ul>
Pré-requis:
<ul>
 <li>nodeJS/angular</li>
</ul>


Installation du projet :
<ul>
 <li>Git clone du dépot de projet</li>
 <li>Depuis le dossier back lancé la commande npm install</li>
 <li>Depuis le dossier back lancé la commande node index.js (necessite nodeJs installé sur la machine)</li>
 <li>Depuis le dossier front lancé la commande npm install</li>
 <li>Depuis le dossier front lancé la commande ng serve --open (necessite angular installé sur la machine)</li>
</ul>

Information supplémentaire :<br>
Le projet est configuré pour se connecté sur les bases de données fournis par le crémi, depuis une des machines du crémi.<br>
Pour changer cette configuration, et utiliser une base de données local ou autres, il faut se rendre dans le fichier /back/utils/dbconnect.js et changer les lignes suivantes :

```js
const db = mysql.createConnection({
  host: "host",
  user: "username",
  password: "password",
  database: "databaseName"
});
```

à votre convenance.<br>
Vous trouverez dans le back un fichier dbb.sql pour déployer une bases de données correspondant à celle utilisé dans le projet.<br>
De plus si vous voulez changer l'adresse pour joindre le back il suffit de se rendre dans le fichier /front/src/environnements/environment.ts et de changer la ligne suivantes 'apiPath: "adresseDuBack"'.

Pour utiliser notre site il suffit de créer un compte puis de se connecter avec ce compte.<br>
Une fois connecté vous pouvez rechercher, filtrer des séries depuis homePage, cliquer sur n'importe quelle série pour voir les informations propres à la série (saisons, épisodes, casting, résumé, ...) et suivre (en cliquant sur le boutton follow) ou arreter de suivre (en cliquant sur le boutton unfollow) cette série.

Dans la page myshow vous pouvez alors gerer vos séries :
<ul>
 <li>Vous pouvez voir les séries que vous suivez, ainsi que leurs saisons et leurs épisodes</li>
 <li>Vous pouvez marquer un épisode comme vue (en cliquant sur l'icône en forme d'oeil) ou le démarquer (en cliquant sur l'icône en forme d'oeil barré)</li>
 <li>Vous pouvez voir quels épisodes vous avez vue à l'aide du code couleur (les épisodes vue sont verts et ceux non-vue sont rouges)</li>
 <li>Vous pouvez voir le résumer d'un épisode en passant la souris sur 'summary'.</li>
</ul>

<p>Le site utilise une API pour récupérer la liste des séries et des épisodes (API <I>http://www.tvmaze.com/api#show-episode-list</I>)</p>
<p> Notre back utilise NodeJs </p>
<p> Nous utilisons Angular comme framwork </p>
<p> Notre base de données est en MySQL</p>
