// Nous récupérons notre local storage créer sur la page product :
let cartOfItem = JSON.parse(localStorage.getItem("cart"));

// URL de notre API :
const url = "http://localhost:3000/api/products";

let totalCostOfItem = 0;
let totalCost = 0;
let totalQuantity = 0;
let price = 0;
let quantity = 0;
// Afficher les éléments de notre panier :
function displayCart() {
  // Si notre localStorage n'est pas vide :
  if (cartOfItem !== null) {
    // Pour chaque entrée de notre localStorage :
    for (let item of cartOfItem) {
      // Nous crééons tout ces éléments :
      const article = document.createElement("article");
      const imgContainer = document.createElement("div");
      const imgProduct = document.createElement("img");
      const itemContent = document.createElement("div");
      const productDescription = document.createElement("div");
      const productName = document.createElement("h2");
      const productColor = document.createElement("p");
      const productUnitPrice = document.createElement("p");
      const productSettings = document.createElement("div");
      const productQuantitySettings = document.createElement("div");
      const productQuantity = document.createElement("p");
      const inputQuantity = document.createElement("input");
      const deleteSettings = document.createElement("div");
      const deleteButton = document.createElement("p");

      /* On requête notre api pour tout les produits du panier afin
      de récupérer des informations non contenues dans notre localStorage :  */
      fetch(url + "/" + item._id)
        .then(function (response) {
          if (response.ok) {
            // On vérifie que la requête s'est bien déroulée
            return response.json(); // On retourne notre requête au format JSON
          }
        })
        .then(function (product) {
          /* Nous récupérons l'image,  de chaque produit
          et nous mettons la description correspondante, son nom et son prix
          unitaire : */
          imgProduct.setAttribute("src", `${product.imageUrl}`);
          imgProduct.setAttribute("alt", `${product.altTxt}`);
          // Enfin nous ajoutons notre image à notre container :
          imgContainer.appendChild(imgProduct);
          productName.textContent = `${product.name}`;
          productUnitPrice.textContent = `${product.price}`;
          // Calcule du prix total pour un seul type d'article
          totalCostOfItem = product.price * item.quantity;
          //console.log(totalCostOfItem);
          totalCost = totalCostOfItem + totalCost;
          //console.log(totalCost);
          document.getElementById("totalPrice").textContent = totalCost;

          price = product.price;
        })
        .catch(function (err) {
          alert("Un problème est survenu");
        });

      // Nous mettons la classe de notre div imgContainer :
      imgContainer.classList.add("cart__item__img");

      /* Nous attribuons les classes à nos div itemContent et 
      productDescription : */
      itemContent.classList.add("cart__item__content");
      productDescription.classList.add("cart__item__content__description");

      /* On récupère la couleur de nos produits : */

      productColor.textContent = item.color;

      /* On insère les différents éléments de notre div
      productDescription : */
      productDescription.appendChild(productName);
      productDescription.appendChild(productColor);
      productDescription.appendChild(productUnitPrice);

      /* Nous attribuons les classes à nos div producQuantitySettings
      et productQuantity : */
      productSettings.classList.add("cart__item__content__settings");
      productQuantitySettings.classList.add(
        "cart__item__content__settings__quantity"
      );

      /* On insère le contenu de nos balises p et input : */
      productQuantity.textContent = "Qté : ";
      inputQuantity.setAttribute("type", "number");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("value", `${item.quantity}`);

      /* On insère nos deux éléments productQuantity et inputQuantity
      dans notre élément productQuantitySettings : */
      productQuantitySettings.appendChild(productQuantity);
      productQuantitySettings.appendChild(inputQuantity);

      // On ajoute une classe à notre élément deleteSettings : //
      deleteSettings.classList.add("cart__item__content__settings__delete");
      // On ajoute une classe à notre élément deleteButton : //
      deleteButton.classList.add("deleteItem");
      // On ajoute le contenu de deleteButton :
      deleteButton.textContent = "Supprimer";
      // On insère notre button dans l'élément deleteSettings : //
      deleteSettings.appendChild(deleteButton);

      /* On insère nos deux éléments productQuantitySettings et 
      deleteSettings dans notre élément productSettings : */
      productSettings.appendChild(productQuantitySettings);
      productSettings.appendChild(deleteSettings);

      /* On insère dans notre élement itemContent, ces deux
      élements : productDescription et productSettings : */
      itemContent.appendChild(productDescription);
      itemContent.appendChild(productSettings);

      /* On insère l'élément imgContainer et itemContent dans notre 
      élément article : */
      article.appendChild(imgContainer);
      article.appendChild(itemContent);

      /* On ajoute une classe à notre élement article 
      et plusieurs attributs : */
      article.classList.add("cart__item");
      article.setAttribute("data-id", `${item._id}`);
      article.setAttribute("data-color", item.color);

      /* Enfin on ajoute notre élément article dans notre 
      balise section : */
      document.getElementById("cart__items").appendChild(article);
      // On affiche le nombre total d'article :
      totalQuantity = item.quantity + totalQuantity;
      document.getElementById("totalQuantity").textContent = totalQuantity;
    }
  } else {
    // Si notre localStorage est vide on affiche un message le signalant :
    const emptyCart = document.createElement("p");
    emptyCart.textContent = "Votre panier est vide";
    document.getElementById("cart__items").appendChild(emptyCart);
  }
}

