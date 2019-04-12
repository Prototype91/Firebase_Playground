import config from '../config.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// 2. [À FAIRE] Récupérez la liste des consoles de jeu et affichez-les dans le HTML ...
// Le HTML à utiliser pour chaque console est le suivant :


const consolesRef = firebase.firestore().collection('Consoles');

consolesRef.get().then(function (querySnapshot) {

    let template = "";

    querySnapshot.forEach(function (doc) {

        let consoles = doc.data();

        template += `<div class="card d-flex flex-column justify-content-end">
        <img class="card-img-top" src="images/consoles/${consoles.image}" alt="${consoles.nom}">
        <div class="card-body" style="flex: initial">
            <h5 class="card-title">${consoles.nom}</h5>
            <p class="card-text">${consoles.constructeur} / ${consoles.prix} €</p>
        </div>
    </div>`
    });

    $('#consoles').html(template);

});

// 3. [À FAIRE] Récupérez la liste des jeux et affichez-les dans le HTML ...
// Le HTML à utiliser por chaque jeu est le suivant :

const jeuxRef = firebase.firestore().collection('jeux');

jeuxRef.get().then(function (gameQuerySnapshot) {

    let template = "";

    gameQuerySnapshot.forEach(function (docJeu) {

        let jeux = docJeu.data();

        template += `<div class="card d-flex flex-column justify-content-end">
        <img class="card-img-top" src="images/jeux/${jeux.image}" alt="${jeux.nom}">
        <div class="card-body" style="flex: initial">
            <h5 class="card-title">${jeux.nom}</h5>
            <p class="card-text">${jeux.console}</p>
        </div>
    </div>`
    });

    $('#jeux').html(template);

});