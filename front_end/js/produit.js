// ID dans l'url recuperation chaine de requete 

const queryString = window.location.search;

const urlSearchParams = new URLSearchParams(queryString);

const idUnique = urlSearchParams.get("id");
// console.log(idUnique);

// recuperation API

function getCamerasId(id) {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then((response) => response.json())
    .then((IdCameras) => {
      //   console.log(IdCameras);
      createCard(IdCameras);
    })
    .catch(function (error) {
      alert(error);
    });
}

getCamerasId(idUnique);

// creation carte article

const listeProduits = document.querySelector(".liste-produit");
// console.log(listeProduits);

function createCard(arr) {
  console.log(arr);

  const carte = document.createElement("li");
  const txtCarte = document.createElement("h5");
  txtCarte.innerHTML = `<h5 class="dom_H5">Modèle : ${arr.name}</h5>`;
  const priceCarte = document.createElement("p");
  priceCarte.innerText = `Prix : ${arr.price / 100} euros`;
  const imgCarte = document.createElement("img");
  imgCarte.src = arr.imageUrl;
  const descCarte = document.createElement("p");
  descCarte.innerText = arr.description;
  const linkProduit = document.createElement("div");
  linkProduit.innerHTML = `<button id="btn-envoyer" class="btn btn-outline-blueblack" type="submit" name="btn-envoyer">Ajouter au panier</button>`;
  const optionProduit = document.createElement("p");
  optionProduit.innerHTML = `<form>
  <label for="taille_lentille">Choisir la lentille :</label>
  <select name="lenses" id="lenses" class="lenses">
  </select>
  <div class="form-outline">
  <label for="taille_lentille">Choisir la quantité :</label>
  <input type="text" maxlength="2" name="quantite_appareil" id="quantite_appareil" class="lenses" value="1"  size="3" >
  </div>
  </form>`;


  const option_lentille = arr.lenses;
  console.log(arr.lenses);

  let archOptions = [];

  // afficher juste options disponible

  for (let j = 0; j < option_lentille.length; j++) {
    archOptions =
      archOptions +
      `<option value="${option_lentille[j]}">${option_lentille[j]}</option>`;
    console.log(option_lentille);
  }

  //   console.log(archOptions);

  carte.appendChild(imgCarte);
  carte.appendChild(txtCarte);
  carte.appendChild(priceCarte);
  carte.appendChild(descCarte);
  carte.appendChild(optionProduit);
  carte.appendChild(linkProduit);

  listeProduits.appendChild(carte);
  //   console.log(carte);

  //   infos produit selectionne par utilisateur

  const optionId = document.querySelector("#lenses");
  console.log(optionId);

  // affichage option de taille menu deroulant selectionne par utilisateur

  const integrer_optionTaille = document.querySelector("#lenses");
  //   console.log(integrer_optionTaille);
  integrer_optionTaille.innerHTML = archOptions;


  //affich quantite architecture selectionne par utilisateur

  const integrer_optionQuantite = document.querySelector("#quantite_appareil");
  // integrer_optionQuantite.innerHTML = archQuantite;

  //   envoi btn panier infos choisis par utilisateur
  const btn_envoyerPanier = document.querySelector("#btn-envoyer");
  //   console.log(btn_envoyerPanier);

  btn_envoyerPanier.addEventListener("click", (event) => {
    event.preventDefault();

    // choix utilisateur variable

    const tailleLense = optionId.value;

    // quantite variable
    const choixQuantite = integrer_optionQuantite.value;

    // console.log(tailleLense);

    // recapitulatif selection de l'utilisateur avec appelation de la webAPI

    let recup_optionProduit = {
      nomAppareil: arr.name,
      id_appareilSelectionne: arr._id,
      taille_lentille: tailleLense,
      quantite: choixQuantite,
      prix: arr.price / 100,
    };

    console.log(recup_optionProduit);

    // LOCAL STORAGE

    // stocker informations que je souhaite envoyer dans mon panier

    let localStorageAppareil = JSON.parse(localStorage.getItem("products"));


    // JSON parse c'est pour convertir les données au format JSON qui sont le local storage un objet  javascript

    //fonction message validation
    const messageValidation = () => {
      if (
        window.confirm(`${arr.name} option: ${tailleLense} a bien été ajouté au panier
Consultez le panier OK ou revenir à l'accueil ANNULER`)
      ) {
        window.location.href = "/front_end/html/paniers.html";
      } else {
        window.location.href = "/index.html";
      }
    };

    // fonction pour factoriser ajout appareil  photo ds le local storage

    const factAjoutAppareilLocalstorage = () => {
    let localStorageAppareil = JSON.parse(localStorage.getItem("products"));
    let appareilTrouve = 0;
    if (localStorageAppareil == null){
      localStorageAppareil = [];
    }
    for (let i = 0;i < localStorageAppareil.length;i ++){
      if ((recup_optionProduit.id_appareilSelectionne === localStorageAppareil[i].id_appareilSelectionne) && (recup_optionProduit.taille_lentille === localStorageAppareil[i].taille_lentille)){
        appareilTrouve = 1;
        localStorageAppareil[i].quantite = Number(localStorageAppareil[i].quantite) + Number(recup_optionProduit.quantite);
      }
    }
    if (appareilTrouve === 0) {
      localStorageAppareil.push(recup_optionProduit);
    }
      localStorage.setItem("products", JSON.stringify(localStorageAppareil));
      console.log(recup_optionProduit);
    };

    //  produit déja existant key OK
    if (localStorageAppareil) {
      //   localStorageAppareil.push(recup_optionProduit);
      factAjoutAppareilLocalstorage();
      messageValidation();
    }

    // produit non existant no KEY
    else {
      localStorageAppareil = [];
      factAjoutAppareilLocalstorage();
      messageValidation();
    }
  });
}
