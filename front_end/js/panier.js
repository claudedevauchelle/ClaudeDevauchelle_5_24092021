

let localStorageAppareil = JSON.parse(localStorage.getItem("appPhoto"));

console.log(localStorageAppareil);

///    afficher appareils photo panier

// sélection classe section html

const listePanier = document.querySelector("#container-produits");

// console.log(listePanier);

// panier vide : popup vide

if (localStorageAppareil == null || localStorageAppareil == 0) {
  const panierVide = `
    <div class="container-panier-vide bg-info">
    <div><H5> Votre panier est vide</h5></div>
    </div>
    `;
  listePanier.innerHTML = panierVide;
} else {
  let archiListePanier = [];

  for (k = 0; k < localStorageAppareil.length; k++) {
    archiListePanier =
      archiListePanier +
      `
      <div class="card-body container-recap d-flex flex-row mx-auto align-items-center">
        <div><h5 class="card-title">Quantité: 1 - ${localStorageAppareil[k].nomAppareil} - objectif : ${localStorageAppareil[k].taille_lentille}</h5></div>
        <div class="d-flex mx-3 px-3 align-items-end">
          <h4 class="card-text">${localStorageAppareil[k].prix} euros</h4>
          <a href="#" class="btn btn-supprimer btn-danger mx-3">supprimer article</a>
        </div>
      </div>
      `;
  }
  if (k === localStorageAppareil.length) {
    //ajout panier
    listePanier.innerHTML = archiListePanier;
  }
}

// supprimer element splice

supprimerSelection = Array.from(document.querySelectorAll(".btn-supprimer"));
console.log(supprimerSelection);
let tab = [];

for (let i = 0; i < supprimerSelection.length; i++) {
  supprimerSelection[i].addEventListener("click", () => {
    supprimerSelection[i].parentElement.style.display = "none";

    tab = localStorageAppareil;
    tab.splice([i], 1);
    console.log(i);

    localStorageAppareil = localStorage.setItem(
      "appPhoto",
      JSON.stringify(tab)
    );

    window.location.href = "paniers.html";
  });
}

//  vider tout le panier

const btn_suppr_all = `
<div class="card-body">
      <button class="btn btn-info mx-3 btn_suppr_all">
        Vider le panier
      </button>
    </div>
`;

listePanier.insertAdjacentHTML("beforeend", btn_suppr_all);

// selec ref btn

const btn_suppr_panier = document.querySelector(".btn_suppr_all");

// suppr key prod total

btn_suppr_panier.addEventListener("click", (e) => {
  e.preventDefault;

  //removeItem vide total

  localStorage.removeItem("appPhoto");
  // alerte panier vidé

  alert("le panier é été vidé");

  window.location.href = "paniers.html";
});

/// calcul total   variable

let montantTotal = [];

//recup prix appareils
function panierVide() {
  if (localStorageAppareil === null || localStorageAppareil == 0) {
    console.log("le panier est vide : true");
    return true;
  } else {
    console.log("le panier est vide : false");
    return false;
  }
}

if (panierVide() == false) {
  for (let i = 0; i < localStorageAppareil.length; i++) {
    let montantTotalPanier = localStorageAppareil[i].prix;

    montantTotal.push(montantTotalPanier);

    // console.log(montantTotal)
  }
}

//addition reduce

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = montantTotal.reduce(reducer, 0);
console.log(prixTotal);

// afficher html prix total

const resultatTotalCommande = `
<div class="card-body display-6 bg-success">
<div class="resultat_commande_html">Total de votre commande : ${prixTotal} euros</div>
    </div>
`;

listePanier.insertAdjacentHTML("beforeend", resultatTotalCommande);

const form_html_panier = () => {
  const listeFormPanier = document.querySelector("#container-produits");

  const structureFormPanier = `
  <div id="form_commande">
      <div class="card-body">
        <form>
          <!-- 2 column grid layout with text inputs for the first and last names -->

          <div class="col mb-4 bg-white w-50 mx-auto">
            <div class="form-outline">
              <input type="text" id="nom" class="form-control" />
              <label class="form-label" for="Nom">Nom</label>
            </div>
          </div>
          <div class="col mb-4 bg-white w-50 mx-auto">
            <div class="form-outline">
              <input type="text" id="prenom" class="form-control" />
              <label class="form-label" for="Prenom">prénom</label>
            </div>
          </div>

          <div class="col mb-4 bg-white w-50 mx-auto">
            <div class="form-outline">
              <input type="text" id="ville" class="form-control" />
              <label class="form-label" for="Ville">Ville</label>
            </div>
          </div>
          <div class="col mb-4 bg-white w-50 mx-auto">
            <div class="form-outline">
              <input type="number" id="code_Postal" class="form-control" />
              <label class="form-label" for="Code_Postal">Code Postal</label>
            </div>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4 bg-white w-50 mx-auto">
            <input type="email" id="email_address" class="form-control" />
            <label class="form-label" for="Email_address">Email address</label>
          </div>

          <!-- Submit button -->
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              id="btn_envoyerform"
              type="submit"
              class="btn btn-primary btn-block mb-4 w-25 mx-auto"
              name="Confirmation_commande"
            >Confirmation commande
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  //ajout html
  listeFormPanier.insertAdjacentHTML("afterend", structureFormPanier);
};
//affichage page
form_html_panier();

// selection bouton envoi
const btnEnvoyerForm = document.querySelector("#btn_envoyerform");
// console.log(btnEnvoyerForm);
btnEnvoyerForm.addEventListener("click", (e) => {
  e.preventDefault();

  // recup form info

  //class globale
  class form_infos {
    constructor(prenom, nom) {
      this.nom = document.querySelector("#nom").value;
      this.prenom = document.querySelector("#prenom").value;
      this.ville = document.querySelector("#ville").value;
      this.code_Postal = document.querySelector("#code_Postal").value;
      this.email_address = document.querySelector("#email_address").value;
    }
  }

  // call classe

  const form_infos_globals = new form_infos();

  console.log(form_infos_globals);
  console.log("form_infos_globals");

  // const formInfos = {
  //   nom: document.querySelector("#nom").value,
  //   prenom: document.querySelector("#prenom").value,
  //   ville: document.querySelector("#ville").value,
  //   code_Postal: document.querySelector("#code_Postal").value,
  //   email_address: document.querySelector("#email_address").value
  // }

  // add object forminfos ds local storage

  localStorage.setItem(
    "form_infos_globals",
    JSON.stringify(form_infos_globals)
  );

  // // value form ds tableau

  const prepInfoCommande = {
    localStorageAppareil,
    form_infos,
  };

  console.log(prepInfoCommande);
  console.log("prepInfoCommande");
});
