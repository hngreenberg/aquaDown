var plantBtn = document.getElementById("plantBtn");
var plantInfoBtns = document.querySelectorAll(".plantInfo");
var addPlantProfile = document.querySelector("#addPlantProfile");

function findPlants(event) {
    event.preventDefault();

    var searchPlant = document.getElementById("searchPlant").value.trim();
    console.log(searchPlant)
    document.location.href = "/search?q=" + searchPlant
}

plantBtn.addEventListener("click", findPlants);

for (i = 0; i < plantInfoBtns.length; i++) {
    plantInfoBtns[i].addEventListener("click", function () {
        console.log(this.nextElementSibling.textContent)
        document.location.replace("/plant/" + this.nextElementSibling.textContent)
    });
}

function addPlant(event) {
    event.preventDefault();

    const plantID = document.querySelector("#iDPlant").value;
    const commonName = document.querySelector("#commonName").value;
    const waterInfo = document.querySelector("#waterInfo").value;
    const sunlightInfo = document.querySelector("#sunlightInfo").value;
    const nickname = document.querySelector("#nickPlant").value.trim();
    const plantWater = document.querySelector("#waterPlant").value.trim();
    const plantFood = document.querySelector("#foodPlant").value.trim();
    const plantAdopt = document.querySelector("#adoptPlant").value.trim();

    fetch("/api/plants", {
        method: "POST",
        body: JSON.stringify({
            id: plantID,
            common_name: commonName,
            watering: waterInfo,
            sunlight: sunlightInfo,
            nickname: nickname,
            date_lastwatered: plantWater,
            date_lastfed: plantFood,
            date_acquired: plantAdopt
        })
    })
}

addPlantProfile.addEventListener("submit", addPlant); // search for form and submit on enter

var slideshowImages = [
    "/public/images/slideshow/bamboo-palm.jpeg",
    "/public/images/slideshow/black-rose.jpeg",
    "/public/images/slideshow/clematis.jpeg",
    "/public/images/slideshow/gold-cactus.jpeg",
    "/public/images/slideshow/passion-fruit.jpeg",
    "/public/images/slideshow/pothos.jpeg",
    "/public/images/slideshow/succulents.jpeg",
    "/public/images/slideshow/violet.jpeg"
];
var currentSlide = 0;

function changeImage() {
    var img = document.getElementById("slideshow-img");

    img.src = slideshowImages[currentSlide];
    currentSlide++;
    if (currentSlide >= slideshowImages.length) {
        currentSlide = 0;
    }
}

setInterval(changeImage, 3000);