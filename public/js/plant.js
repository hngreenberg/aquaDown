var plantBtn = document.getElementById("plantBtn");
var plantInfoBtns = document.querySelectorAll(".plantInfo");
var addPlantProfile = document.querySelector("#addPlantProfile");
var killedPlant = document.querySelector("#killME");
var plantCare = document.querySelectorAll("#careME");
var updatePlant = document.querySelectorAll("#updatePlant");

function findPlants(event) {
    event.preventDefault();

    var searchPlant = document.getElementById("searchPlant").value.trim();
    console.log(searchPlant)
    document.location.href = "/search?q=" + searchPlant
}

plantBtn?.addEventListener("click", findPlants);

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
        const response = await fetch("/api/plants/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant_id: plantID,
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
            console.log(response)
        }
    }
}

addPlantProfile?.addEventListener("submit", addPlant); // search for form and submit on enter

function carePlant() {
    const plantID = document.querySelector("#iDPlant").textContent;
    const ID = document.querySelector("#iD").textContent;
    console.log(plantID)
    document.location.href = "/update/" + plantID + "/" + ID
}

plantCare?.addEventListener("click", carePlant);

const changePlant = async (event) => {
    event.preventDefault();

    const plantID = document.querySelector("#iD").textContent;
    const nickname = document.querySelector("#nickPlant").value.trim();
    const plantWater = document.querySelector("#waterPlant").value.trim();
    const plantFood = document.querySelector("#foodPlant").value.trim();

    const response = await fetch("/api/plants/" + plantID, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname: nickname,
            date_lastwatered: plantWater,
            date_lastfed: plantFood
        })
    })

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('We failed to write that down!');
        console.log(response)
    }
}

updatePlant?.addEventListener("submit", changePlant);

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/plants/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete plant');
        }
    }
};

killedPlant?.addEventListener("click", delButtonHandler)

var slideshowImages = [
    "/images/slideshow/bamboo-palm.jpeg",
    "/images/slideshow/black-rose.jpeg",
    "/images/slideshow/clematis.jpeg",
    "/images/slideshow/gold-cactus.jpeg",
    "/images/slideshow/passion-fruit.jpeg",
    "/images/slideshow/pothos.jpeg",
    "/images/slideshow/succulents.jpeg",
    "/images/slideshow/violet.jpeg",
    "/images/slideshow/hydrangea.jpeg",
    "/images/slideshow/shark-beak.jpeg",
    "/images/slideshow/spider-plant.jpeg"
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