// Fonction qui (Re)calcule et affiche la quantité totale de produit et le prix total :
function updateQuantityPrice() {
  let quantity = 0;
  let total = 0;

  for (let item of cartOfItem) {
    quantity += parseInt(item.quantity);
    total += parseFloat(price) * parseInt(item.quantity);
  }
  document.getElementById("totalQuantity").innerHTML = quantity;
  document.getElementById("totalPrice").innerHTML = total;
}

// Supprimer l'élément que l'on souhaite de notre panier :
function removeItem() {
  // On récupère tous les boutons delete (récupérer sous forme d'array) :
  const deleteButton = document.getElementsByClassName("deleteItem");
  // On boucle dans notre tableau de boutons :
  for (let i = 0; i < deleteButton.length; i++) {
    /* On récupère l'ancêtre le plus proche étant une balise article pour
    chacun des boutons : */
    const article = deleteButton[i].closest("article");
    // On récupère la valeur des data-id et -color de chaque ancêtre article :
    const deleteID = article.getAttribute("data-id");
    const deleteColor = article.getAttribute("data-color");

    // On écoute le clique sur un chaque bouton :
    deleteButton[i].addEventListener("click", function (event) {
      // Suppression du comportement par défaut du bouton :
      event.preventDefault();

      /* On met à jour notre array cartOfItem en ne récupérant que les éléments
      ayant un id différent de la valeur de deleteID ou deleteColor :  */
      cartOfItem = cartOfItem.filter(
        (element) => element._id !== deleteID || element.color !== deleteColor
      );

      // On insère dans le localStorage notre array mis à jour :
      localStorage.setItem("cart", JSON.stringify(cartOfItem));
      // Si notre array est vide alors nous supprimons notre localStorage :
      if (cartOfItem.length == 0) {
        window.localStorage.removeItem("cart");
        const emptyCart = document.createElement("p");
        emptyCart.textContent = "Votre panier est vide";
        document.getElementById("cart__items").appendChild(emptyCart);
      }

      // On supprime enfin l'article contenant le bouton sur lequel on clique :
      article.remove();
      updateQuantityPrice();
    });
  }
}

// Fonction qui nous permet de changer la quantité d'un produit dans le panier :
function changeQuantity() {
  // Nous récupérons tous l'input itemQuantity de chaque item du panier :
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  // On boucle dans notre tableau d'input :
  for (let i = 0; i < inputQuantity.length; i++) {
    const article = inputQuantity[i].closest("article");
    const dataID = article.getAttribute("data-id");
    const dataColor = article.getAttribute("data-color");
    let foundProduct = cartOfItem.find(
      (element) => element._id == dataID && element.color == dataColor
    );
    // On écoute le changement sur chaque input de notre tableau :
    inputQuantity[i].addEventListener("change", function (event) {
      /*On récupère la nouvelle valeur de l'input sur lequel le changement 
      à eu lieu et on modifie la quantité de notre item dans notre panier :  */
      foundProduct.quantity = parseInt(event.target.value);
      // On met à jour notre localStorage :
      localStorage.setItem("cart", JSON.stringify(cartOfItem));
      updateQuantityPrice();
    });
  }
}

