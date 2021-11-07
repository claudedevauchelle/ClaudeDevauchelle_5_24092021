// tableau liste produits web api

let allCameras = [];

const listeAppareils = document.querySelector(".liste-appareils");

function getCameras() {
  fetch("http://localhost:3000/api/cameras")
    .then((response) => response.json())
    .then((allCameras) => {
      //   console.log(allCameras);
      createCard(allCameras);
    })
    .catch(function (error) {
      alert(error);
    });
}

getCameras();

function createCard(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("li");
    const txtCarte = document.createElement("h5");
    txtCarte.innerText = `Modèle : ${arr[i].name}`;
    const priceCarte = document.createElement("p");
    priceCarte.innerText = `Prix : ${arr[i].price/100} euros`;
    const imgCarte = document.createElement("img");
    imgCarte.src = arr[i].imageUrl;
    const linkProduit = document.createElement("a");
    linkProduit.innerHTML = `<button class="btn btn-outline-blueblack" type="submit" name="btn-envoyer">Commandez moi !</button>`;
    linkProduit.href = `/front_end/html/produit.html?id=${arr[i]._id}`;

    carte.appendChild(imgCarte);
    carte.appendChild(txtCarte);
    carte.appendChild(priceCarte);
    carte.appendChild(linkProduit);

    listeAppareils.appendChild(carte);
  }
}

