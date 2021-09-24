main()

async function main() {
    const articles = await getArticles()
    console.log(articles)
    displayArticles(articles)
}

function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error) {
        alert(error)
    })
}

function displayArticles(cameras) {
    console.log(cameras);
    let titre;
    let cam;
    

    // console.log(cameras[0].name); 
    for (let i = 0; i < cameras.length; i++) {
        console.log(cameras[i].name);
        console.log(cameras[i].imageUrl);
        cam=document.createElement("div");
        titre=document.createElement("h2");
        titre.textContent=cameras[i].name;
        cam.appendChild(titre)
        document.getElementById("main").appendChild(cam);
        var myImage = new Image(100, 100);
        myImage.src = cameras[i].imageUrl;
        document.body.appendChild(myImage);


        // document.getElementById("main").innerHTML += "<h2>"+cameras[i].name+"</h2>";
     }
}