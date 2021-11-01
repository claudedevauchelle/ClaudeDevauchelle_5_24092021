// orderId

const orderId = localStorage.getItem("orderId");
console.log(`orderId: ${orderId}`);

// prix
const prixTotal = localStorage.getItem("prixTotal");
console.log(`prixTotal : ${prixTotal}`);

// architecteure confirm order
//selection dom body
const positionElementConf = document.querySelector("#confirm_commande");

const archiConfCommande = `
      <div class="card-header">récapitulatif</div>
      <div class="card-body">
        <h5 class="card-title">Votre commande est validée ! Merci.</h5>
        <p class="card-text">
          Voici votre numéro de commande: <span class="gras">${orderId}</span>
        </p>
        <p class="card-text">
          Montant total : <span class="gras">${prixTotal}</span> euros
        </p>
        <p class="card-text">A très bientôt !</p>
      </div>
`;

// ajout html
positionElementConf.insertAdjacentHTML("afterbegin", archiConfCommande);

// supprimer infos local storage
function supprKeyLocalstorage(key){
    localStorage.removeItem(key);
};

supprKeyLocalstorage("prixTotal");
supprKeyLocalstorage("products");
supprKeyLocalstorage("orderId");

if(orderId == null || prixTotal == null){
    window.location.href="/index.html";
}