function postForm() {
  /* Dans un premier temps nous allons récupérer les différentes balises de notre
  formualaire :  */

  const inputFirstName = document.getElementById("firstName");
  const inputLastName = document.getElementById("lastName");
  const inputAddress = document.getElementById("address");
  const inputCity = document.getElementById("city");
  const inputEmail = document.getElementById("email");
  const submitButton = document.getElementById("order");
  // Variable boolééne qui sera notre indicateur de validité :
  let validForm = false;
  // Nos Regex :
  const regexName = new RegExp("^[a-zA-Z ,.'-]+$");
  const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  /* Vérifications des champs :  */

  const validFirstName = function (inputFirstName) {
    const firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
    if (inputFirstName.value === "") {
      firstNameErrorMessage.textContent = "Veuillez renseigner ce champ.";
    } else if (!regexName.test(inputFirstName.value)) {
      firstNameErrorMessage.textContent = "Ceci n'est pas un prénom valide.";
    } else {
      validForm = true;
    }
  };

  const validLastName = function (inputLastName) {
    const lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
    if (inputLastName.value === "") {
      lastNameErrorMessage.textContent = "Veuillez renseigner ce champ.";
    } else if (!regexName.test(inputLastName.value)) {
      lastNameErrorMessage.textContent = "Ceci n'est pas un nom valide";
    } else {
      validForm = true;
    }
  };

  const validAddress = function (inputAddress) {
    const addressErrorMessage = document.getElementById("addressErrorMsg");
    if (inputAddress.value === "") {
      addressErrorMessage.textContent = "Veuillez renseigner ce champ.";
    } else {
      validForm = true;
    }
  };

  const validCity = function (inputCity) {
    const cityErrorMessage = document.getElementById("cityErrorMsg");
    if (inputCity.value === "") {
      cityErrorMessage.textContent = "Veuillez renseigner ce champ.";
    } else if (!regexName.test(inputCity.value)) {
      cityErrorMessage.textContent = "Ceci n'est pas une ville valide.";
    } else {
      validForm = true;
    }
  };

  const validEmail = function (inputEmail) {
    const emailErrorMessage = document.getElementById("emailErrorMsg");
    if (inputEmail.value === "") {
      emailErrorMessage.textContent = "Veuillez renseigner ce champ.";
    } else if (!emailRegExp.test(inputEmail.value)) {
      emailErrorMessage.textContent = "Cette adresse email n'est pas valide.";
    } else {
      validForm = true;
    }
  };

  // On écoute maintenant chaque changement sur nos champs :

  inputFirstName.addEventListener("change", function () {
    validFirstName(inputFirstName);
  });

  inputLastName.addEventListener("change", function () {
    validLastName(inputLastName);
  });

  inputAddress.addEventListener("change", function () {
    validAddress(inputAddress);
  });

  inputCity.addEventListener("change", function () {
    validCity(inputCity);
  });

  inputEmail.addEventListener("change", function () {
    validEmail(inputEmail);
  });

  // On écoute le clique sur le bouton présent dans notre formulaire :
  submitButton.addEventListener("click", function () {
    //event.preventDefault();
    // Si tout les champs sont valides :
    if (validForm && localStorage.getItem("cart") !== null) {
      /* On crée un tableau reprenant les articles de notre 
      localStorage : */
      const cart = [];
      for (let i = 0; i < cartOfItem.length; i++) {
        cart.push(cartOfItem[i]._id);
      }
      console.log(cart);
      /* Nous crééons un objet commande, qui reprend les 
      informations utilisateurs et son panier :  */
      const order = {
        contact: {
          firstname: inputFirstName.value,
          lastName: inputLastName.value,
          address: inputAddress.value,
          city: inputCity.value,
          email: inputEmail.value,
        },
        cart: cart,
      };
      console.log(order);
      /* On communique avec notre API, avec une requête POST cette
      fois afin de pouvoir passer commande : */
      fetch(url + "/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (data) {
          // On vide en premier lieu le localStorage de notre panier :
          localStorage.clear();
          // On redirige vers la page confirmation avec dans notyre url l'id de notre commande :
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch(function (error) {
          alert("Une erreur s'est produite");
        });
      // Sinon on reverifie les champs :
    } else {
      validFirstName(inputFirstName.value);
      validLastName(inputLastName.value);
      validAddress(inputAddress.value);
      validCity(inputCity.value);
      validEmail(inputEmail.value);
    }
  });
}

// Appel de nos différentes fonctions :
displayCart();
removeItem();
changeQuantity();
postForm();
