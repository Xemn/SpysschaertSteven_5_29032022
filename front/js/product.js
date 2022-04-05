/* Récupération Valeur ID : */

// On recherche les différents paramètres de notre url courrante :
const currentURLParams = window.location.search;
// On structure notre variable de type string en objet URLSearchParams :
const urlParams = new URLSearchParams(currentURLParams);
// On récupère la valeur de notre paramètre id à l'aide de la méthode get :
const id = urlParams.get("id");

const url = "http://localhost:3000/api/products";

function getProduct() {
  fetch(url + "/" + id)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (product) {
      const imageOfProduct = document.createElement("img");
      imageOfProduct.setAttribute("src", `${product.imageUrl}`);
      imageOfProduct.setAttribute("alt", `${product.altTxt}`);
      document
        .getElementsByClassName("item__img")[0]
        .appendChild(imageOfProduct);

      document.getElementById("title").textContent = product.name;
      document.getElementById("price").textContent = product.price;
      document.getElementById("description").textContent = product.description;

      for (let color of product.colors) {
        const option = document.createElement("option");
        option.setAttribute("value", color);
        option.textContent = color;
        document.getElementById("colors").appendChild(option);
      }
    })
    .catch(function (err) {
      alert("Un problème est survenu");
    });
}

function addItemToCart() {
  // On récupère dans le DOM notre button :
  const buttonAddToCart = document.getElementById("addToCart");

  /* Nous venons écouter le clique sur le boutton et lui donner une suite
  d'instructions dans notre fonction callback : */
  buttonAddToCart.addEventListener("click", function () {
    // Nous récupérons notre select et input via leur id respectif :
    let quantity = document.getElementById("quantity");
    let color = document.getElementById("colors");

    /* Never trust in User Input : On vérifie qu'une quantité correcte et une couleur 
    aient été choisies : */

    if (quantity.value > 0 && quantity.value < 100 && color.value != "") {
      let item = {
        id: id,
        quantity: quantity.value,
        color: color.value,
      };
    }
  });
}

getProduct();
