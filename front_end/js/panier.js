let localStorageAppareil = JSON.parse(localStorage.getItem("products"));

// console.log(localStorageAppareil);

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
        <div><h5 class="card-title">Quantité: ${
          localStorageAppareil[k].quantite
        } - ${localStorageAppareil[k].nomAppareil} - objectif : ${
        localStorageAppareil[k].taille_lentille
      }</h5></div>
        <div class="d-flex mx-3 px-3 align-items-end">
          <h4 class="card-text">${
            localStorageAppareil[k].prix * localStorageAppareil[k].quantite
          } euros</h4>
          <a href="#" class="btn btn-supprimer btn-danger mx-3">supprimer article</a>
        </div>
      </div>
      `;
  }
  // if (k === localStorageAppareil.length) {
  //ajout panier
  listePanier.innerHTML = archiListePanier;
  console.log(localStorageAppareil);
  console.log("localStorageAppareil");
  // }
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
      "products",
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

  localStorage.removeItem("products");
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
    let montantTotalPanier =
      localStorageAppareil[i].prix * localStorageAppareil[i].quantite;

    montantTotal.push(montantTotalPanier);

    console.log(montantTotal);
  }
}

if (panierVide() == false) {


//addition reduce

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = montantTotal.reduce(reducer, 0);
console.log(prixTotal);

// afficher html prix total

const resultatTotalCommande = `
<div class="card-body display-6 bg-white">
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

          <div class="col mb-4 bg-white w-50 text-center mx-auto">
            <div class="form-outline">
              <input type="text" id="lastName" class="form-control" />
              <label class="form-label" for="Nom">Nom</label>
              <span id="nomManquant" class="text-danger"></span>
            </div>
          </div>
          <div class="col mb-4 bg-white w-50 mx-auto text-center">
            <div class="form-outline">
              <input type="text" id="firstName" class="form-control" />
              <label class="form-label" for="Prenom">prénom</label>
              <span id="prenomManquant" class="text-danger"></span>
            </div>
          </div>
          <div class="col mb-4 bg-white w-50 mx-auto text-center">
            <div class="form-outline">
              <input type="text" id="address" class="form-control" />
              <label class="form-label" for="adresse">adresse</label>
              <span id="adresseManquant" class="text-danger"></span>
            </div>
          </div>
          <div class="col mb-4 bg-white w-50 mx-auto text-center">
            <div class="form-outline">
              <input type="text" id="city" class="form-control" />
              <label class="form-label" for="ville">ville</label>
              <span id="villeManquant" class="text-danger"></span>
            </div>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4 bg-white w-50 mx-auto text-center">
            <input type="email" id="email" class="form-control" />
            <label class="form-label" for="Email">Email</label>
            <span id="emailManquant" class="text-danger"></span>
          </div>

          <!-- Submit button -->
          <div class="d-grid gap-2 col-6 mx-auto w-25">
            <button
              id="btn_envoyerform"
              type="submit"
              class="btn btn-primary btn-block mb-4 mx-auto"
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
  // class form_infos {
  //   constructor() {
  //     this.lastName = document.querySelector("#lastName").value;
  //     this.firstName = document.querySelector("#firstName").value;
  //     this.address = document.querySelector("#address").value;
  //     this.city = document.querySelector("#city").value;
  //     this.email = document.querySelector("#email").value;
  //   }
  // }

  // // call classe

  // const contact = new form_infos();

  // console.log(contact);
  // console.log("contact");
  // const products = ["5be9bc241c9d440000a730e7"];

  const contact = {
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log(contact);

  //ID products appareil
  let products = [];
  for (i = 0; i < localStorageAppareil.length; i++) {
    let IdProducts = localStorageAppareil[i].id_appareilSelectionne;
    products.push(IdProducts);
  }
  console.log("products");
  console.log(products);

  // regex validation champs formulaire nom, mail code postal etc
  //tetx alert clair
  const textAlertClair = (value) => {
    return `${value} - Uniquement des lettres minuscules ou majuscules, entre 2 et 24 caractères`;
  };

  const rgxNomPrenomVille = (value) => {
    return /^(\s)*[A-Za-zsàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{2,20}((\s)?((\'|\-|\.)?([A-Za-zsàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]){2,20}))*(\s)*$/.test(
      value
    );
  };

  const rgxNomAdresseRueNum = (value) => {
    return /^(\s)*[A-Za-z0-9sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{1,20}((\s)?((\'|\-|\.)?([A-Za-zsàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]){1,20}))*(\s)*$/.test(
      value
    );
    // return /^[a-zA-Z0-9]{2,50}$/.test(value);
  };

  const rgxAdresseMail = (value) => {
    return /^(\w\.?)+@[\w\.-]+\.\w{2,4}$/.test(value);
  };

  function controlRgxNom() {
    const rgxNom = contact.lastName;

    console.log(rgxNom);

    if (rgxNomPrenomVille(rgxNom)) {
      document.querySelector("#nomManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#nomManquant").textContent =
        "-- Ce champ n'est pas rempli correctement --";
      return false;
    }
  }

  function controlRgxPrenom() {
    const rgxPrenom = contact.firstName;

    console.log(rgxPrenom);

    if (rgxNomPrenomVille(rgxPrenom)) {
      document.querySelector("#prenomManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#prenomManquant").textContent =
        "-- Ce champ n'est pas rempli correctement --";
      return false;
    }
  }
  function controlRgxVille() {
    const rgxVille = contact.city;

    console.log(rgxVille);

    if (rgxNomPrenomVille(rgxVille)) {
      document.querySelector("#villeManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#villeManquant").textContent =
        "-- Ce champ n'est pas rempli correctement --";
      return false;
    }
  }

  function controlRgxAdresse() {
    const rgxCodeadresse = contact.address;

    console.log(rgxCodeadresse);

    if (rgxNomAdresseRueNum(rgxCodeadresse)) {
      document.querySelector("#adresseManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#adresseManquant").textContent =
        "-- Ce champ n'est pas rempli correctement --";
      return false;
    }
  }

  function controlRgxMail() {
    const rgxMail = contact.email;

    console.log(rgxMail);

    if (rgxAdresseMail(rgxMail)) {
      document.querySelector("#emailManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#emailManquant").textContent =
        "-- Ce champ n'est pas rempli correctement --";
      return false;
    }
  }

  // add object forminfos ds local storage valid regex
  if (
    controlRgxNom() &&
    controlRgxPrenom() &&
    controlRgxAdresse() &&
    controlRgxVille() &&
    controlRgxMail()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));


    const prepInfoCommande = {
      contact,
      products,
      prixTotal,
    };

    sendDataServer(prepInfoCommande);

  } else {
    alert("Veuillez bien remplir le formulaire");
  }
  // // value form ds tableau

  // const products = ["0987YTRFGT"];
});

function sendDataServer(prepInfoCommande){
  //envoyer objet "prepinfocommande"
  const promise01 = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(prepInfoCommande),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // reponse server results
  promise01.then(async (response) => {
    try {
      const contenu = await response.json();
      console.log(contenu);
      if (response.ok) {
        console.log(`resulats repsonse OK: ${response.ok}`);
        console.log(contenu.orderId);
        //id dans localstorage
        localStorage.setItem("orderId", contenu.orderId);
        // redirection page commande
        window.location = "commande_valide.html";
      } else {
        console.log(`reponse serv : ${response.status}`);
        alert(`probleme avec serveur : erreur ${response.status}`);
      }
    } catch (e) {
      console.log("ERREUR");
      console.log(e);
      alert(`erreur catch() ${e}`);
    }
  });
}
///    pre remplir formulaire avec info deja rentrée

const infoLocalStorage = localStorage.getItem("contact");

// convertion info en javascript

const contact = JSON.parse(infoLocalStorage);

//info du local storage dans le formulaire
// fonction pr info

function autoInfoFormStorage(input) {
  if (contact == null) {
    console.log("le local est null");
  } else {
    document.querySelector(`#${input}`).value = contact[input];
  }
}

autoInfoFormStorage("lastName");
autoInfoFormStorage("firstName");
autoInfoFormStorage("address");
autoInfoFormStorage("city");
autoInfoFormStorage("email");

// console.log("products");
// console.log(products);
};