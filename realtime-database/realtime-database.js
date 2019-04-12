import config from '../config.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// Initialisation des gestionnaires d'événement
$('#addMessageForm').on('submit', onAddMessage);
$('#addUserForm').on('submit', onAddUser);

// ----------------------------------------
// 1) [À FAIRE] Complétez les gestionnaires d'événement onAddMessage() et onAddUser()
// ----------------------------------------

function onAddMessage(event) {
    event.preventDefault();

    const pseudo = $('#pseudo').val();
    const message = $('#message').val();

    const usersRef = firebase.database().ref('/messages')

    usersRef.push().set({
        "user_pseudo" : pseudo,
        "user_message" : message
    });

    // -- lecture de tous les éléments 
    usersRef.on('value', (snapshot) => {

        let template = "";

        snapshot.forEach(function(item){

            const values = item.val();

            template += `<li>${values.user_pseudo} <b>dit :</b> ${values.user_message}</li>`

        });

        $('#messages').html(template);
    });  


    // Votre code ici ...
    // Ajouter le pseudo et le message dans la database ...
}

function onAddUser(event) {
    event.preventDefault();

    const nom = $('#nom').val();
    const age = $('#age').val();

    const usersRef = firebase.database().ref('/users')

    usersRef.push().set({
        "user_id" : nom,
        "user_age" : age
    });

    // -- lecture de tous les éléments 
    usersRef.on('value', (snapshot) => {

        let template = "";

        snapshot.forEach(function(item){

            const values = item.val();

            template += `<li>${values.user_id} : ${values.user_age}</li>`

        });

        $('#users').html(template);
    });  
    // Votre code ici ...
    // Ajouter le nom et l'age dans la database ...
}

// ----------------------------------------
// 2) [À FAIRE] Écrivez le code qui permet de récupérer les messages ET les utilisateurs de la base
// ----------------------------------------

// Récupération des messages...

// Récupération des utilisateurs...
