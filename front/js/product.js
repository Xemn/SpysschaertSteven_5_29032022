/* Récupération Valeur ID : */

// On recherche les différents paramètres de notre url courrante :
const currenrURLParams = window.location.search;
// On structure notre variable de type string en objet URLSearchParams :
const urlParams = new URLSearchParams(researchParams);
// On récupère la valeur de notre paramètre id à l'aide de la méthode get :
const id = urlParams.get("id");

const url = "http://localhost:3000/api/products";
