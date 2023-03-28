var plantBtn = document.getElementById("plantBtn");

function findPlants(event) {
    event.preventDefault();

    var searchPlant = document.getElementById("searchPlant").value.trim();
    console.log(searchPlant)
    document.location.href = "/search?q=" + searchPlant
}

plantBtn.addEventListener("click", findPlants);