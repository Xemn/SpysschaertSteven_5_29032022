// Nous récupérons notre local storage créer sur la page product :
let cartOfItem = JSON.parse(localStorage.getItem("cart"));

// URL de notre API :
const url = "http://localhost:3000/api/products";

let totalCostOfItem = 0;
let totalCost = 0;
let totalQuantity = 0;

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

displayCart();
