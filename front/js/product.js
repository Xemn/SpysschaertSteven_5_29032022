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
    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;

    /* Never trust in User Input : On vérifie qu'une quantité correcte et une couleur 
    aient été choisies : */

    if (parseInt(quantity) > 0 && parseInt(quantity) < 100 && color != "") {
      /* Création d'un objet item, qui aura pour propriétés, l'id correspondant
        au canapé acheté, la quantité souhaité, et sa couleur :  */
      let item = {
        _id: id,
        quantity: parseFloat(quantity),
        color: color,
      };

      // Création d'un tableau qui contiendra la liste de nos achats :
      let cartOfItem = [];

      /* Nous vérifions en premier lieu si notre localStorage contient déjà des
      entrées et si c'est le cas nous les récupérons pour les inscrire dans notre
      tableau cartOfItem : */
      if (localStorage.getItem("cart") !== null) {
        /* Pour que notre localStorage puisse être lu, il faut d'abord le 
          transformer en objet JavaScript :  */
        cartOfItem = JSON.parse(localStorage.getItem("cart"));

        /* Nous vérifions lors de l'ajout d'un item si celui ci n'est pas similaire
        à un item déjà présent dans notre tableau :  */
        const foundProduct = cartOfItem.find(
          (element) => element._id === item._id && element.color === item.color
        );
        if (foundProduct) {
          /* Si la condition est vérifée alors on additionne la quantité de notre produit
          similaire à celle de notre produit  : */
          foundProduct.quantity += item.quantity;
          localStorage.setItem("cart", JSON.stringify(cartOfItem));
          //console.log(cartOfItem);
        } else {
          // Si notre localStorage est non-null mais que nous devons mettre un autre produit :
          cartOfItem.push(item);
          localStorage.setItem("cart", JSON.stringify(cartOfItem));
          //console.log(cartOfItem);
        }
      } else {
        // Si aucune donnée n'est présente dans notre localStorage :
        cartOfItem = [];
        cartOfItem.push(item);
        localStorage.setItem("cart", JSON.stringify(cartOfItem));
        //console.log(cartOfItem);
      }
    } else {
      alert("La quantité et / ou la couleur ne sont pas correcte");
    }
  });
}

getProduct();
addItemToCart();
