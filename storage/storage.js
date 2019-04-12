import config from '../config.js';
import {
    initActionButtons, // Créér et affiche des boutons d'action dans la page web
    initProgressBar, // Réinitialise et affiche la barre de progression dans la page web.
    updateProgressBar, // Change la valeur de progression de la barre.
    successProgressBar, // Définit la barre de progression en mode "Téléchargement terminé"
    cancelProgressBar, // Définit la barre de progression en mode "Téléchargement annulé"
    playPauseProgressBar // Définit la barre de progression en mode "Play/Pause" (1 fois sur 2)
} from './functions.js';

// Initialisation de Firebase
firebase.initializeApp(config);

// Installation du gestionnaire d'événement pour écouter la sélection d'un fichier sur l'ordinateur
$('#file').on('change', onSelectFile);

// Quand un visiteur a sélectionné un fichier sur son ordinateur, cette fonction est appelée...
function onSelectFile(event) {
    // Affichage des boutons d'action
    initActionButtons(onPause, onResume, onCancel);
    // Affichage de la barre de progression
    initProgressBar();

    // Récupération de l'objet `File` envoyé
    // (Documentation MDN : https://developer.mozilla.org/fr/docs/Web/API/File)
    const file = event.target.files[0];

    /*
        À vous de jouer ! Écrivez ici le code permettant de télécharger le fichier
        sur votre compte Firebase, dans un emplacement nommé :
            
            photos/<NOM_DU_FICHIER>

        Note : Les objets `File` ont une propriété `.name` contenant le nom
        du fichier uploadé, par exemple :

            console.log(file.name); // affichera "imageSelectionnee.jpg"
    */

    // Votre code ici ...

    const storageRef = firebase.storage().ref();

    storageRef.child(`images/${file.name}`).put(file);

    const uploadTask = storageRef.child('images/mountains.jpg').put(file);
    uploadTask.pause();
    uploadTask.resume();
    uploadTask.cancel();

    uploadTask.on('state_changed', onStateChanged, onError, onComplete);
    
    function onStateChanged(snapshot) {
        snapshot.state;            // 'paused' ou 'running'
        snapshot.bytesTransferred; // nb d'octets déjà téléchargés
        snapshot.totalBytes;      // taille totale du fichier en octets
    }
    function onError(error) {
        console.error('Oops…', error);
    }
    function onComplete() {
        console.log('File uploaded!');
    }






    /*
        Une fois le code du chargement écrit,
        écrivez ici le code permettant de gérer le chargement
        (pause, resume et cancel)
    */

    // Quand le visiteur clique sur "pause"
    function onPause() {
        // Votre code ici ...
    }
    // Quand le visiteur clique sur "reprendre"
    function onResume() {
        // Votre code ici ...
    }
    // Quand le visiteur clique sur "annuler"
    function onCancel() {
        // Votre code ici ...
    }
}