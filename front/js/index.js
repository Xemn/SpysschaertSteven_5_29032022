const url = "http://localhost:3000/api/products";

function getAllProducts() {
  fetch(url) // On requête l'API avec la méthode GET
    .then(function (response) {
      if (response.ok) {
        // On vérifie que la requête s'est bien déroulée
        return response.json(); // On retourne notre requête au format JSON
      }
    })
    .then(function (products) {
      for (let product of products) {
        // Création d'élément dans le DOM pour chaque produits :
        const productLink = document.createElement("a");
        const article = document.createElement("article");
        const imageOfProduct = document.createElement("img");
        const nameOfProduct = document.createElement("h3");
        const productDescription = document.createElement("p");

        /* Mise en place de l'attribut href qui pointe sur l'id du produit sur lequel
        l'utilisateur cliquera. */
        productLink.setAttribute("href", `"./product.html?id=${product._id}`);

        /* Mise en place des attributs src et alt qui permettra d'afficher
        l'image de chaque produit et la description qui leur correspond. */
        imageOfProduct.setAttribute("src", `${product.imageUrl}`);
        imageOfProduct.setAttribute("alt", `${product.altTxt}`);

        /* Ajout d'une classe + ajout du nom de produit dans la variable qui 
        créera une balise h3 */
        nameOfProduct.classList.add("productName");
        nameOfProduct.textContent = `${product.name}`;

        /* Ajout d'une classe + ajout de la description du produit dans la 
        variable qui créera une balise p */
        productDescription.classList.add("productDescription");
        productDescription.textContent = `${product.description}`;

        // Insertion de nos éléments dans le DOM pour chaque produits :
        document.getElementById("items").appendChild(productLink);
        productLink.appendChild(article);
        article.appendChild(imageOfProduct);
        article.appendChild(nameOfProduct);
        article.appendChild(productDescription);
      }
    })
    .catch(function (err) {
      alert("Un problème est survenu");
    });
}

getAllProducts();
