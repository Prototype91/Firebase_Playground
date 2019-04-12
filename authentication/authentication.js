import config from '../config.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// --------------------------------------------
// Initialisation des gestionnaires d'événement
// --------------------------------------------

$('#loginButtonGithub').on('click', githubLogin);
$('#loginButtonGoogle').on('click', googleLogin);
$('#loginForm').on('submit', emailPasswordLogin);

// ----------------------------------------
// Définition des gestionnaires d'événement
// ----------------------------------------

function githubLogin() {
    // Votre code ici ...
    // Créez un provider pour Github
    const githubProvider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(githubProvider)
        .then(function (result) {
            const user = result.additionalUserInfo.profile;

            console.log("Résultat de l'authentification : ", user);

            $('section#results').html(`
                <h3>Bienvenue ${user.name}</h3>
                <img src="${user.avatar_url}" alt="${user.login}" width="100" />
            `);
        })
        .catch(function(error) {
            console.log("Une erreur s'est produite", error.message);

            $('section#results').html(`
                <div class="alert alert-danger">${error.message}</div>
            `);
        });
}

function googleLogin() {
    // Votre code ici ...
    // Créez un provider pour google
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleProvider)
        .then(function (result) {
            const user = result.additionalUserInfo.profile;

            console.log("Résultat de l'authentification : ", user);

            $('section#results').html(`
                <h3>Bienvenue ${user.name} (${user.email})</h3>
                <img src="${user.picture}" alt="${user.name}" width="100" />
            `);
        })
        .catch(function(error) {
            console.log("Une erreur s'est produite", error.message);

            $('section#results').html(`
                <div class="alert alert-danger">${error.message}</div>
            `);
        });
}

function emailPasswordLogin(event) {
    event.preventDefault();

    const email = $('#emailField').val();
    const password = $('#passwordField').val();

    // Votre code ici ...
    // Utilisez les variables 'email' et 'password' pour les transmettre à Firebase via le provider "Email/Password"
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (result) {
            console.log('Succès de l\'authentification', result);

            $('section#results').html(`
                <h3>Vous êtes bien connecté ${email} !</h3>
            `);
        })
        .catch(function(error) {
            console.log("Une erreur s'est produite", error.message);

            $('section#results').html(`
                <div class="alert alert-danger">${error.message}</div>
            `);
        });
}