var plantBtn = document.getElementById("plantBtn");
var plantInfoBtns = document.querySelectorAll(".plantInfo");
var addPlantProfile = document.querySelector("#addPlantProfile");
var killedPlant = document.querySelector("#killME")

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

const addPlant = async (event) => {
    event.preventDefault();

    const plantID = document.querySelector("#iDPlant").textContent;
    const commonName = document.querySelector("#commonName").textContent;
    const waterInfo = document.querySelector("#waterInfo").textContent;
    const sunlightInfo = document.querySelector("#sunlightInfo").textContent;
    const nickname = document.querySelector("#nickPlant").value.trim();
    const plantWater = document.querySelector("#waterPlant").value.trim();
    const plantFood = document.querySelector("#foodPlant").value.trim();
    const plantAdopt = document.querySelector("#adoptPlant").value.trim();

    if (plantWater) {
        console.log(plantID)
        const response = await fetch(("/plant/" + plantID), {
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

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to add plant to profile!');
            console.log(err)
        }
    }
}

addPlantProfile.addEventListener("submit", addPlant); // search for form and submit on enter

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/plant/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete plant');
        }
    }
};

killedPlant.addEventListener("click", delButtonHandler)

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